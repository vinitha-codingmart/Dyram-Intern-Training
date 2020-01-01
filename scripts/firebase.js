var email, password, register;

function validate() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Failed, User is already registered");
    });
}

// Authenticate

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("modalClose").click();
        console.log(email);
        document.getElementById("userIcon").innerHTML = email.toString().charAt(0);
        console.log(email);
        document.getElementById("userImage").style.display = "none";
        document.getElementById("userIconCont").style.display = "none";
        register = true;
        // ...
    } else {
        // User is signed out.
        // ...
        // alert("signed out");
        register = false;
        document.getElementById("logout").style.display = "none";
        document.getElementById("userImage").style.display = "block";
        document.getElementById("logoutmodalClose").click();
    }
});

//Sign in - firebase
function signIn() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    document.getElementById("logout").style.display = "block";
    document.getElementById("logout").innerHTML = email.charAt(0).toUpperCase();
    document.getElementById("logoutModalImage").innerHTML = email.charAt(0).toUpperCase();
    document.getElementById("logoutModalName").innerHTML = email
    document.getElementById("userImage").style.display = "none";
    document.getElementById("modalClose").click();
}

//Sign-out -- firebase
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Signed out")
    }).catch(function (error) {
        // An error happened.
    });
}