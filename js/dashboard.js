//the storage will have value if the user is logged in else the user shoould be redirected to login page
if(!localStorage.getItem("remember")){
    window.location.replace("./Login.html")
}


let user = localStorage.getItem("remember") == 0 ? JSON.parse(sessionStorage.getItem("user")) : JSON.parse(localStorage.getItem("user"))
const user_id = user.user_id
document.getElementById("firstName").innerHTML = user.firstName
const body = document.querySelector("body")
const button = document.querySelector("#logOut")
const header = document.querySelector("header")
const starts = document.getElementsByClassName("start")
const consent = document.getElementById("consent")
const hamburger = document.getElementById("hamburger")
const generate = document.getElementById("generate")
const links = document.querySelector(".linkcont")

let generator;
for(let i=0; i < starts.length; i++){
  let start = starts[i]
  start.addEventListener("click", ()=>{
    consent.classList = "consents active"
    if(start.parentElement.className === "terms"){
      generator = "terms"
    } else{
      generator = "policy"
    }
  })
}

generate.addEventListener("click", ()=>{
  consent.classList = "consents active"
  if(generator === "terms"){
    window.location.href = "./dashboard/termsgenerator.html"
  } else{
    window.location.href = "./dashboard/privacypolicygenerator.html"
  }
})
hamburger.addEventListener("click", ()=>{
  header.classList.toggle("active")
  console.log(header.classList)
  console.log(header.className)
})
links.addEventListener("click", ()=>{
  if(header.className == "active"){
    header.classList = ""
  }
})


button.onclick = ()=>{
    localStorage.getItem("remember") == 1 ? localStorage.removeItem("user") : sessionStorage.removeItem("user")
    localStorage.getItem("remember") == 1 ? localStorage.removeItem("auth") : sessionStorage.removeItem("auth")
    localStorage.getItem("remember") == 1 ? localStorage.removeItem("remember") : sessionStorage.removeItem("remember")
    window.location.replace("./Login.html") 
}



