function newUser() {
    {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://us-central1-first-project-38219.cloudfunctions.net/getuser');



// Track the state changes of the request.
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    var sHTML = "";
                    var data = JSON.parse(xhr.responseText);


                    var validName = true;
                    for(var i=0; i<data.length; i++)
                    {
                        if(data[i].username ==document.getElementById("username").value)
                        {
                            document.getElementById("taken").innerHTML ="That email is already associated with an account. Try another";
                            validName = false;
                            break;
                        }