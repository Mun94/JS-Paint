const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; // 첫 번째 설정 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(e){
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

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText="fill";
    }
    else{
        filling = true;
        mode.innerText="paint";
    }
}

 function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
}

function handleCanvasClick(e){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function init(){
    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
    }
    if(colors){
        colors.forEach(color => {color.addEventListener("click", handleColorClick)})
    }
    if(range){
        range.addEventListener("input", handleRangeChange);
    }
    if(mode){
        mode.addEventListener("click", handleModeClick);
    }
}

init();