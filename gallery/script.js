var index = 0;
var maxWidth = 0;

class Image {
    constructor(title, src) {
        this.title = title;
        this.src = src;
    }
}

const imageArray = [
    new Image("Elegant cat lying", "./../assets/elegant_cat.png"),
    new Image("Train is approaching", "./../assets/train.png"),
    new Image("Red lantern in street", "./../assets/lantern.png"),
    new Image("Sign under blue sky", "./../assets/stop_sign.png"),
    new Image("Buildings in the city", "./../assets/buildings.png")
];

function findMaxLength() {
    var title = document.getElementById("viewport_title");
    var box = document.getElementById("information_box");
    var max = 0;

    for (var i=0; i<imageArray.length; i++) {
        title.innerText = imageArray[i].title;
        
        if (box.clientWidth > max) {
            max = box.clientWidth;
        }
    }

    return max;
}

function changePicture(offset) {
    index += offset;

    if (index < 0) {
        index = imageArray.length-1;
    }

    if (index > imageArray.length-1) {
        index = 0;
    }

    // Update image viewport
    var viewport = document.getElementById("viewport");
    viewport.src = imageArray[index].src;
    
    // Update index 
    var indicator = document.getElementById("viewport_indicator");
    indicator.innerText = `Image ${index+1} of ${imageArray.length}`;
    
    // Update title 
    var title = document.getElementById("viewport_title");
    title.innerText = imageArray[index].title;
}

window.onload = () => {
    // Set maximum width for the controller
    maxWidth = findMaxLength();
    var box = document.getElementById("information_box");
    box.style.minWidth = maxWidth+5 + "px";

    changePicture(0);
}