var controller;

class Image {
    constructor(title, src, overlaySrc, description, coords, href) {
        this.title = title;
        this.description = description;
        
        this.src = src;
        this.overlaySrc = overlaySrc;

        this.coords = coords;

        this.href = href;
    }

    addImageProcess() {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve(img.height)
            img.onerror = reject
            img.src = this.src
        })
    }

    async logImageHeight() {
        console.log('height', await this.addImageProcess())
    }
}

class Controller {

    constructor() {
        // Set maximum width for the controller
        this._setTitleWidth();

        this.index = 0;
    }

    imageArray = [
        new Image(
            "Elegant cat lying",
            "./../assets/elegant_cat.jpg",
            "./../assets/elegant_cat_overlay.png",
            "@猴硐貓村",
            "1303,2119,1566,2133,2025,2158,2645,2143,3065,2065,3278,1905,3303,1713,3186,1532,3093,1414,2979,1407,2438,1389,1940,1446,1823,1418,1663,1283,1638,1115,1577,1058,1524,1051,1431,1140,1406,1194,1360,1158,1221,1172,1125,1122,983,1037,951,1076,1008,1165,1040,1283,1011,1403,1015,1524,1058,1663,1122,1770,1193,1816,1267,1798,1289,1862,1182,1870,1004,1909,940,1909,819,1923,780,2019,855,2058,958,2058,1001,2097,1139,2115",
            "https://en.wikipedia.org/wiki/Cat"
        ),
        new Image(
            "Train is approaching",
            "./../assets/train.jpg",
            "./../assets/train_overlay.png",
            "@瑞芳車站",
            "1012,1664,1001,1754,1009,1816,1012,1981,1004,2104,1007,2243,1004,2392,1028,2401,1039,2515,1033,2611,1049,2641,1065,2673,1148,2713,1303,2740,1436,2753,1586,2665,1701,2603,1898,2489,2587,2117,2603,1810,2579,1776,2509,1754,2456,1736,2322,1693,2194,1650,1968,1573,1906,1546,1663,1453,1375,1471,1295,1575,1228,1583,1185,1565,1159,1567,1161,1594,1076,1623,1028,1648",
            "https://zh.wikipedia.org/zh-tw/%E5%8F%B0%E9%90%B5DR1000%E5%9E%8B%E6%9F%B4%E6%B2%B9%E5%AE%A2%E8%BB%8A"
        ),
        new Image(
            "Red lantern in street",
            "./../assets/lantern.jpg",
            "",
            "@瑞芳老街",
            "748,2177,740,2257,742,2316,716,2468,766,2458,809,2452,814,2367,895,2367,959,2377,1079,2361,1100,2356,1127,2415,1161,2466,1199,2479,1228,2503,1247,2543,1276,2578,1335,2580,1394,2583,1399,2644,1396,2701,1394,2765,1388,2831,1388,2965,1412,2978,1410,2901,1404,2823,1412,2749,1410,2682,1410,2570,1455,2564,1458,2639,1458,2674,1452,2730,1442,2949,1442,2989,1460,2992,1471,2952,1479,2898,1482,2842,1482,2786,1482,2714,1482,2671,1482,2556,1482,2506,1487,2484,1511,2463,1548,2468,1572,2444,1618,2399,1626,2431,1629,2591,1615,2687,1615,2786,1615,2826,1645,2842,1655,2813,1671,2658,1671,2570,1669,2484,1666,2399,1669,2364,1669,2332,1711,2308,1759,2279,1778,2244,1802,2209,1829,2156,1831,2097,1831,2004,1815,1964,1941,1926,1946,1977,1951,2068,1951,2113,1960,2188,1984,2252,2000,2281,2024,2265,2021,2231,2013,2142,2008,2078,2005,1953,1997,1878,2050,1825,2096,1734,2117,1694,2117,1653,2109,1551,2082,1463,2053,1385,1989,1340,1994,1217,2093,1209,2146,1180,2181,1076,2186,1030,2173,1004,2173,956,2269,942,2363,913,2456,859,2504,826,2560,757,2608,687,2632,618,2659,530,2677,468,2669,380,2667,335,2653,268,2643,215,2616,159,2592,110,2563,54,2523,9,1471,4,1436,41,1380,108,1351,188,1324,281,1308,391,1306,458,1306,535,1324,620,1348,695,1402,762,1434,807,1460,845,1519,882,1570,909,1621,925,1722,960,1789,978,1781,1026,1751,1096,1743,1168,1717,1171,1629,1168,1506,1179,1508,1237,1492,1253,1466,1261,1423,1283,1370,1299,1324,1344,1266,1419,1242,1496,1220,1563,1210,1667,1234,1755,1263,1814,1282,1835,1252,1856,1212,1896,1193,1947,1175,1998,1161,2046,1140,2067,1116,2102,1103,2129,1071,2118,1031,2134,1004,2158,996,2190,969,2185,935,2196,905,2209,871,2206,809,2209,817,2177,769,2161",
            "https://zh.wikipedia.org/wiki/%E7%81%AF%E7%AC%BC"
        ),
        new Image(
            "Sign under blue sky",
            "./../assets/stop_sign.jpg",
            "",
            "@台中市",
            "2135,4029,2133,3939,2133,3733,2130,3439,2018,3431,1983,3410,1981,3340,1981,3105,1981,2873,1981,2558,1975,2271,1994,2236,2015,2231,2034,2194,2093,2186,2106,2191,2111,2137,2063,2124,1994,2108,1930,2084,1871,2049,1794,1996,1743,1951,1700,1892,1647,1798,1612,1697,1596,1627,1596,1563,1599,1506,1612,1442,1650,1346,1684,1298,1698,1266,1759,1183,1812,1129,1866,1089,1922,1060,2002,1036,2061,1025,2143,1017,2215,1017,2306,1036,2384,1071,2434,1097,2482,1135,2538,1178,2584,1223,2626,1284,2666,1356,2698,1431,2712,1538,2717,1610,2698,1709,2666,1789,2640,1845,2602,1904,2546,1955,2496,1997,2480,2011,2453,2037,2405,2064,2341,2093,2296,2123,2218,2131,2218,2192,2309,2192,2339,2211,2355,2246,2360,2323,2379,3124,2389,3380,2373,3410,2352,3423,2314,3431,2234,3439,2242,3554,2248,4027",
            "https://zh.wikipedia.org/zh-tw/%E9%81%95%E8%A6%8F%E5%81%9C%E8%BB%8A"
        ),
        new Image(
            "Buildings in the city",
            "./../assets/buildings.jpg",
            "../assets/buildings-overlay.png",
            "@台中市",
            "1726,2368,756,2664,756,2803,900,2814,871,3616,1245,3664,2022,3717,2316,3752,2888,3680,2872,3359,2511,3308,2484,2352,2308,2288,2297,2239,2268,2242,2252,2175,2522,2076,2466,2036,2092,2138,2100,2191,2175,2183,2180,2458",
            "https://zh.wikipedia.org/wiki/%E5%A2%99"
        )
    ];

    
    _setTitleWidth() {
        var title = document.getElementById("indicator-info-title");
        var box = document.getElementById("indicator-info-warp");
        var max = 0;

        for (var i=0; i<this.imageArray.length; i++) {
            title.innerText = this.imageArray[i].title;
            
            if (box.clientWidth > max) {
                max = box.clientWidth;
            }
        }

        box.style.minWidth = max+5 + "px";
    }

    _setMapCoordinates() {
        var currentImage = this._getCurrentImage();

        if (currentImage.coords == null) {
            return;
        }

        var viewport = document.getElementById("viewer-image");
        const scaleWidth = viewport.width / viewport.naturalWidth;
        const scaleHeight = viewport.height / viewport.naturalHeight;

        console.log(viewport.naturalWidth);

        const coords = currentImage.coords.split(",");

        var buf = "";

        for (var i=0; i<coords.length; i++) {
            if (i != 0) {
                buf += ",";
            }

            var result = parseInt(coords[i]);
            if (i % 2 == 0) {
                result *= scaleHeight;
            } else {
                result *= scaleWidth;
            }

            buf += Math.round(result);
        }

        var area = document.getElementById("viewer-area");
        area.coords = buf;
        area.href = currentImage.href;


        console.log(buf)
    }

    _setLocationTextMargin() {
        var viewport = document.getElementById("viewer-image");
        var location = document.getElementById("viewer-location");
        location.style.marginBottom = viewport.clientHeight * 0.15 + "px";
    }

    _addOffsetToIndex(offset) { 
        this.index += offset;

        if (this.index < 0) {
            this.index = this.imageArray.length-1;
        }

        if (this.index > this.imageArray.length-1) {
            this.index = 0;
        }
    }

    _getCurrentImage() {
        return this.imageArray[this.index];
    }

    changePicture(offset) {
        this._addOffsetToIndex(offset);

        var currentImage = this._getCurrentImage();

        // Update image viewport
        var viewport = document.getElementById("viewer-image");
        viewport.src = currentImage.src;
        
        // Update index 
        var indicator = document.getElementById("indicator-info-index");
        indicator.innerText = `Image ${this.index+1} of ${this.imageArray.length}`;
        
        // Update title 
        var title = document.getElementById("indicator-info-title");
        title.innerText = currentImage.title;

        // Update description
        var description = document.getElementById("viewer-location");
        description.innerText = currentImage.description;

        // Update overlay
        var description = document.getElementById("viewer-overlay");
        description.src = currentImage.overlaySrc;

        this._setLocationTextMargin();
        this._setMapCoordinates();
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


window.onload = async () => {
    controller = new Controller();

    var image = document.getElementById("viewer-image");
    image.addEventListener("load", () => {
        controller._setMapCoordinates();
        controller._setLocationTextMargin();
    });

    controller.changePicture(0);
}

window.onresize = () => {
    controller._setMapCoordinates();
    controller._setLocationTextMargin();
}