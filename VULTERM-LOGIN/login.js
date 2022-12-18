const togglePassword = document.querySelector("#see_psw");
const form = document.getElementById("form")

togglePassword.addEventListener("click", function (e) {
    const password = document.querySelector("#password");
    // // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye");
});

//Form Validation
function checkInputs() {
  // trim to remove the whitespaces
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();;
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
  if(formControls.length ===2){
    fetch("https://team-vulture2-backend.vercel.app/users/login", {
      method: "POST",
      body: JSON.stringify({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
  }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(function (jsonResponse) {
        form.submit()
        return jsonResponse["user"]
    })
    .then(function (user) {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("auth", true)
        swal({
          title: "Login!!!",
          text: " Login Successfully",
          icon: "success",
          button: "OK!",
        });
        window.location.href = "../Dashboard/Db.html"
    })
    .catch(function (err) {
        console.log(err.message)
        swal({
          title: "Error!!!",
          text: " Login failed, Please verify your details and try again",
          icon: "failure",
          button: "OK!",
        });
    });
  }
};
