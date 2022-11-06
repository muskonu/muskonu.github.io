var moving=[];
var flag=0;
var timing;
var time;
var startpiece;
var maxtime=0;
var number=0;
var repeat;

function mouseOver(){
    document.getElementById("Start").style.color='red';
}
function mouseOut(){
    document.getElementById("Start").style.color='white';
}
function startClick(){
    document.getElementById("StartFrame").style.display='none';
    document.getElementById("enterGameFrame").style.display='block';
    document.getElementById("container").style.backgroundImage="url('bg1.png')";
    Initp();
}
function Initp() {
    for (let i = -1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            document.getElementById("piece" + i + j).style.top = numbery(i) + "px";
            document.getElementById("piece" + i + j).style.left = numberx(j) + "px";
        }
    }
    for(let i=-1;i<4;i++){
        let x=Math.floor(Math.random()*4);
        document.getElementById("piece"+i+x).style.backgroundColor="black";
        document.getElementById("piece"+i+x).style.borderColor="white";
        if(i===3){
            startpiece=document.getElementById("piece"+i+x);
            startpiece.innerHTML="按空格开始游戏";
        }
    }
}
function numberx(x){
    return x*120;
}
function numbery(x){
    return x*175;
}



document.onkeyup=function onkeyup() {
    var ev = ev || event;
    if (ev.keyCode === 32&&document.getElementById("StartFrame").style.display==="none") {
        if(flag===0) {
            gamestart();
            repeat=setInterval(gamestart,1000);
        }
        if(flag===0){
            time=0;
            timing=setInterval(function (){document.getElementById("time").innerHTML=time.toFixed(3)+"秒"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"你的最高纪录为:"+maxtime.toFixed(3)+"秒";time=time+0.004;}, 1);
        }
        startpiece.innerHTML="";
        flag++;
    }
};


function gamestart(){
    let elem = document.getElementsByClassName("pieces");
    moving[flag]=setInterval(move, 20);
    function move() {
        judgeover();
        for (let i = 0; i < 20; i++) {
            let pos = parseInt(elem[i].style.top);
            if (pos===701) {
                elem[i].style.top = "-174px";
            }
        }

        update();

        for (let i = 0; i < 20; i++) {
            let pos = parseInt(elem[i].style.top);
            pos++;
            elem[i].style.top = pos + "px";
        }
    }
    number++;
    if(number>14)
        clearInterval(repeat);
}


function Gameover(){
    for (let i = 1; i < 100; i++) {
        clearInterval(i);
    }
    clearInterval(timing);
    setTimeout(function (){document.getElementById("over").style.display="block";document.getElementById("enterGameFrame").style.display='none';},1000);
    document.getElementById("timer").innerHTML="你的成绩为:"+time.toFixed(3)+"秒";
    flag=1;
    if(time>maxtime)
        maxtime=time;
    number=0;
}

function qClick(id){
    if(flag!==0) {
        if (id.style.backgroundColor === "black")
            id.style.backgroundColor = 'grey';
        else {
            id.style.backgroundColor = 'red';
            Gameover();
        }
    }
}

function update(){
    for (let i = -1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var pos = parseInt(document.getElementById("piece" + i + j).style.top);
            if (pos===-174) {
                document.getElementById("piece"+i+j).style.backgroundColor="white";
                document.getElementById("piece"+i+j).style.borderColor="black";
            }
        }
        if(pos===-174){
            let z=Math.floor(Math.random()*4);
            document.getElementById("piece"+i+z).style.backgroundColor="black";
            document.getElementById("piece"+i+z).style.borderColor="white";
        }
    }
}

function judgeover(){
    for (let i = -1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var tep=document.getElementById("piece" + i + j);
            var pos = parseInt(tep.style.top);
            if(tep.style.backgroundColor==="black"&&pos>700)
                Gameover();
        }
    }
}

function reStart(){
    for (let i = -1; i < 4; i++)
        for (let j = 0; j < 4; j++) {
                document.getElementById("piece"+i+j).style.backgroundColor="white";
                document.getElementById("piece"+i+j).style.borderColor="black";
            }
    Initp();
    document.getElementById("over").style.display="none";
    document.getElementById("enterGameFrame").style.display='block';
    flag=0;
}
