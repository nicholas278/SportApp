function displayResults(filtersList, sportArray, currentPage, maxPage){
    document.getElementById("typebox").innerHTML = "";
    for(var i in filtersList){
        createFilterList(i, filtersList[i]);
    }
    for(var i in sportArray){
        createMarker(new google.maps.LatLng(sportArray[i].latitude, sportArray[i].longitude));
        createNewItem(sportArray[i].name, sportArray[i].address, sportArray[i]["sport"], sportArray[i]["distance"], i);
    }
    if(markers.length > 0){
        adjustZoom();
    }
    pageNavButtons(currentPage, maxPage);   
}

function createNewItem(name, address, type, dist, index){
    var box = createResultBox(index);
    box.appendChild(createIcon());
    box.appendChild(createDistBox(dist));
    box.appendChild(createNameBox(name));
    box.appendChild(createAddressBox(address));
    box.appendChild(createSportTypeBox(type));
    var element=document.getElementById("results");
    element.appendChild(box);
}

function createFilterList(filterType, filterItem){
    var content = createElement("div", "filterbox");
    var node = document.createTextNode(filterItem);
    content.appendChild(node);
    content.appendChild(createLink(filterType));
    var element=document.getElementById("typebox");
    element.appendChild(content);
}

function createLink(filterType){
    var a = document.createElement('a');
    var linkText = document.createTextNode(' \u2716');
    a.appendChild(linkText);
    a.href = "#";
    a.id = filterType;
    return a;
}

function createResultBox(index){
    var box = createElement("div", "resultbox");
    box.dataset.id = index;
    return box;
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

function createSportTypeBox(sportType){
    var content = createElement("div", "sportsavailable");
    var node=document.createTextNode(sportType);
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

//Hide or show page navigation buttons when not needed
function pageNavButtons(currentPage, maxPage){
    var element=document.getElementById("currentpage");
    element.innerHTML = currentPage + " / " + maxPage;
    
    if(currentPage > maxPage){
        element.innerHTML = "";
    }
    else if(currentPage === 1 && currentPage === maxPage || currentPage > maxPage){
        document.getElementById("firstpage").firstElementChild.style.display = "none";
        document.getElementById("previouspage").firstElementChild.style.display = "none";
        document.getElementById("nextpage").firstElementChild.style.display = "none";
        document.getElementById("lastpage").firstElementChild.style.display = "none";
    }
    else if(currentPage === 1){
        document.getElementById("firstpage").firstElementChild.style.display = "none";
        document.getElementById("previouspage").firstElementChild.style.display = "none";
        document.getElementById("nextpage").firstElementChild.style.display = "block";
        document.getElementById("lastpage").firstElementChild.style.display = "block";
    }
    else if(currentPage === maxPage){
        document.getElementById("firstpage").firstElementChild.style.display = "block";
        document.getElementById("previouspage").firstElementChild.style.display = "block";
        document.getElementById("nextpage").firstElementChild.style.display = "none";
        document.getElementById("lastpage").firstElementChild.style.display = "none";
    } 
}

//Sorting the array of sports by distance
function sortSports(sports, lat, lng){
    var sortedList = [];
    for(var i in sports){
        //sortedList.push({dist: distance(sports[i].latitude, sports[i].longitude, lat, lng), sports: sports[i]});
        sports[i]["distance"] = distance(sports[i].latitude, sports[i].longitude, lat, lng);
        sortedList.push(sports[i]);
    }
    sortedList.sort(compare);
    return sortedList;
}

function compare(a,b) {
  if (a["distance"] < b["distance"])
     return -1;
  if (a["distance"] > b["distance"])
    return 1;
  return 0;
}