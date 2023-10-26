if(localStorage.getItem('userId') == null){
//   window.location = 'sign-in.html';
// }else{
fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
{
    method : "POST",
    headers : {
        'content-type': 'application/json',
    },
    body : JSON.stringify({
        query: `
        mutation{
          userById(
            id: ${localStorage.getItem("userId")}
          )
          {
            userName
            fullName
            firstName
            lastName
            email
            city
            country
            nationality
            gander
            phoneNumber
            zipPostalCode
            street
            dateOfBirth
            profilePicture
            isActive
        
        result{
              statusCode
              statusMessage
            }
         
          }
        }
        `,
    }),
    
}).then(res=>res.json()).then(res=>{
  console.log(res);
  document.querySelector(".display-image").style.backgroundImage = `url(${res.data.userById.profilePicture})`;
  document.querySelector('.view-profile h6').innerHTML = res.data.userById.fullName;
  if(res.data.userById.isActive){
    document.querySelector('.verify').innerHTML = '<span><i class="fas fa-check"></i> verified</span>';
    document.querySelector('.verify').style.color = 'green';
    document.querySelector('.verify').style.fontWeight = 'bold';
    
  }else{
    document.querySelector('.verify').innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg> not verified</span>';
    document.querySelector('.verify span').style.color = 'red';
    document.querySelector('.verify').style.fontWeight = 'bold';
    
  }
});
//change the image 
window.addEventListener('load',()=>{
    uploadImg()
})
 function uploadImg() {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        console.log(uploaded_image);
        document.querySelector(".display-image").style.backgroundImage = `url(${uploaded_image})`;
      });
      reader.readAsDataURL(this.files[0]);
    });
 }

 // logout
document.querySelector(".logout").onclick = function(){
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            mutation{
              logOut (
                userID: ${localStorage.getItem("userId")}
              ){
                statusCode
                statusMessage
              }
            }
            `,
        }),
    }).then(res=>res.json()).then(res=>
        {
          console.log(res);
          if(res.data.logOut.statusCode == "1"){
            window.location = './index.html';
          }else{
            window.location.reload();
          }
            
        });
 
}

// search without from - to
let dateFrom = document.getElementById('date-from');
let dateTo = document.getElementById('date-to');
function dateToOrFrom (){
  // e.preventDefault();
  if (dateFrom.value == '' && dateTo.value == ''){
    fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            query{
              transaction(
                where:{ applicationUserID:{eq:${localStorage.getItem("userId")}}  }){
                  id
                  amountOfMoney
                  kindOfTransaction
                  isDeposit
                  paymentSource
                  createdOnUtc
              }
            }
            `,
        }),
    }).then(res=>res.json()).then(res=>
        {
          console.log(res);
          if(res.data.transaction.length > 0){
            console.log(res.data.transaction[0].createdOnUtc)
            console.log("hi")
            var temp = "";
            var i = 0;
            //start for loop
            for( i; i < res.data.transaction.length ; i++){
              console.log(res.data.transaction[i].amountOfMoney)
              temp += "<tr>";
              temp += "<td>"+'<div class="list-img">'+'<img src="./image/user/Group 326.png" /></div'+"</td>";
              temp += "<td>"+'<div class="list-name"><h6>'+res.data.transaction[i].kindOfTransaction+"<span> form </span>"+res.data.transaction[i].paymentSource+"</h6>"+'<span>'+res.data.transaction[i].createdOnUtc.split("T")[0]+'  '+res.data.transaction[i].createdOnUtc.split("T")[1].split(".")[0]+"</span></div></td>";
              if(res.data.transaction[i].isDeposit == true){
                temp += "<td>"+'<div class="list-amount">'+"+ "+res.data.transaction[i].amountOfMoney+'<br><span>USD</span>'+"</div></td>";
              }else{
                temp += "<td>"+'<div class="list-amount">'+"- "+res.data.transaction[i].amountOfMoney+'<br><span>USD</span>'+"</div></td>";
              }
              +"</tr>"
            }; 
            // end for loop
            document.querySelector(".data-history").innerHTML = temp;
          }
        });
  }
}dateToOrFrom();

// search with from - to
document.getElementById("history-show").onclick = function(e){
  e.preventDefault();
  console.log("888");
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            query($start:DateTime! = "${dateFrom.value}",$end:DateTime! = "${dateTo.value}") {
              transaction( where: { applicationUserID: {eq: ${localStorage.getItem('userId')}}   createdOnUtc:  {gte: $start ,  lte: $end}}  ){
                isDeposit
                amountOfMoney
                createdOnUtc
                kindOfTransaction
                paymentSource
            
              }
            }
            `,
        }),
    }).then(res=>res.json()).then(res=>
        {
          console.log(res);
          console.log("00000");
          if(res.data.transaction.length > 0){
            console.log(res.data.transaction[0].createdOnUtc)
            console.log("hi")
            var temp = "";
            var i = 0;
            //start for loop
            for( i; i < res.data.transaction.length ; i++){
              console.log(res.data.transaction[i].amountOfMoney)
              temp += "<tr>";
              temp += "<td>"+'<div class="list-img">'+'<img src="./image/user/Group 326.png" /></div'+"</td>";
              temp += "<td>"+'<div class="list-name"><h6>'+res.data.transaction[i].kindOfTransaction+"<span> form </span>"+res.data.transaction[i].paymentSource+"</h6>"+'<span>'+res.data.transaction[i].createdOnUtc.split("T")[0]+'  '+res.data.transaction[i].createdOnUtc.split("T")[1].split(".")[0]+"</span></div></td>";
              if(res.data.transaction[i].isDeposit == true){
                temp += "<td>"+'<div class="list-amount">'+"+ "+res.data.transaction[i].amountOfMoney+'<br><span>USD</span>'+"</div></td>";
              }else{
                temp += "<td>"+'<div class="list-amount">'+"- "+res.data.transaction[i].amountOfMoney+'<br><span>USD</span>'+"</div></td>";
              }
              +"</tr>"
            }; 
            // end for loop
            document.querySelector(".data-history").innerHTML = temp;
          }
        });
}


}