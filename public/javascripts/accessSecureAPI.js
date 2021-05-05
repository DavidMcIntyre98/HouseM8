function getSecureAPI(){
    var xhr = new XMLHttpRequest();
    console.log(location.hostname);
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('GET', 'http://localhost:5001/housem8-8b9bf/us-central1/authorizedendpoint');
    }
    else {
        xhr.open('GET', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/authorizedendpoint');
    }

    // Track the state changes of the request.
    xhr.onreadystatechange = function() {
        var DONE = 4;  // readyState 4 = request is done
        var OK = 200; // status 200 = successful return
        if(xhr.readyState === DONE) {
            if(xhr.status === OK) {
                //response.innerHTML = xhr.responseText;
                console.log("Successfully authenticated")
            } else {
                //response.innerHTML = "Unauthorized to view this content";
                console.log('Error: '+xhr.status); // An error occured during the request
                alert("Unauthorized to view this page. Please sign up or log in to view this content.");
                window.location.href = "/index.html";
            }
        }
    };
    
    // set the authorization header
    xhr.setRequestHeader('Authorization','Bearer '+getCookie('accessToken'))
    xhr.send(null);
}

function getCookie(cname) {
    var name = cname +"=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout() {

    firebase.auth().signOut().then(() => {
        console.log("Sign out successful");
        // Reset cookie
        document.cookie = "accessToken= ";
        document.cookie = "uid= ";
        document.cookie = "uType= ";
        // Redirect to the home page
        window.location.href = "/index.html"
        // Sign-out successful.
    }).catch((error) => {
        // An error happened
    });
}