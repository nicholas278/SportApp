function createNewItem(name, address, dist){
    var box = createResultBox();
    box.appendChild(createIcon());
    box.appendChild(createDistBox(dist));
    box.appendChild(createNameBox(name));
    box.appendChild(createAddressBox(address));
    var element=document.getElementById("results");
    element.appendChild(box);
}

function createResultBox(){
    return createElement("div", "resultbox");
}

function createIcon(){
    var content = createElement("div", "boxnumber");
    //content.appendChild(createElement("img", "http://www.clker.com/cliparts/Y/d/d/b/I/5/google-maps-purple-marker-hi.png"));
    return content;
}

function createDistBox(distance){
    var content = createElement("div", "boxdistance");
    if(distance){
        var node=document.createTextNode(distance.toFixed(1)+"km");
        content.appendChild(node);
    }
    return content;
}

function createNameBox(name){
    var content = createElement("div", "boxname");
    var node=document.createTextNode(name);
    content.appendChild(node);
    return content;
}

function createAddressBox(address){
    var content = createElement("div", "boxaddress");
    var node=document.createTextNode(address);
    content.appendChild(node);
    return content;
}

function createElement(tag, property){
    var element = document.createElement(tag);
    if(property !== null){
        if(tag === "div"){
            element.className = property;
        }
        else if(tag === "img"){
            element.src = property;
        }
    }
    return element;
}

function sortSports(sports, lat, lng){
    var sortedList = [];
    for(var i in sports){
        sortedList.push({dist: distance(sports[i].latitude, sports[i].longitude, lat, lng), sports: sports[i]});
    }
    sortedList.sort(compare);
    return sortedList;
}

function compare(a,b) {
  if (a.dist < b.dist)
     return -1;
  if (a.dist > b.dist)
    return 1;
  return 0;
}