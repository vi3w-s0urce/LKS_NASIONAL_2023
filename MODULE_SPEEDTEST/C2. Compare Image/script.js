const gray_img = document.getElementById("gray");
const container = document.getElementById("container");
const circle = document.getElementById("circle");
const line = document.getElementById("line");
const img_width = 600;

let mousedown = false;
let mouse_x;
let width_percent = 50;


circle.addEventListener("mousedown", function (e) {
    mousedown = true;
    console.log("tekan");
})

document.addEventListener("mousemove", function (e) {
    if (mousedown) {
        mouse_x = e.clientX - 20;
        width_percent = (mouse_x / img_width) * 100;
        change();
    }
})


document.addEventListener("mouseup", function (e) {
    mousedown = false;
    console.log("lepas");
})

function change() {
    if (width_percent <= 0) {
        width_percent = 0;
    } else if (width_percent >= 100) {
        width_percent = 100;
    }
    circle.style.left = width_percent - 2.3 + "%";
    line.style.left = width_percent - 0.3 + "%";
    gray_img.style.width = width_percent + "%";
}

change();
