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

//page search
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
            where:{ applicationUserID:{eq:${localStorage.getItem('userId')}} ,
             kindOfTransaction: {contains: "${localStorage.getItem('inputSearchUser')}"}  }){
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
}).then(res=>res.json()).then(res=>{
    console.log(res);
    var temp = "";
    var i = 0;
    //start for loop
    for( i; i < res.data.transaction.length ; i++){
      temp += "<tr>";
      temp += "<td><span>"+res.data.transaction[i].id+"</span></td>";
      temp += "<td><span>"+res.data.transaction[i].kindOfTransaction+"</span></td>";
      temp += "<td><span>"+res.data.transaction[i].amountOfMoney+"</span></td>";
      temp += "<td><span>"+res.data.transaction[i].paymentSource+"</span></td>";
      temp += "<td><span>"+res.data.transaction[i].createdOnUtc.split("T")[0]+"</span>"+"</div>"+"</td></tr>";
            }; 
            // end for loop
            document.querySelector(".data-search-user").innerHTML = temp;
})
}
document.querySelector(".input-search-user").value = new URLSearchParams(window.location.search).get("fsearch");
document.querySelector(".input-search-user").addEventListener('change', function(){
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
                where:{ applicationUserID:{eq:${localStorage.getItem('userId')}} ,
                 kindOfTransaction: {contains: "${inputSearchUser.value}"}  }){
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
    }).then(res=>res.json()).then(res=>{
        console.log(res);
        // window.location = './search-user.html';
    })
})