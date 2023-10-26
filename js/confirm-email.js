
// function hideemail(target) {
//     var conEmail =  target, //anas.behhari@gmail.com
//      hiddenEmail = "";
//     for (i = 0; i < conEmail.length; i++) {
//       if (i > 2 && i< conEmail.indexOf("@") ) {
//         hiddenEmail += "*";
//       } else {
//         hiddenEmail += conEmail[i];
//       }
//     }
//     console.log(hiddenEmail); //an.*******@gmail.com
   
//   }hideemail();

// let email = document.getElementById("bt");
// email.addEventListener("input" , (event)=>{
//   console.log(event.target);
//   console.log(event.target.value);
//   event.target.style.color = "red";
// })



// let hideEmail = function(email) {
//         return email.replace(/(.{2})(.*)(?=@)/,
//           function(gp1, gp2, gp3) { 
//             for(let i = 0; i < gp3.length; i++) { 
//               gp2+= "*"; 
//             } return gp2; 
//           });
//       };
//       document.querySelector(".span-email").addEventListener("click", function() {
//         let emailField = document.querySelector(".span-email").innerHTML = localStorage.getItem("email");
            
//         console.log(hideEmail(emailField.value));
//       });

document.querySelector(".span-email").innerHTML = localStorage.getItem("email");




if(localStorage.getItem('userId') == null){
  window.location = 'sign-in.html';
}else{
let code = document.getElementById("code");
document.querySelector('#continue-button').onclick = function(e) {
    e.preventDefault();
    console.log("hi");
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
                  code: "${code.value}"
                  userID: ${localStorage.getItem('userId')},
                  codeType:"email"
                ) {
                  statusCode
                  statusMessage
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>{
      if(res.data.verifyCodeByEmail.statusCode == "1"){
        window.location = './Account-Setting-user.html';
      }else{
        document.querySelector(".massage-error").style.display = "block";
        document.querySelector(".massage-error").innerHTML = JSON.stringify(res.data.verifyCodeByEmail.statusMessage);
      }
    });
  
};
document.querySelector('#cancel-button').onclick = function(e) {
  e.preventDefault();
  console.log("hi");
  
  window.location = './sign-up.html'

};
}