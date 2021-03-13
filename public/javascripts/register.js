function register() {
    let email = document.getElementById('exampleInputEmail1').value 
    let password = document.getElementById('exampleInputPassword1').value 

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);
    window.location.href= "/secure.html"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log(errorMessage, errorCode);
  });
}