const box = document.getElementById('box');
const text = document.getElementById('text');
let mousedown = false;
let position_x;
let position_y;

function change() {
    box.style.left = position_x  + "px";
    box.style.top = position_y + "px";
    text.style.left = -position_x + "px";
    text.style.top = -position_y + "px";
}

box.addEventListener("mousedown", function (e) {
    mousedown = true;
});

document.addEventListener("mousemove", function (e) {
   if (mousedown) {
        position_x = e.clientX - 200;
        position_y = e.clientY - 200;
        change();
        console.log(position_x);
        console.log(position_y);
   } 
})

document.addEventListener("mouseup", function (e) {
    mousedown = false;
});

change();
