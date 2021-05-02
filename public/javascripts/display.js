function display()
{
    
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