
document.querySelector('.show-popup-sign-in').onclick = function(e) {
    e.preventDefault();
    document.querySelector('.sign-in-popup').style.display = "block";
};

document.querySelector('.sign-in-popup .close').onclick = function(e) {
    e.preventDefault();
    document.querySelector('.sign-in-popup').style.display = "none";
};

$('[required]').blur(function () {
    if ($(this).val() == '') {
        $(this).next('span').fadeIn();
    }
});
// var signInPopup = document.querySelector('.sign-in-popup .inner');
// signInPopup.addEventListener('click',function(e) {
//     e.preventDefault();
//     signInPopup.parentElement().style.display = "none";
// });
let email = document.getElementById("email");
let  signIn = document.getElementById("sign-in");
let pw = document.getElementById("password");
let inputSingIn = document.querySelectorAll('.input-sign-in');
let inputValidatorIn = {
    emailsignin: false,
    passwordsignin: false
}

// console.log(signIn);
// console.log(inputSingIn);
signIn.disabled = true;
inputSingIn.forEach((input) => {
    input.addEventListener('change', (event)=>{
        let name = event.target.getAttribute('name');
        if(event.target.value.length > 0){
            inputValidatorIn[name] = true;
        }else{
            inputValidatorIn[name] = false;
        };
        let allTrue = Object.keys(inputValidatorIn).every((item) => 
        {
            return inputValidatorIn[item] === true
        });
        if (allTrue) {
            signIn.disabled = false;

        }else{
            signIn.disabled = true;
            }
    })
    
})
// captcha
var captcha = sliderCaptcha({
    id:'captcha',
    onSuccess:function () {
    // do something
    function inputValue(){
        
    }

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
              email: "${email.value}"
              password :   "${pw.value}"
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
    localStorage.setItem ('userId', res.data.login.userId);
    localStorage.setItem ('token', res.data.login.token);
    if (res.data.login.result.statusCode == "1"){
            window.location = './overview-user.html'
        }else{
            document.querySelector(".massage-error").style.display = "block";
            document.querySelector(".massage-error").innerHTML = "error in password";
        }
});
    },
    
        setSrc:function () {
        return 'https://yourimageshare.com/ib/G7SJllFr65';
        },
        // or use local images instead
        localImages:function () {
        return '../image/Group 313.png';
        },
        

});


// var sliderMask = document.querySelector(".sliderMask").style.width = "0px";
// // console.log(sliderMask.style.width = "5");
// var slider = document.querySelector(".slider").style.left = "5px";
// if(sliderMask == slider){
//     console.log("amira")
// }else{
//     console.log("hello")
// }

var ipSystem
$.getJSON("http://api.ipify.org/?format=json", function(e) {
    ipSystem = e.ip
    console.log(ipSystem);
});


    
