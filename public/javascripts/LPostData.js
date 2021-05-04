function LPostData()
{
    var xhr = new XMLHttpRequest();
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/createLprofile');
    }
    else {
        xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/createLprofile');
    }
    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                window.location.href= "/match.html"; 
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

    xhr.send(JSON.stringify(
        {"uid" : getCookie('uid'), "Name": document.getElementById('name').value,"Phone": document.getElementById('phone').value,"numRoom": document.getElementById("numRoom").value, "location" : document.getElementById("location").value, "Picture URL": document.getElementById('myLink').value, "description": document.getElementById('description').value, "price": document.getElementById("price").value  }
    ));
    
    
    
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
