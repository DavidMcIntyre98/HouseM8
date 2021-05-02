// POST comments
function tlike() {
    
    console.log("hurrrr");
    var xhr = new XMLHttpRequest();
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/like');
    }
    else {
        xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/like');
    }
    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log("hey"+ getCookie('uid'));
                xhr.send(JSON.stringify(
                    {"tid": getCookie('uid'), "lid": 	document.getElementById('viewing').value}

                    
                ));
                var isMatch = xhr.responseText;
                if(isMatch){alert("You have matched");}
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    }
  

}


