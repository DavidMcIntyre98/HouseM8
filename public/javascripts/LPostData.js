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
         
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

    xhr.send(JSON.stringify(
        {"uid" : getCookie('uid'),"numRoom": document.getElementById("numRoom").value, "location" : document.getElementById("location").value,"minAge" : document.getElementById("minAge").value,"maxAge" : document.getElementById("maxAge").value,"price" : document.getElementById("price").value }
    ));
    
    
    
}