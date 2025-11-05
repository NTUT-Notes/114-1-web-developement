var currentIndex = 0;

const img_array = [
    "https://cdn.mos.cms.futurecdn.net/BwL2586BtvBPywasXXtzwA.jpeg",
    "https://i.ytimg.com/vi/DeFVn6-ZE40/maxresdefault.jpg",
    "https://media.istockphoto.com/id/1482199015/zh/%E7%85%A7%E7%89%87/happy-puppy-welsh-corgi-14-weeks-old-dog-winking-panting-and-sitting-isolated-on-white.jpg?s=612x612&w=0&k=20&c=FHhZACUGGsEz1j1KefbxDYGrqCFLSgFe1WjrK0lIUr4=",
    "https://www.science.org/do/10.1126/science.abi5787/full/main_puppies_1280p-1710959220337.jpg",
    "https://public.bnbstatic.com/image/pgc/202405/cd70ee2386d57efcd436d20d43790afa.jpg"
];

function changeWidth(size) {
    var table = document.getElementById("course_table");
    table.style.width = size;
}

function changeSpacing(size) {
    var table = document.getElementById("course_table");
    table.style.borderSpacing = size;
    table.style.border = "black " + size + "px solid";
}

function changeColor(color) {
    var table = document.getElementById("course_table");
    table.style.backgroundColor = color;
    table.style.border = "black " + 1 + "px solid";
}

function reset() {
    changeWidth(200);
    changeSpacing(2);
    changeColor("lightgreen");
}


function changePicture(change) {
    var newIndex = currentIndex + change;

    if (newIndex < 0) {
        newIndex = 4;
    }

    if (newIndex > 4) {
        newIndex = 0;
    }

    var viewport = document.getElementById("viewport");

    viewport.src = img_array[newIndex];

    var indicator = document.getElementById("viewport_indicator");
    indicator.innerText = `Image ${newIndex+1} of 5`;
    currentIndex = newIndex;
}