if(localStorage.getItem('idAdmin') == null){
//   window.location = 'sign-in-admin.html';
// }else{
fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            query{
                adminHistories{
                  applicationUserID
                  description
                  createdOnUtc
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
        console.log(res);
        if(res.data.adminHistories.length > 0){
            console.log(res.data.adminHistories[0].createdOnUtc)
            console.log("hi")
            var temp = "";
            var i = 0;
            //start for loop
            for( i; i < res.data.adminHistories.length ; i++){
              temp += "<tr>";
              temp += "<td>"+'<div class="list-img">'+'<img src="./image/user/Group 326.png" /></div'+"</td>";
              temp += "<td>"+'<div class="list-name"><p>'+res.data.adminHistories[i].description+"</p>"+'<span>'+res.data.adminHistories[i].createdOnUtc.split("T")[0]+" , "+res.data.adminHistories[i].createdOnUtc.split("T")[1].split(".")[0]+"</span></div></td>";
              +"</tr>"
            }; 
            // end for loop
            document.querySelector(".data-history").innerHTML = temp;
        }
        });


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
                userID: ${localStorage.getItem("idAdmin")}
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
        
        //create naw admin
        let newAdminEmail = document.getElementById("email-new-admin");
        document.getElementById("create-admin").onclick = function(e){
          e.preventDefault();
          fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            mutation{
              makeAdminn (
                adminID: ${localStorage.getItem('idAdmin')},
                email: "${newAdminEmail.value}"
              ){
                userId
                statusCode
              }
            }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      console.log(localStorage.getItem('idAdmin'))
    })
        }
      }