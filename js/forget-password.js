let emailForgetPw = document.getElementById("forget-email");
document.querySelector("#send-code").onclick = function(e){
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
            forgetPasswordByEmail 
            (
              email: "${emailForgetPw.value}"
            ){
              userId
              statusCode
              statusMessage
            }
          }
        `,
    }),
    
}).then(res=>res.json()).then(res=>
   { console.log(res);
    localStorage.setItem('oldUserId' , res.data.forgetPasswordByEmail.userId)
    if(res.data.forgetPasswordByEmail.statusCode == "1"){
        window.location = './code-reset-password.html';
    }else{
        document.querySelector(".massage-error").style.display = "block";
        document.querySelector(".massage-error").style.marginBottom = "30px";
        document.querySelector(".massage-error").innerHTML = JSON.stringify(res.data.forgetPasswordByEmail.statusMessage);
    }

})
}
