// POST comments
function tlike() {
    
    var Utype = document.getElementById("Utype").value;
    console.log("hurrrr");
    var xhr = new XMLHttpRequest();
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        console.log("hurrrr1");
        xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/like');
    }
    else {
        xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/like');
        console.log("hurrrr2");
    }
    xhr.setRequestHeader("Content-type", "application/json")

    console.log("hurrrr3");
    
    if(Utype=='tenant'){
        xhr.send(JSON.stringify(
            {"tid": getCookie('uid'), "lid": 	document.getElementById('viewing').value}));
    }
    else
    {
        xhr.send(JSON.stringify(
            {"lid": getCookie('uid'), "tid": 	document.getElementById('viewing').value}));
    }

    display();
    /*xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log("hey"+ getCookie('uid'));
                console.log("hurrrr3");
                xhr.send(JSON.stringify(
                    {"tid": getCookie('uid'), "lid": 	document.getElementById('viewing').value}

                    
                ));*/

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {            
                var isMatch = xhr.responseText;
                console.log("hurrrr4");
                console.log("response" +xhr.responseText)
                if(isMatch=="true"){alert("You have matched");}
             else {
                console.log('no match ' ); // An error occurred during the request.
            }
        }
    }}
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

        function display()
{


    console.log("pow");
    //add the profile to the seen collection

    if(document.getElementById("Utype").value=="tenant")
    {    
        var xhr = new XMLHttpRequest();
        console.log("howya");
        xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/useen');
        
    
        xhr.setRequestHeader("Content-type", "application/json");
        // Track the state changes of the request.
        console.log("trying useen");
        xhr.onreadystatechange = function () {
            console.log("trying useen2");
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    console.log("All good"); 
                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
        };
    
        xhr.send(JSON.stringify(
            {"tid": getCookie('uid'), "lid": 	document.getElementById('viewing').value}
        ));

        }
        else{
        var xhr = new XMLHttpRequest();
        console.log("howya");
        xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/lseen');
        
    
        xhr.setRequestHeader("Content-type", "application/json");
        // Track the state changes of the request.
        console.log("trying useen");
        xhr.onreadystatechange = function () {
            console.log("trying useen2");
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    console.log("All good"); 
                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
        };
    
        xhr.send(JSON.stringify(
            {"tid": getCookie('uid'), "lid": 	document.getElementById('viewing').value}
        ));    
        }



    
    let i =document.getElementById("myHiddenField").value;
    if (i == undefined){i=0;}
    
    
    
    
    
    roomsString =document.getElementById("array").value;
    var roomsArray =JSON.parse(roomsString);
    if (roomsArray[i]== undefined)
    {
        document.getElementById("viewing").value="end of Array";
        document.getElementById("price").innerHTML=" ";
        document.getElementById("location").innerHTML=" ";
        document.getElementById("test").innerHTML ="You have viewed all profiles within your criteria";

    }
    document.getElementById("viewing").value=roomsArray[i].uid;
    document.getElementById("price").innerHTML=roomsArray[i].price;
    document.getElementById("location").innerHTML=roomsArray[i].city;
    document.getElementById("test").innerHTML=roomsArray[i].name;
    


    i++;
    document.getElementById("myHiddenField").value = i;
    
}

   
  




