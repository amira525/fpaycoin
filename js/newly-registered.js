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
                users(isOrdered: true){
                  userName,
                  email,
                  id,
                  profilePicture
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
              temp += "<tr>";
              temp += "<td><span>"+res.data.users[i].id+"</span></td>"
              temp += "<td>"+"<div class='user-account'><div class='account-img'><img src="+`${res.data.users[i].profilePicture}`+"></div><div class='account-name'><span>"+res.data.users[i].userName+"</span></div></div></td>";
              temp += "<td>"+"<div class='account-email'>"+
              "<span>"+res.data.users[i].email+"</span>"+"</div>"+"</td></tr>"
            }; 
            // end for loop
            document.querySelector(".table-newly-registered").innerHTML = temp;
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


//account activiation
fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            query {
              users(where: { isActive: {eq: true}},isOrdered: false )
              {
                id,
                userName,
                profilePicture,
                createdOnUtc,
                isActive,
                
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
              temp += "<tr>";
              temp += "<td><span>"+res.data.users[i].id+"</span></td>"
              temp += "<td>"+"<div class='user-account'><div class='account-img'><img src="+`${res.data.users[i].profilePicture}`+"></div><div class='account-name'><span>"+res.data.users[i].userName+"</span></div></div></td>";
              if(res.data.users[i].createdOnUtc == null){
                temp +="<td></td>";
                temp +="<td></td></tr>";
              }else{
              temp += "<td>"+"<div class='account-email'>"+
              "<span>"+res.data.users[i].createdOnUtc.split("T")[0]+"</span>"+"</div>"+"</td>";
              temp += "<td>"+"<div class='account-email'>"+
              "<span>"+res.data.users[i].createdOnUtc.split("T")[1].split(".")[0]+"</span>"+"</div>"+"</td></tr>";
              }
            }; 
            // end for loop
            document.querySelector(".table-activation").innerHTML = temp;
        });

        //walat
        fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            query{
              users(isOrdered: false,where: {walletRequest:{eq:true}}){
                id
                walletRequestCreatedOnUtc
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
              temp += "<tr>";
              temp += "<td><span>"+res.data.users[i].id+"</span></td>"
              // if(res.data.users[i].createdOnUtc == null){
              //   temp +="<td></td>";
              //   temp +="<td></td></tr>";
              // }else{
              temp += "<td>"+"<div class='account-email'>"+
              "<span>"+res.data.users[i].walletRequestCreatedOnUtc.split("T")[0]+"</span>"+"</div>"+"</td>";
              temp += "<td>"+"<div class='account-email'>"+
              "<span>"+res.data.users[i].walletRequestCreatedOnUtc.split("T")[1].split(".")[0]+"</span>"+"</div>"+"</td>";
              temp += '<td><span class="show-activate-popup items-one" data-popup=".activate-popup"><i class="fas-solid fas fa-check"></i></span><span class="items-two show-deactivate-popup" data-popup=".deactivate-popup"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">'+
              '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></span><span class="items-three"><i class="fas-solid fas fa-exclamation"></i></span></td></tr>';
              // }
            }; 
            // end for loop
            document.querySelector(".table-wallet-request").innerHTML = temp;
            // Deactivate the account
    $('.show-deactivate-popup').click(function (e) {
      e.preventDefault();
      $($(this).data('popup')).css(
          "display","block"
      ).fadeIn();
  });
  $('.popup .close').click(function (e) {
      e.preventDefault();
      $('.popup').fadeOut();
  });
  $('.popup').click(function () {
      $(this).fadeOut();
  });
  $('.popup .inner').click(function (e) {
      e.stopPropagation();
      $(this).parentsUntil('.popup').parent().fadeOut();
  });
  
  $('.popup .inner .ui-slider-handle ui-corner-all ui-state-default').append('<i class="fas fa-long-arrow-alt-right"></i>');

  //activate the account
  $('.show-activate-popup').click(function (e) {
      e.preventDefault();
      $($(this).data('popup')).css(
          "display","block"
      ).fadeIn();
  });
  $('.activate-popup .close').click(function (e) {
      e.preventDefault();
      $('.activate-popup').fadeOut();
  });
  $('.activate-popup').click(function () {
      $(this).fadeOut();
  });
  $('.activate-popup .inner').click(function (e) {
      e.stopPropagation();
      $(this).parentsUntil('.activate-popup').parent().fadeOut();
  });
  
  $('.activate-popup .inner .ui-slider-handle ui-corner-all ui-state-default').append('<i class="fas fa-long-arrow-alt-right"></i>');


    })
}       