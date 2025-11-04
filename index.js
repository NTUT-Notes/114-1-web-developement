const greetings = [
        "哈囉",         // Mandarin Chinese
        "Hello",        // English
        "Hola",         // Spanish
        "Bonjour",      // French
        "Hallo",        // German
        "Ciao",         // Italian
        "Olá",          // Portuguese
        "Здравствуйте", // Russian
        "こんにちは",   // Japanese
        "안녕하세요",   // Korean
        "مرحبًا",      // Arabic
        "नमस्ते",        // Hindi
        "Sawasdee",     // Thai
        "Xin chào",     // Vietnamese
        "Jambo"         // Swahili
    ];

var greetingIndex = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Building {
    constructor(ctx, xPos, yPos, width, height, windowCount) {
        this.ctx = ctx;

        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;

        this.windowCount = windowCount;

        this.windowPosition = [];
    }

    generateWindowPosition() {
        const leftBound = this.xPos + 20;
        const rightBound = this.xPos + this.width - 20;

        const horitzionOffset = this.width / 3;
        const verticalOffset = Math.round(this.height / this.windowCount);

        var xPos = 0;
        var yPos = this.yPos + 30;
        for (var i=0; i<this.windowCount; i++) {
            if (i % 2 == 0) {
                xPos = leftBound + (horitzionOffset * Math.random());
            } else {
                xPos = rightBound - (horitzionOffset * Math.random()) - 10;
            }

            if (yPos + 6 > this.height + this.yPos) {
                break;
            }
            
            this.windowPosition.push( [xPos, yPos] );
            yPos += verticalOffset;
        }
    }

    draw() {
        this.ctx.fillStyle = "rgb(41, 45, 70)";
        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);

        if (this.windowPosition.length == 0) {
            this.generateWindowPosition();
        }

        for (var i=0; i<this.windowPosition.length; i++) {
            const [x, y] = this.windowPosition[i];
            this.ctx.fillStyle = "yellow";
            this.ctx.fillRect(x, y, 10, 6);
        }
    }
}

class CitySkyline {
    constructor(canvaId) {
        this.canva = document.getElementById(canvaId);
        this.ctx = this.canva.getContext("2d");

        this.starPosition = [];
        this.buildingPosition = [];

        this.refreshDimession();
        this.drawSkylineCity();

        this.amimate();
    }

    refreshDimession() {
        this.canvaHeight = this.canva.offsetHeight;
        this.canvaWidth = this.canva.offsetWidth;

        this.minSize = Math.min(this.canvaWidth, this.canvaHeight);
        this.maxSize = Math.max(this.canvaWidth, this.canvaHeight);

        this.canva.width  = this.canvaWidth;
        this.canva.height = this.canvaHeight;
    }

    drawMoon() {
        var moonSize = this.minSize/10;

        var moonPosX = this.canvaWidth - (this.minSize / 7);
        var moonPosY = (this.minSize / 7);

        var grd = this.ctx.createRadialGradient(
            moonPosX, moonPosY, moonSize,
            moonPosX+30, moonPosY-10, moonSize-10
        );
        grd.addColorStop(1, "rgb(137, 140, 132)");
        grd.addColorStop(0, "rgb(253, 255, 210)");
        this.ctx.fillStyle = grd;
        // this.ctx.fillStyle = "red";
        
        this.ctx.beginPath();
        this.ctx.arc(
            moonPosX,
            moonPosY,
            moonSize,
            0,
            2 * Math.PI
        );

        this.ctx.fill();
    }

    async drawStars() {
        var starCount = ( (this.canvaHeight / 3 * 2) * this.canvaWidth ) / 8000;

        while (this.starPosition.length < starCount) {
            var xOffsetLimit = this.canvaWidth;
            var yOffsetLimit = this.canvaHeight / 3 * 2;

            var randX = Math.random() * xOffsetLimit;
            var randY = Math.random() * yOffsetLimit;

            this.starPosition.push([randX, randY]);
        }

        for (var i=0; i<this.starPosition.length; i++) {
            const [x, y] = this.starPosition[i];
            const colors = ["grey", "white"];

            this.ctx.fillStyle = colors[Math.round( Math.random() )];
            this.ctx.fillRect(x, y, 3, 3);

            this.drawMoon(); // Prevent moon been override
            this.drawBuilding();

            await sleep(100);
        }   
    }

    generateBuildingPosition() {
        var buildingCount = this.canvaWidth / 100;
        var buildingWidth = this.canvaWidth / buildingCount;
        
        var lastXPos = 30;

        var floorHeight = this.canvaHeight / 10;

        while (this.buildingPosition.length < buildingCount) {
            const spacing = Math.random() * 25 + 25;
            const width = buildingWidth + 100 * (Math.random() - 0.2); 
            const height = width * 1.5 + 100 * Math.random();
            
            lastXPos += spacing;

            if (lastXPos + width > this.canvaWidth) {
                break;
            }

            var building = new Building(
                this.ctx, 
                lastXPos, this.canvaHeight - height - floorHeight,
                width, height,
                2 + Math.round( 5 * Math.random() )
            );

            lastXPos += width;

            this.buildingPosition.push(building);
        }

        if (this.canvaWidth - lastXPos > 50 || this.canvaWidth - lastXPos < 20) {
            this.buildingPosition = [];
            return generateBuildingPosition();
        }
    }

    async drawBuilding() {
        

        if (this.buildingPosition.length == 0) {
            this.generateBuildingPosition();
        }

        for (var i=0; i<this.buildingPosition.length; i++) {
            this.buildingPosition[i].draw();
        }
    }



    async amimate() {
        this.drawStars();
        
        await sleep(1000);
        this.amimate();
    }

    async drawSkylineCity() {
        // 2025-10-31 Task III : City Skyline

        var grd = this.ctx.createLinearGradient(0,0, 0, this.canvaHeight/4);
        grd.addColorStop(0,"rgb(22, 32, 103)");
        grd.addColorStop(1,"rgb(16, 19, 51)");

        // Gradient Sky
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0,0, this.canvaWidth, this.canvaHeight);

        // Stars
        await this.drawStars(this.ctx);
        
        // Floor
        this.ctx.fillStyle = "rgb(21, 24, 38)";

        var floorHeight = this.canvaHeight / 10;
        var floorOffset = this.canvaHeight * (1 - 0.1)
        this.ctx.fillRect(0, floorOffset, this.canvaWidth, floorOffset+floorHeight);
        
        // Building
        this.drawBuilding();
    }
}

async function clearTyping(element) {
    while (element.innerHTML.length != 0) {
        element.innerHTML = element.innerHTML.slice(0, -1);
        await sleep(100 + 100 * Math.random());
    }
}

async function setTyping(element, target) {
    while (element.innerHTML.length != target.length) {
        var word = target.at(element.innerHTML.length);
        element.innerHTML = `${element.innerHTML}${word}`
        await sleep(100 + 100 * Math.random());
    }
}

async function greeting() {
    var element = document.getElementById("welcome");
    await clearTyping(element);
    await setTyping(element, greetings[greetingIndex]);

    greetingIndex++;
    greetingIndex = (greetingIndex >= greetings.length) ? 0 : greetingIndex;

    await sleep(1000 + Math.random() * 1500);
    await greeting();
}

window.onload = async () => {
    var canvaName = "task3_canvas";

    var controller = new CitySkyline(canvaName);

    // var canva = document.getElementById(this.canvaId);
    // const resizeObserver = new ResizeObserver(entries => {
    //     // controller.drawSkylineCity(canvaName);
    // });

    // resizeObserver.observe(canva);

    await sleep(1000 + Math.random() * 1500);
    greeting();
}