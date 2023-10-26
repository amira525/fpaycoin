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
                users(where: { userRole: {eq: "Admin"}},isOrdered: false )
                {
                  id,
                  userName,
                  fullName,
                  profilePicture,
                  createdOnUtc,
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>

        {
            console.log(res);
            var temp = "";
            var i = 0;
            //start for loop
            for( i; i < res.data.users.length ; i++){
              console.log(localStorage.getItem('idUser'));
              localStorage.setItem('idUser' , res.data.users[i].id);
              temp += '<tr>';
              temp += "<td>"+'<div class="user-account"><div class="frist-letters" ><img src='+`${res.data.users[i].profilePicture}`+'></div><div class="account-name"><span>'+res.data.users[i].fullName+'</span></div></div></td>';
              temp += "<td>"+"<div class='user-account'>"+
              "<span>"+res.data.users[i].userName+"</span>"+"</div>"+"</td>";
              temp += "<td>"+"<div class='hour-work'>10H</span>"+"</div>"+"</td>";
              temp += "<td>"+"<div class='action'>"+"<span class='icon'>"+"<i class='fas fa-ellipsis-h'>"+"</i></span>"
            +"</div>"+"</td></tr>"+"<div class='minu-action'><ul><li><a href='./account-management.html'>History</a></li>";
              temp +="<li class='show-popup-block' data-popup='.block-popup'><a>Remove admin</a></li></ul></div>";
            
            }; 
            // end for loop
            document.querySelector(".table-admins-account").innerHTML = temp;
            $('.overview .overview-admin .admin-screen .action span i').click(function (e) {
              e.preventDefault();
              console.log("0000");
              $('.minu-action').fadeToggle();
          });

          //block the account
        $('.show-popup-block').click(function (e) {
          e.preventDefault();
          console.log("5555");
          $($(this).data('popup')).css(
              "display","block"
          ).fadeIn();
          });
          $('.block-popup .close').click(function (e) {
              e.preventDefault();
              $('.block-popup').fadeOut();
          });
          $('.block-popup').click(function () {
              $(this).fadeOut();
          });
          $('.block-popup .inner').click(function (e) {
              e.stopPropagation();
              $(this).parentsUntil('.block-popup').parent().fadeOut();
          });

          $('.block-popup .inner .ui-slider-handle ui-corner-all ui-state-default').append('<i class="fas fa-long-arrow-alt-right"></i>');


        
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

        //remove admins

        document.querySelector(".block-buttons").onclick = function(){
            fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
              {
                  method : "POST",
                  headers : {
                      'content-type': 'application/json',
                  },
                  body : JSON.stringify({
                      query: `
                      mutation{
                        removeAdminn (
                          userId: ${localStorage.getItem('userId')},
                          adminID: ${localStorage.getItem('idAdmin')}
                      
                        ) {
                          statusCode
                          statusMessage
                        }
                      }
                      `,
                  }),
              }).then(res=>res.json()).then(res =>
                {
                  console.log(res);
                  if(res.data.removeAdminn.statusCode == "1"){
                    window.location.reload();
                  }
                });
          };
        }