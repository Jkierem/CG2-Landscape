const sys = createLSystem();
let str;
const initial = "F"
function setup (){
    str = sys.multi(initial,5)
    createCanvas(500,500)
}

function draw(){
    background(50);
    resetMatrix();
    translate(width/2,height);
    stroke(250,100)
    drawRealTree(str,5,HALF_PI/4);
}