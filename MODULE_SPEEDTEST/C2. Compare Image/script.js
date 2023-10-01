const circle = document.getElementById('circle');
const line = document.getElementById('line');
const gray = document.getElementById('gray');
const width_image = 400;

let mousedown = false;
let width_percent = 50;
let mouse_position;

function change() {
    gray.style.width = width_percent + "%";
    circle.style.left = width_percent - 2.2 + "%";
    line.style.left = width_percent - 0.2 + "%"
}

circle.addEventListener("mousedown", ()=> {
    mousedown = true;
    console.log('tekan');
})

console.log(width_percent);

document.addEventListener("mousemove", (e)=> {
    if (mousedown) {
        mouse_position = e.clientX - 20;
        width_percent = (mouse_position / width_image) * 100;
        if (width_percent >= 100) {
            width_percent = 100;
        } else if (width_percent <= 0) {
            width_percent = 0;
        }
        change();
    }
})

document.addEventListener("mouseup", ()=> {
    mousedown = false;
    console.log('lepas');
})

change();