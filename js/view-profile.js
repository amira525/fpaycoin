const params = new URLSearchParams(document.location.search);
const USER_ID = params.get("user");
console.log(USER_ID)
if(localStorage.getItem('idAdmin') == null){
  window.location = 'sign-in-admin.html';
}else{
  //user profile
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
  {
      method : "POST",
      headers : {
          'content-type': 'application/json',
      },
      body : JSON.stringify({
          query: `
          query {
            transaction(where: { applicationUserID: {eq: ${USER_ID} }}){
              applicationUserID
              kindOfTransaction
              isDeposit
              paymentSource
              amountOfMoney
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
            temp += '<tr>';
            temp += "<td>"+'<span>'+res.data.transaction[i].applicationUserID+'</span></td>';
            temp += "<td><span>"+res.data.transaction[i].createdOnUtc+"</span></td>";
            temp += "<td><span>"+res.data.transaction[i].paymentSource+"</span></td>";
            temp += "<td><span>"+res.data.transaction[i].amountOfMoney+"</span></td>";
            temp += "<td>";
            if(res.data.transaction[i].isDeposit == false){
          //     // if(res.data.transaction[i].identityRequest == false){
                temp += "<span class='down'> Decline</span></form>";
          //     // }else{
          //     //   temp += "<span class='pending'> Pending</span></form>";
          //     // }
            }else{
              temp += "<span class='active'>Successful</span></form>";
            }
            temp += "<td>"+"<div class='action'>"+"<span class='icon'>"+"<i class='fas fa-ellipsis-h'>"+"</i></span>"
          +"</div>"+"</td></tr>"+"<div class='minu-action'><ul><li id='payment-details'><a href='#'>Payment Details</a></li>";
          // if(res.data.transaction[i].isBlocked == false){
            temp +="<li class='show-popup-block' data-popup='.block-popup'><a>Block User</a></li></ul></div>";
          // };
          // if(res.data.transaction[i].isBlocked == true){
          //   temp +="<li class='show-popup-block' data-popup='.block-popup'><a>UnBlock User</a></li></ul></div>";
          // }
          }; 
          // end for loop
          document.querySelector(".table-profile-user").innerHTML = temp;


          //detilas profile
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
                      id: ${USER_ID}
                    )
                    {
                      userName
                      fullName
                      email
                      profilePicture
                  
                  result{
                        statusCode
                        statusMessage
                      }
                   
                    }
                  }
                  `,
              }),
              
          }).then(res=>res.json()).then(res=>{console.log(res);
            temp = '<img src='+`${res.data.userById.profilePicture}`+'>';
            document.querySelector(".image-profile").innerHTML = temp;
            document.querySelector(".profile-info h5").innerHTML = res.data.userById.fullName;
            document.querySelector(".profile-info span").innerHTML = res.data.userById.email;
          });
          
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


        document.querySelector(".block-buttons").onclick= function(e){
          e.preventDefault();
          console.log("00");
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
                        userId: ${USER_ID},
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
                // document.querySelector(".block-popup").style.display = 'block'
                window.location.reload();
                document.querySelector(".show-popup-block").innerHTML = 'UnBlock user';
              }
            })
        };
}