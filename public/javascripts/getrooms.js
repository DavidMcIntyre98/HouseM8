//function returns an array of landlords which are nor in the Useen table
function getrooms() {
    console.log("in getrooms");
    var xhr = new XMLHttpRequest();
    
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/getrooms');
    }
    else {
        xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/getrooms');
    }
    

   

    
    
    
    
    
    
    var text =getCookie('uid');
    xhr.send(text);
    

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var roomsString = xhr.responseText;
                document.getElementById("array").value=roomsString;
                let i =document.getElementById("myHiddenField").value;
                if (i == undefined){i=0;}
                
                
                
                
                
                roomsString =document.getElementById("array").value;
                var roomsArray =JSON.parse(roomsString);
                document.getElementById("viewing").innerHTML=roomsArray[i].uid;
                document.getElementById("cost").innerHTML=roomsArray[i].price;
                document.getElementById("location").innerHTML=roomsArray[i].city;
                document.getElementById("test").innerHTML=roomsArray[i].name;
                


                i++;
                document.getElementById("myHiddenField").value = i;

                
               //return data;
            }
        }
    }
}