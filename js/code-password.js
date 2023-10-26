let codeForgetPw = document.getElementById("code");
//confirm code
document.querySelector("#continue-button-code").onclick = function(e){
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
        verifyCodeByEmail(
          code: "${codeForgetPw.value}",
          userID: ${parseInt(localStorage.getItem('oldUserId'))},
          codeType: "emailPass"
        ) {
          userId,
          statusCode,
          statusMessage
        }
      }
      `,
  }),
  
}).then(res=>res.json()).then(res=>{
  console.log(res);
  localStorage.setItem('newUserId' , res.data.verifyCodeByEmail.userId)
  if(res.data.verifyCodeByEmail.statusCode == "1"){
      // window.location = './new-password.html';
      window.location = './new-password.html';
  }else{
      document.querySelector(".massage-error").style.display = "block";
      document.querySelector(".massage-error").style.marginBottom = "30px";
      document.querySelector(".massage-error").innerHTML = JSON.stringify(res.data.verifyCodeByEmail.statusMessage);
  }
})
  
}
console.log(localStorage.getItem('oldUserId'))

let newPwEmail = document.getElementById("new-pw-email");
let newPw = document.getElementById("new-pw");
let confirmNewPw = document.getElementById("new-confirm-pw");
// document.getElementById("change-pw").onclick = function(){
//   fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
// {
//     method : "POST",
//     headers : {
//         'content-type': 'application/json',
//     },
//     body : JSON.stringify({
//         query: `
//         mutation{
//             changeUserPassword 
//             (
//               changePasswordModel: {
//                 userId :"",
//                 token : "",
//                 currentPassword : "${newPw.value}",
//                 newPassword: "${confirmNewPw.value}",
//               }
//             ){
          
//               userId
//               token
//               result {     
//                 statusCode
//                 statusMessage
//               }
//             }
//           }
//         `,
//     }),
    
// }).then(res=>res.json()).then(res=>{
//     console.log(res);
//     console.log("hi");
//     // if(res.data.forgetPasswordByEmail.statusCode == "1"){
//     //     window.location = './code-reset-password.html';
//     // }else{
//     //     document.querySelector(".massage-error").style.display = "block";
//     //     document.querySelector(".massage-error").style.marginBottom = "30px";
//     //     document.querySelector(".massage-error").innerHTML = JSON.stringify(res.data.forgetPasswordByEmail.statusMessage);
//     // }
// })
// }