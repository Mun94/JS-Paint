const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor");
const range = document.getElementById("jsRange");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 첫 번째 설정 색
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(e){
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

 function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
}

function init(){
    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
    }
    if(colors){
        colors.forEach(color => {color.addEventListener("click", handleColorClick)})
    }
    if(range){
        range.addEventListener("input", handleRangeChange);
    }
}

init();