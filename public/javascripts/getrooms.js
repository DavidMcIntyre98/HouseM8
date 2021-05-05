//function returns an array of landlords which are nor in the Useen table
function getrooms() {
    console.log("in getrooms");
    var xhr = new XMLHttpRequest();
    //get type of user 
     
    
   
    
    uType =document.getElementById("Utype").value;
    console.log(uType);
    
    console.log(uType);
    //get rooms if user is tenant
    if (uType=='tenant'){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/getrooms');
        }
        else {
            xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/getrooms');
        }
}
//otherwise get tenants
    else{
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            xhr.open('POST', 'http://localhost:5001/housem8-8b9bf/us-central1/gettenants');
        }
        else {
            xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/gettenants');
        }                     


        }
    

   

    
    
    
    
    
    
    var text =getCookie('uid');
    //var text1 = text.replace(/['"]+/g, '');
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
                if (roomsArray[i]== undefined)
                {
                    document.getElementById("viewing").value="end of Array";
                    document.getElementById("price").innerHTML=" ";
                    document.getElementById("location").innerHTML=" ";
                    document.getElementById("test").innerHTML ="no profiles matching";
                    document.getElementById("image").src = "none"
            
                }

                else{
                    document.getElementById("viewing").value=roomsArray[i].uid;

                    // populate fields for tenant
                    if (uType=='tenant')
                        {console.log("hello")
                        
                        document.getElementById("price").innerHTML=roomsArray[i].price;
                        document.getElementById("city").innerHTML=roomsArray[i].city;
                        document.getElementById("test").innerHTML=roomsArray[i].name;
                        document.getElementById("image").src = roomsArray[i].PictureURL;
                        }
                    //populate fields for landlord    
                    else  
                        {
                        
                        document.getElementById("price").innerHTML=roomsArray[i].price;
                        document.getElementById("city").innerHTML=roomsArray[i].city;
                        document.getElementById("test").innerHTML=roomsArray[i].name;
                        document.getElementById("image").src = roomsArray[i].PictureURL;

                        }
                    //increment i to next set of data
                    i++;
                    document.getElementById("myHiddenField").value = i;
                
                }
               //return data;
            }
        }
    }
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



function userType()
//checks if current user is tenant or Landlord
{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/checktype');

    var text =getCookie('uid');
    var text1 =text.replace(/['"]+/g, '');
    
    xhr.send(text);

     xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                
                var uType = xhr.responseText;
               // console.log ("hi" +uType.value);
                console.log("herrr"+uType);
                document.cookie = "uType=" + uType;
                console.log(document.cookie);
                //document.getElementById("userType").value=xhr.responseText;
                getrooms();
                
}

}

}

}