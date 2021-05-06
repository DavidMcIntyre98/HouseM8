function displayMatchUp(){
    console.log("in getrooms");
    var xhr = new XMLHttpRequest();
    var uType = getCookie("uType");
    if (uType=="landlord"){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/lgetmatches3');
        }
        else {
            xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/lgetmatches3');
        } 
    }
    else if (uType == "tenant"){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/getmatches3');
        }
        else {
            xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/getmatches3');
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
                var matchString = xhr.responseText;
                console.log(matchString);
                console.log(document.getElementById("array").value);
                if(matchString != null){
                    document.getElementById("array").value = matchString;
                    console.log(matchString);
                    let i = document.getElementById("myHiddenField").value;
                    if (i == undefined){i=0;}

                    matchString = document.getElementById("array").value;
                    var matchArray = JSON.parse(matchString);
                    console.log(matchArray);
                    if (matchArray[i] == undefined){
                        document.getElementById("name").innerHTML="No matches yet, get swiping!"
                        document.getElementById("location").innerHTML = " ";
                        document.getElementById("price").innerHTML = " ";
                        document.getElementById("phone").innerHTML = " ";
                        document.getElementById("description").innerHTML = " ";
                        document.getElementById("image").src = "img/holder2.png";
                        document.getElementById("message").innerHTML = " "; 
                    }
                    else {
                        document.getElementById("name").innerHTML = matchArray[i].name;
                        document.getElementById("location").innerHTML = matchArray[i].city;
                        document.getElementById("price").innerHTML = matchArrayp[i].price;
                        document.getElementById("phone").innerHTML = matchArray[i].Phone;
                        document.getElementById("description").innerHTML = matchArray[i].description;
                        document.getElementById("image").src = matchArray[i].PictureURL;
                        document.getElementById("message").innerHTML = matchArray[i].chatString
                    }
                    i++;
                    document.getElementById("myHiddenField").value = i;
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
