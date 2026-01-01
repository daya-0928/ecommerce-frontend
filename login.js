const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

function showSignup() {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
}

function showLogin() {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
}

/* SIGNUP */
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (pass !== confirm) {
    alert("Passwords do not match");
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
      alert("Signup successful!");
      showLogin();
    })
    .catch(err => alert(err.message));
});

/* LOGIN */
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
});
