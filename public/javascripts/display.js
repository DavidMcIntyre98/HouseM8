function display()
{ 
    console.log("pow");
    //add the profile to the seen collection

    
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
    





    let i =document.getElementById("myHiddenField").value;
    if (i == undefined){i=0;}
    
    
    
    
    
    roomsString =document.getElementById("array").value;
    var roomsArray =JSON.parse(roomsString);
    
    document.getElementById("viewing").value=roomsArray[i].uid;
    document.getElementById("cost").innerHTML=roomsArray[i].price;
    document.getElementById("location").innerHTML=roomsArray[i].city;
    document.getElementById("test").innerHTML=roomsArray[i].name;
    


    i++;
    document.getElementById("myHiddenField").value = i;
    
}