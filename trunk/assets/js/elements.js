function createNewItem(counter, name, address){
    if(counter%2 === 0){
        var box = createBoxOdd();
    }
    else{
        var box = createBoxEven();
    }
    box.appendChild(createIcon());
    box.appendChild(createNameBox(name));
    box.appendChild(createAddressBox(address));
    var element=document.getElementById("results");
    element.appendChild(box);
}

function createBoxOdd(){
    return createElement("div", "resultboxodd");
}

function createBoxEven(){
    return createElement("div", "resultboxeven");
}

function createIcon(){
    var content = createElement("div", "boxnumber");
    content.appendChild(createElement("img", "http://www.clker.com/cliparts/Y/d/d/b/I/5/google-maps-purple-marker-hi.png"));
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
