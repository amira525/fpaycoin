
        console.log(localStorage.getItem('idAdmin'));
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
                users(isOrdered: false){
                  userName,
                  email,
                  isActive,
                  id,
                  isBlocked,
                  profilePicture,
                  identityRequest
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>

        {
            console.log(res);
            let temp = "";
            //start for loop
          res&& res.data.users.map((user,i)=>{
              console.log(user.id);
              temp += '<tr>';
              temp +='<td><form><input type="checkbox" />';
              if(user.isActive == false){
                if(user.identityRequest == false){
                  temp += '<label class="down"> Down</label></form></td>';
                }else{
                  temp += '<label class="pending"> Pending</label></form></td>';
                }
              }else{
                temp += '<label class="active">Active</label></form></td>';
              }
              temp += '<td><div class="user-account"><div class="account-img" ><img src='+`${user.profilePicture}`+'></div><div class="account-name"><span>'+user.userName+'</span></div></div></td>'
              temp +='<td><div class="account-email"><span>'+user.email+'</span></div></td>'
              temp +='<td><div class="btn-group" role="group"><button type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button>'
            +`<div class='dropdown-menu'><ul><li id='view-profile'><a class='dropdown-item' href='./user-profile.html?user=${user.id}'>View</a></li><li id='view-profile'><a class='dropdown-item' href='./admin-management-verifications.html?user=${user.id}'>Verification</a></li>`;
            if(user.isBlocked == false){
              temp +="<li class='show-popup-block' data-popup='.block-popup'><a class='dropdown-item'>Block User</a></li></ul></div>";
            };
            if(user.isBlocked == true){
              temp +="<li class='dropdown-item show-popup-block' data-popup='.block-popup'><a class='dropdown-item'>UnBlock User</a></li></ul></div>";
            }
            temp +='</td></tr>';
           })
           console.log(temp);

            // end for loop
            document.querySelector(".admin-users").innerHTML = temp;
          });

        //  console.log(localStorage.getItem('allUserId')) 

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

        //block fetch

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
                      blockUser(
                        userId: ${localStorage.getItem('userId')}
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
                if(res.data.blockUser.statusCode == "1"){
                  window.location.reload();
                }
              });
        };

        //search
        let inputSearch = document.querySelector(".input-search");
document.querySelector(".icon-search").onclick = function(){
fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            query{
                userTrans(where: { fullName: {contains: "${inputSearch.value}"}}){
                  id
                  email
                  userName
                  fullName
                  transactions{
                    id
                    amountOfMoney
                    kindOfTransaction
                    isDeposit
                    paymentSource
                    createdOnUtc
                  }
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
        console.log(res)
    })};
      