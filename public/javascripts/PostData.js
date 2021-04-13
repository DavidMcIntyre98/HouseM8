function PostData()
{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/createprofile');

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
        {"uid" : getCookie('uid'),"name": document.getElementById("name").value, "age" : document.getElementById("age").value,"studying" : document.getElementById("studying").value,"city" : document.getElementById("city").value,"cName" : document.getElementById("cName").value }
    ));
    
    
    
    


    //document.getElementById("putCookie").innerHTML=UserId;


}