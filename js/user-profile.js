if(localStorage.getItem('userId') == null){
//   window.location = 'sign-in.html';
// }else{
$(function () {
	'use strict';
     
//active link at minu
$('.view-profile ul li').click(function () {
    console.log("hi");
    $(".view-profile ul li").removeClass('active').settings().addClass('active');
});

$('#tabs li').click(function () {
                
    var myID = $(this).attr('id');
            
    $(this).removeClass('inactive').siblings('li').addClass('inactive');
            
    $('.all-setting > div').hide();
            
    $('#' + myID + '-content').show();
    
});
    //

    $('.account-setting-input').blur(function () {
        if ($(this).val() == '') {
            $(this).css(
                "border","1px solid red"
            );
        }
    });

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
            id: ${localStorage.getItem("userId")}
          )
          {
            userName
            fullName
            firstName
            lastName
            email
            city
            country
            nationality
            gander
            phoneNumber
            zipPostalCode
            street
            dateOfBirth
            profilePicture
            isActive
        
        result{
              statusCode
              statusMessage
            }
         
          }
        }
        `,
    }),
    
}).then(res=>res.json()).then(res=>{console.log(res);
  document.querySelector("#img-profile").style.backgroundImage = `url(${localStorage.getItem('profilePicture')})`;
  document.querySelector("#display-image").style.backgroundImage = `url(${localStorage.getItem('profilePicture')})`;
  localStorage.setItem('profilePicture', res.data.userById.profilePicture);
    document.querySelector('.id-profile h4.user-name').innerHTML = res.data.userById.fullName;
    document.querySelector('.view-profile h6').innerHTML = res.data.userById.fullName;
    document.getElementById("email-user").value = res.data.userById.email;
    document.querySelector('.id-profile span#user-id').innerHTML = localStorage.getItem("userId");
    document.querySelector('#last-n').value = res.data.userById.lastName;
    document.querySelector('#frist-n').value = res.data.userById.firstName;
    document.querySelector('#phonenum').value = res.data.userById.phoneNumber;
    document.querySelector('#city').value = res.data.userById.city;
    document.querySelector('#country').value = res.data.userById.country;
    document.querySelector('#nationality').value = res.data.userById.nationality;
    document.querySelector('#street').value = res.data.userById.street;
    document.querySelector('#birthday').value = dateFormat(res.data.userById.dateOfBirth, 'yyyy-MM-dd');
    document.querySelector('#patcode').value = res.data.userById.zipPostalCode;
    document.querySelector(".id-profile span.user-theemail").innerHTML = res.data.userById.email;
    if(res.data.userById.isActive){
      document.querySelector('.verify').innerHTML = '<span><i class="fas fa-check"></i> verified</span>';
      document.querySelector('.verify').style.color = 'green';
      document.querySelector('.verify').style.fontWeight = 'bold';
      
    }else{
      document.querySelector('.verify').innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg> not verified</span>';
      document.querySelector('.verify span').style.color = 'red';
      document.querySelector('.verify').style.fontWeight = 'bold';
      
    }
});

});

//updata user porfile
let street = document.getElementById("street");
let emailUser = document.getElementById("email-user");
let numPhone = document.getElementById("phonenum");
let nationality = document.getElementById("nationality");
let country = document.getElementById("country");
let city = document.getElementById("city");
let patcode = document.getElementById("patcode");
let birthday = document.getElementById("birthday");
let fName = document.getElementById("frist-n");
let lName = document.getElementById("last-n");
document.getElementById("updata-button").onclick = function(e) {
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
            updateUserProfile   (
              updateUserProfileModel: {
                email : "${emailUser.value}",
                id:${localStorage.getItem("userId")},
                fullName:"${fName.value} ${lName.value}",
                firstName:"${fName.value}",
                lastName:"${lName.value}",
                phoneNumber:"${numPhone.value}",
                nationality:"${nationality.value}",
                country:"${country.value}",
                street:"${street.value}",
                city:"${city.value}",
                zipPostalCode:"${patcode.value}",
                dateOfBirth:"${birthday.value}"
              })
            {
              result{
                statusCode
                statusMessage
              }
            }
          }
        `,
    }),
}).then(res=>res.json()).then(res=>{console.log(res);
  if (res.data.updateUserProfile.result.statusCode == "1"){
    window.location.reload();
  }else{
    document.querySelector(".massage-error").style.display = "block";
      document.querySelector(".massage-error").innerHTML = "error";
  }
});



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
                userID: ${localStorage.getItem("userId")}
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


 //a simple date formatting function
function dateFormat(inputDate, format) {
  //parse the input date
  const date = new Date(inputDate);

  //extract the parts of the date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();    

  //replace the month
  format = format.replace("MM", month.toString().padStart(2,"0"));        

  //replace the year
  if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2,2));
  }

  //replace the day
  format = format.replace("dd", day.toString().padStart(2,"0"));

  return format;
}
dateFormat('2021-12-10', 'MM-dd-yyyy');


 //change the image 
 window.addEventListener('load',()=>{
  uploadImg();

})
function uploadImg() {
  const image_input = document.querySelector("#image-input");
  image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      // console.log(uploaded_image);
      document.querySelector("#img-profile").style.backgroundImage = `url(${localStorage.getItem('profilePicture')})`;
      document.querySelector("#display-image").style.backgroundImage = `url(${localStorage.getItem('profilePicture')})`;

    });
    
    reader.readAsDataURL(this.files[0]);
  });
}

//change image
function uploadFileImg(){
  var img = document.getElementById("image-input")
  if(img.value == null){
    console.log("ok")
  }else{
    console.log("no")
    var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'undefined');
   

var formdata = new FormData();
formdata.append("file", img.files[0], img.value);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://fpaycoin-001-site1.btempurl.com/api/Upload/UploadFile?memberId="+localStorage.getItem('userId')+"&isProfile=true", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  

}
console.log(localStorage.getItem('profilePicture'));



//choose image verivy
  var imgVerify = document.getElementById("image-verify-input")
  if(imgVerify.value == null){
    console.log("ok")
  }else{
    console.log("no")
  //   var myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'undefined');
   
  var formdataimg = new FormData();
formdataimg.append("file", imgVerify.files[0], imgVerify.value);

var requestOptions = {
  method: 'POST',
  body: formdataimg,
  redirect: 'follow'
};

fetch("http://fpaycoin-001-site1.btempurl.com/api/Upload/UploadFile?memberId="+localStorage.getItem("userId")+"&isProfile=false", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  

}
}


}