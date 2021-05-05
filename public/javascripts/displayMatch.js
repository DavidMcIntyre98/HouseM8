function displayMatch(){
    console.log("in getrooms");
    var xhr = new XMLHttpRequest();
    var uType = getCookie("uType");
    if (uType=="landlord"){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/lgetmatches2');
        }
        else {
            xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/lgetmatches2');
        } 
    }
    else if (uType == "tenant"){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/getmatches2');
        }
        else {
            xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/getmatches2');
        } 
    }                   

    var text = getCookie('uid');
    //var text1 = text.replace(/['"]+/g, '');
    xhr.send(text);

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var matches = JSON.parse(xhr.responseText);
                //console.log(roomsString);
                if (matches[0] == undefined){
                    document.getElementById("name").innerHTML="No matches yet, get swiping!"
                    document.getElementById("location").innerHTML = " ";
                    document.getElementById("price").innerHTML = " ";
                    document.getElementById("phone").innerHTML = " ";
                    document.getElementById("description").innerHTML = " ";
                    document.getElementById("image").src = "img/holder2.png";
                }
                else {
                    document.getElementById("name").innerHTML = matches[0].name;
                    document.getElementById("location").innerHTML = matches[0].city;
                    document.getElementById("price").innerHTML = matches[0].price;
                    document.getElementById("phone").innerHTML = matches[0].Phone;
                    document.getElementById("description").innerHTML = matches[0].description;
                    document.getElementById("image").src = matches[0].PictureURL;
                }
            } else {
                console.log("An error occurred....."); // An error occurred during the request.
            }
        }
    }}

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
