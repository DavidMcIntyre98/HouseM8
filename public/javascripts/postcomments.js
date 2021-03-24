// POST comments
function postComment() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/postcomments');

    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                getComments(); // 'Call get comments to retrieve the latest'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

    xhr.send(JSON.stringify(
        {"handle": document.getElementById('handle').value, "comment": 	document.getElementById('comment').value, "uid" : getCookie('uid')}
    ));
}

// W3C Schools
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}