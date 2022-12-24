const form = document.getElementById("form")
const password = document.getElementById("password");
const CPassword = document.getElementById("CPassword");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber")

//post form submission form
const success = document.querySelector('.success_message');
const failure = document.querySelector('.failure_message');
const form_message = document.querySelector('.form_message');
const body = document.querySelector('body');

// redirrction to dashboard if user exist and already logged in
if (JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth"))){
    window.location.replace("./dashboard.html")
}

//Form Validation
function checkInputs() {
  // trim to remove the whitespaces
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const CPasswordValue = CPassword.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  if (firstNameValue === "") {
    setErrorFor(firstName, "First Name cannot be empty");
  } else {
    setSuccessFor(firstName);
  }

  if (lastNameValue === "") {
    setErrorFor(lastName, "Last Name cannot be empty");
  } else {
    setSuccessFor(lastName);
  }

  if (phoneNumberValue === "") {
    setErrorFor(phoneNumber, "Phone number cannot be empty");
  } else {
    setSuccessFor(phoneNumber);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be empty");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Looks like this is not an email");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be empty");
  } else if (passwordValue.length < 8){
    setErrorFor(password, "password must have minimum of 8 characters");
  }else {
    setSuccessFor(password);
  }
  
  if(CPasswordValue === ""){
    setErrorFor(CPassword, "confirm password cannot be empty");
  } else if(CPasswordValue !== "" && passwordValue !== CPasswordValue){
    setErrorFor(CPassword, "Passwords did not match");
  } else {
    setSuccessFor(CPassword);
  }
}

//setError function
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

//set success function
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
//email validation function
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
form.onsubmit = function (e) {
  e.preventDefault();
  checkInputs()
  const formControls = document.querySelectorAll(".success")
  if(formControls.length === 6){
    return;
  }
  fetch("https://team-vulture2-backend.vercel.app/users/register", {
    method: "POST",
    body: JSON.stringify({
        email: document.getElementById("email").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        password: document.getElementById("password").value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(function (jsonResponse) {
      return jsonResponse["user"]
  })
  .then(function (user) {
      form.submit()
      console.log(user)
      swal({  
        title: "Registration!!!",  
        text: " User Registration Successful\nYou will be directed now to the login page",  
        icon: "success",  
        button: "OK!"
      });
      window.location.replace("./Login.html") 
  })
  .catch(function (err) {
      console.log(err.message)
      swal({  
        title: "Registration Unsuccessful!!!",  
        text: "please try again later",  
        icon: "alert",  
        button: "OK!"
      });
  });
  }
