console.log('Hello World!');
// main.js
import { signUp, logIn, logOut, resetPassword} from "../modules/auth.js";
import { auth } from "../modules/firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user){
    console.log("logged in");
    if (window.location.pathname.endsWith("index.html")){
      window.location.href = "../dashboard.html"
    }
  }
  
  else{
    console.log("logged out")
  }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  try {
    const userCred = await signUp(email, password);
    alert("Signed up: " + userCred.user.email);
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  try {
    const userCred = await logIn(email, password);
    alert("Logged in: " + userCred.user.email);
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  logOut();
  alert("Logged out!");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  const email = prompt("Enter your email for password reset:");
  if (!email) return;
  resetPassword(email)
    .then(() => alert("Reset email sent!"))
    .catch(err => alert(err.message));
});