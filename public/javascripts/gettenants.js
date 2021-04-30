//function returns an array of users not on the lseen table
function gettenants() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'https://us-central1-housem8-8b9bf.cloudfunctions.net/gettenants');
    
    

   

    
    
    
    
    //var text = getCookie('uid');
    
    var text ="1234";//1234 for test purposes only, to be replaced by^
    xhr.send(text);
    

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                var data = JSON.parse(xhr.responseText);


                return data
            }
        }
    }
}