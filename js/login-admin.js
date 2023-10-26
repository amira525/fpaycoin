let adminEmail = document.getElementById("username-admin");
let adminPw = document.getElementById("pw-admin");
document.querySelector("#login-admin").onclick = function(e){
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
              login  (
                loginModel: {
                email: "${adminEmail.value}"
                password :   "${adminPw.value}"
                deviceInfo : "${$.getJSON("http://api.ipify.org/?format=json", function(e) {e.ip})}"
                }){
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
        if(res.data.login.result.statusCode == "1"){
          localStorage.setItem('idAdmin', res.data.login.userId)
        window.location = './overview-admin.html'
        }else{
          document.querySelector(".massage-error").style.display = "block";
            document.querySelector(".massage-error").innerHTML = "error in password";
        }
        // window.location
    });
    console.log(localStorage.getItem('idAdmin'))
};

var ipSystem
$.getJSON("http://api.ipify.org/?format=json", function(e) {
    ipSystem = e.ip
    console.log(ipSystem);
});
