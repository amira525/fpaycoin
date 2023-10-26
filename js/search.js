if(localStorage.getItem('userId') == null){
  window.location = 'sign-in-admin.html';
}else{
//search admin (users)
let inputSearch = document.querySelector(".input-search");
document.querySelector(".icon-search").onclick = function(e){
  e.preventDefault();
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
  }
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