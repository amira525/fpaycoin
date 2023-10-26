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
            query {
                users(where: { isBlocked: {eq: true}},isOrdered: false )
                {
                  userName,
                  fullName,
                  profilePicture,
                  isBlocked
                  id,
                  profilePicture,
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
        console.log(res);
        var temp = "";
            var i = 0;
            //start for loop
            for( i; i < res.data.users.length ; i++){
              localStorage.setItem('blockUserId', res.data.users[i].id)
              temp += '<tr class="block-tr">';
              temp += "<td>"+'<div class="block-img"><img src='+`${res.data.users[i].profilePicture}`+'></div></td>';
              temp += "<td>"+'<div class="list-name"><h6>'+res.data.users[i].fullName+'</h6><span>ID : '+res.data.users[i].id+'</span></div></td>';
              temp += "<td>"+'<div class="block-button"><button id="unblock-button">Unblock</button></div></td></tr>';

             

            };

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

            // end for loop
            document.querySelector(".list-block").innerHTML = temp;
            document.querySelector("#unblock-button").onclick= function(e){
              e.preventDefault();
              console.log(localStorage.getItem('blockUserId'));
              fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
                {
                    method : "POST",
                    headers : {
                        'content-type': 'application/json',
                    },
                    body : JSON.stringify({
                        query: `
                        mutation{
                          blockUser(
                            userId: ${localStorage.getItem('blockUserId')},
                            adminID: ${localStorage.getItem('idAdmin')}
                          ) {
                            statusCode
                            statusMessage
                          }
                        }
                        `,
                    }),
                }).then(res=>res.json()).then(res=>{
                  console.log(res);
                  if(res.data.blockUser.statusCode == "1"){
                    window.location.reload();
                  }
                })
            };
            
    });
  }