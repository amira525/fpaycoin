const params = new URLSearchParams(document.location.search);
const USERID = params.get("user");
console.log(USERID)
if(localStorage.getItem('idAdmin') == null){
//   window.location = 'sign-in-admin.html';
// }else{
//confirm identify
document.querySelector(".confirm-identify").onclick = function(){
    fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            mutation{
                confirmIdentity(
                  isValid: true,
                  userId: ${USERID},
                  adminID: ${localStorage.getItem('idAdmin')}
              
                ) {
                  statusCode
                  statusMessage
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
        console.log(res)
    })
}

//delete identify
document.querySelector(".delet-identify").onclick = function(){
    fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            mutation{
                confirmIdentity(
                  isValid: false,
                  userId: ${USERID},
                  adminID: ${localStorage.getItem('idAdmin')}
              
                ) {
                  statusCode
                  statusMessage
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
        console.log(res)
    })
}

//view identify
document.querySelector(".view-identify").onclick = function(){
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
                  id: ${USERID}
                )
                {
      
                identityPicture
      
                profilePicture 
      
                phoneNumber 
      
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
        console.log(res.data.userById.identityPicture);
        var identityPicture = '<img src='+`${res.data.userById.identityPicture}`+'>';
        document.querySelector(".card-body").innerHTML = identityPicture;
        var profilePicture = '<img src='+`${res.data.userById.identityPicture}`+'>';
        document.querySelector(".card-body").innerHTML = profilePicture;

    })
}

//view picture
document.querySelector(".view-picture").onclick = function(){
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
                  id: ${USERID}
                )
                {
      
                identityPicture
      
                profilePicture 
      
                phoneNumber 
      
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
        console.log(res.data.userById.profilePicture);
        var profilePicture = '<img src='+`${res.data.userById.profilePicture}`+'>';
        document.querySelector(".card-body").innerHTML = profilePicture;

    })
}

//view phone nummber
document.querySelector(".view-phone").onclick = function(){
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
                  id: ${USERID}
                )
                {
      
                identityPicture
      
                profilePicture 
      
                phoneNumber 
      
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
        console.log(res.data.userById.phoneNumber);
        var phoneNumber = '<h3>'+res.data.userById.phoneNumber+'</h3>';
        document.querySelector(".card-body").innerHTML = phoneNumber;

    })
}

//confirm picture
document.querySelector(".confirm-picture").onclick = function(){
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
  {
      method : "POST",
      headers : {
          'content-type': 'application/json',
      },
      body : JSON.stringify({
          query: `
          mutation{
            confirmProfilePIC(
              isValid: true,
              userId: ${USERID},
              adminID: ${localStorage.getItem('idAdmin')}
          
            ) {
              statusCode
              statusMessage
            }
          }
          `,
      }),
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      if(res.data.confirmProfilePIC.statusCode == "1"){
        window.location.reload();
      }
  })
}

//delete picture
document.querySelector(".delet-picture").onclick = function(){
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
  {
      method : "POST",
      headers : {
          'content-type': 'application/json',
      },
      body : JSON.stringify({
          query: `
          mutation{
            confirmProfilePIC(
              isValid: false,
              userId: ${USERID},
              adminID: ${localStorage.getItem('idAdmin')}
          
            ) {
              statusCode
              statusMessage
            }
          }
          `,
      }),
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      if(res.data.confirmProfilePIC.statusCode == "1"){
        window.location.reload();
      }
  })
}

//confirm phone number
document.querySelector(".confirm-phone").onclick = function(){
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
  {
      method : "POST",
      headers : {
          'content-type': 'application/json',
      },
      body : JSON.stringify({
          query: `
          mutation{
            confirmPhone(
              isValid: true,
              userId: ${USERID},
              adminID: ${localStorage.getItem('idAdmin')}
          
            ) {
              statusCode
              statusMessage
            }
          }
          `,
      }),
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      if(res.data.confirmPhone.statusCode == "1"){
        window.location.reload();
      }
  })
}

//delete phone number
document.querySelector(".delet-phone").onclick = function(){
  fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
  {
      method : "POST",
      headers : {
          'content-type': 'application/json',
      },
      body : JSON.stringify({
          query: `
          mutation{
            confirmPhone(
              isValid: false,
              userId: ${USERID},
              adminID: ${localStorage.getItem('idAdmin')}
          
            ) {
              statusCode
              statusMessage
            }
          }
          `,
      }),
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      if(res.data.confirmPhone.statusCode == "1"){
        window.location.reload();
      }
  })
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

 // show popup image
 $('.show-popup-image').click(function (e) {
    e.preventDefault();
    $($(this).data('popup')).css(
        "display","block"
    ).fadeIn();
});
$('.popup-img .close').click(function (e) {
    e.preventDefault();
    $('.popup-img').fadeOut();
});
$('.popup-img').click(function () {
    $(this).fadeOut();
});
$('.popup-img .inner').click(function (e) {
    e.stopPropagation();
    $(this).parentsUntil('.popup-img').parent().fadeOut();
});

$('.popup-img .inner .ui-slider-handle ui-corner-all ui-state-default').append('<i class="fas fa-long-arrow-alt-right"></i>');
// send massage
let massage = document.querySelector("#send-notes")
document.querySelector("#activation-send").onclick = function(e){
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
            sendNotes (
              userID: ${USERID}
          
          subject: "Reason of refuse attachments "
          
          message:  "${massage.value}"
            ) {
              statusCode
              statusMessage
            }
          }
          `,
      }),
  }).then(res=>res.json()).then(res=>{
      console.log(res)
      
  })
}
}