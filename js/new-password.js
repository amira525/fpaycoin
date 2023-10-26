let newPwEmail = document.getElementById("new-pw-email");
let newPwUserId = document.getElementById("new-pw-id")
let newPw = document.getElementById("new-pw");

// let confirmNewPw = document.getElementById("new-confirm-pw");
document.getElementById("change-pw").onclick = function(e){
  e.preventDefault();
  console.log("000");
fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
{
    method : "POST",
    headers : {
        'content-type': 'application/json',
    },
    body : JSON.stringify({
        query: `
        mutation{
          changeUserPassword 
          (
            changePasswordModel: {
              isForget:true
              userId:"${newPwUserId.value}",
              email:"${newPwEmail.value}",
              newPassword: "${newPw.value}",
            }
          ){
        
            userId
            token
            result {     
              statusCode
              statusMessage
            }
          }
        }
        `,
    }),
    
}).then(res=>res.json()).then(res=>{
    console.log(res);
    console.log(localStorage.getItem('newUserId'));
    if(res.data.changeUserPassword.result.statusCode == "1"){
        window.location = './sign-in.html';
    }else{
        document.querySelector(".massage-error").style.display = "block";
        document.querySelector(".massage-error").style.marginBottom = "30px";
        document.querySelector(".massage-error").innerHTML = JSON.stringify(res.data.changeUserPassword.result.statusMessage);
    }
})
}
// console.log(localStorage.getItem('newUserId'));