//musicplayer
var music=document.getElementById("music");
var prevbtn=document.getElementById("prevbtn");
var playbtn=document.getElementById("playbtn");
var nextbtn=document.getElementById("nextbtn");
const audio=document.createElement("audio");
var song=1,play=true;
audio.src="../music/"+song+".mp3";
audio.volume=0.3;
audio.loop=true;
function PlayAudio(){
    audio.play();
    playbtn.style.backgroundImage="url('../music/pause.png')";
}
function PauseAudio(){
    audio.pause();
    playbtn.style.backgroundImage="url('../music/play.png')";
}
function NextAudio(){
    if(song==14)song=0;
    song++;
    audio.src="../music/"+song+".mp3";
}
function PrevAudio(){
    if(song==1)song = 8;
    song--;
    audio.src="../music/"+song+".mp3";
}
prevbtn.onclick = function(event){
    PrevAudio();
    PlayAudio();
}
nextbtn.onclick = function(event){
    NextAudio();
    PlayAudio();
}
playbtn.onclick = function(event){
    if(play)PlayAudio();
    else PauseAudio();
    play=!play;
}

var loading=document.getElementById("loading");
var start=document.getElementById("start");
var dice=document.getElementById("dice");
var howtoend=document.getElementById('howtoend');
var player1=document.getElementById("player1");
var player2=document.getElementById("player2");
var player1_choose=document.getElementById("player1-choose");
var player2_choose=document.getElementById("player2-choose");
var atkbtn=document.getElementById("atkbtn");
var stkbtn=document.getElementById("stkbtn");
var defbtn=document.getElementById("defbtn");
var recbtn=document.getElementById("recbtn");
var win=document.getElementById("win");
var lose=document.getElementById("lose");
var text=document.getElementById("text");
var screen=document.getElementById("screen");
var board=document.getElementById("board");
var ctx=board.getContext('2d');
const Choose=['','普通攻擊','防禦','回魔','法術攻擊'];
var choose=false,end=false;
atkbtn.onclick=function(){socket.emit('choose',1,user[0].Cnt,team); choose=true; btnDisplay("none");};
stkbtn.onclick=function(){socket.emit('choose',4,user[0].Cnt,team); choose=true; btnDisplay("none");};
defbtn.onclick=function(){socket.emit('choose',2,user[0].Cnt,team); choose=true; btnDisplay("none");};
recbtn.onclick=function(){socket.emit('choose',3,user[0].Cnt,team); choose=true; btnDisplay("none");};
player1.style.display="none";
player2.style.display="none";
player1_choose.style.display="none";
player2_choose.style.display="none";
function btnDisplay(d=""){
    atkbtn.style.display=d;
    stkbtn.style.display=d;
    defbtn.style.display=d;
    recbtn.style.display=d;
}
function Animate(str,n){
    let p1x=parseInt(player1_choose.style.left.replace('px',''));
    let p2x=parseInt(player2_choose.style.left.replace('px',''));
    if(p2x-p1x<50)Animate2(str,n);
    else{
        player1_choose.style.left=`${p1x+1}px`;
        player2_choose.style.left=`${p2x-1}px`;
        setTimeout(function(){Animate(str,n)},1);
    }
}
function Animate2(str,n){
    let p1x=parseInt(player1_choose.style.left.replace('px',''));
    let p2x=parseInt(player2_choose.style.left.replace('px',''));
    if(p2x-p1x<200){
        player1_choose.style.left=`${p1x-5}px`;
        player2_choose.style.left=`${p2x+5}px`;
        setTimeout(function(){Animate2(str,n)},2);
    }else{
        dice.style.display="";
        setTimeout(function(){Battle(str,n);},3000);
    }
}
function ScrollText() {
    let h = document.querySelector('#text');
    h.scrollTo(0, h.scrollHeight);
}
function Battle(str,n){
    dice.style.display="none";
    player1_choose.style.display="none";
    player2_choose.style.display="none";
    text.innerHTML+=`擲骰中. 擲骰中.. 擲骰中...<br>你的點數是${user[0].Dice}，對手的點數是${user[1].Dice}<br>`;
    if(n==0){
        end=true;
        localitem=localStorage.getItem('yesa-item').split(',');
        localitem[1]=parseInt(localitem[1])+100;
        localStorage.setItem('yesa-item',localitem);
        howtoend.innerHTML='Click the cross to exit.';
    }else if(n==user[0].Id){
        win.style.display="";
        end=true;
        str+='<br>You Win!';
        localitem=localStorage.getItem('yesa-item').split(',');
        localitem[1]=parseInt(localitem[1])+200;
        localStorage.setItem('yesa-item',localitem);
        howtoend.innerHTML='Click the cross to exit.';
    }else if(n==user[1].Id){
        lose.style.display="";
        end=true;
        str+='<br>You Lose!';
        howtoend.innerHTML='Click the cross to exit.';
    }else btnDisplay();
    text.innerHTML+=str;
    ScrollText();
    DrawHpPP();
}
function DrawHpPP(){
    var swid=screen.clientWidth;
    var shei=screen.clientHeight;
    board.setAttribute("height",`${shei}px`);
    board.setAttribute("width",`${swid}px`);
    ctx.clearRect(0, 0, swid, 40);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(swid/2.5,0);
    ctx.lineTo(swid/2.5,15);
    ctx.lineTo(0,15);
    ctx.stroke();
    ctx.moveTo(swid,0);
    ctx.lineTo(swid-swid/2.5,0);
    ctx.lineTo(swid-swid/2.5,15);
    ctx.lineTo(swid,15);
    ctx.stroke();
    ctx.moveTo(0,20);
    ctx.lineTo(swid/5,20);
    ctx.lineTo(swid/5,35);
    ctx.lineTo(0,35);
    ctx.stroke();
    ctx.moveTo(swid,20);
    ctx.lineTo(swid-swid/5,20);
    ctx.lineTo(swid-swid/5,35);
    ctx.lineTo(swid,35);
    ctx.stroke();
    ctx.closePath();

    const Hpwid=swid/2.5/300;
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(0,0);
    ctx.lineTo((user[0].Hp>300?300:user[0].Hp)*Hpwid,0);
    ctx.lineTo((user[0].Hp>300?300:user[0].Hp)*Hpwid,15);
    ctx.lineTo(0,15);
    ctx.fill();
    ctx.moveTo(swid,0);
    ctx.lineTo(swid-(user[1].Hp>300?300:user[1].Hp)*Hpwid,0);
    ctx.lineTo(swid-(user[1].Hp>300?300:user[1].Hp)*Hpwid,15);
    ctx.lineTo(swid,15);
    ctx.fill();
    ctx.closePath();
    const PPwid=swid/5/30;
    ctx.beginPath();
    ctx.fillStyle="#00DDDD";
    ctx.moveTo(0,20);
    ctx.lineTo((user[0].PP>30?30:user[0].PP)*PPwid,20);
    ctx.lineTo((user[0].PP>30?30:user[0].PP)*PPwid,35);
    ctx.lineTo(0,35);
    ctx.fill();
    ctx.moveTo(swid,20);
    ctx.lineTo(swid-(user[1].PP>30?30:user[1].PP)*PPwid,20);
    ctx.lineTo(swid-(user[1].PP>30?30:user[1].PP)*PPwid,35);
    ctx.lineTo(swid,35);
    ctx.fill();
    ctx.closePath();

    ctx.font="15px sans-serif";
    ctx.fillStyle="#00DDDD";
    ctx.fillText("Hp:"+user[0].Hp,0,12);
    ctx.fillText("Hp:"+user[1].Hp,swid-50,12);
    ctx.font="15px sans-serif";
    ctx.fillStyle="#FF0000";
    ctx.fillText("PP:"+user[0].PP,0,33);
    ctx.fillText("PP:"+user[1].PP,swid-50,33);
}
function RePlace(){
    DrawHpPP();
    var swid=screen.clientWidth;
    var shei=screen.clientHeight;
    music.style.top=(shei/7)+'px';
    music.style.left=(swid/2-50)+'px';
    player1.style.top=(shei-150)+'px';
    player1.style.left=(swid/5-50)+'px';
    player2.style.top=(shei-150)+'px';
    player2.style.left=(swid-70-swid/5)+'px';
}
function Reboot(){
    var charch=user[0].Character.split(',').concat(user[1].Character.split(','));
    player1.style.backgroundImage=`url('../img/character/${charch[0]}/${charch[1]}.png')`;
    player2.style.backgroundImage=`url('../img/character/${charch[2]}/${charch[3]}.png')`;
    text.innerHTML="";
    btnDisplay();
    win.style.display="none";
    lose.style.display="none";
    dice.style.display="none";
    player1_choose.style.display="none";
    player2_choose.style.display="none";
    DrawHpPP();
}
function Start(){
    Reboot();
    RePlace();
    player1.innerHTML=`<p>${user[0].Name}<p>`;
    player2.innerHTML=`<p>${user[1].Name}<p>`;
    loading.style.display='none';
    start.style.display="none";
    player1.style.display="";
    player2.style.display="";
    text.innerHTML=`你的對手是: ${user[1].Name}<br>使用的角色: ${user[1].Character.split(',')[0]} Lv: ${user[1].Lv}<br>`;
}
var myId,team,lchoose;
var user=[],lchar=[];
window.onresize=()=>{RePlace();};
window.addEventListener("DOMContentLoaded", () => {
    var name;
    socket.on("connectioned", function(){
        myId=socket.id;
        console.log(myId);
        name=localStorage.getItem('yesa-name');
        lchoose=localStorage.getItem('yesa-choose');
        lchar=localStorage.getItem(`yesa-${lchoose.split(',')[0]}`).split(',');
        socket.emit("set",name,lchoose,lchar[0],lchar[2],lchar[3],lchar[4],lchar[5]);
    });
    socket.on("newPlayer", function (players,battleId) {
        if(players[0].Id==myId||players[1].Id==myId){
            team=battleId;
            if(players[0].Id==myId){
                user[0]=players[0];
                user[1]=players[1];
            }
            if(players[1].Id==myId){
                user[0]=players[1];
                user[1]=players[0];
            }
            console.log(user);
            Start();
        }
    });
    socket.on("disconnected", function (battleId) {
        if(battleId[0]==myId||battleId[1]==myId){
            if(!end){
                choose=false,end=false;
                loading.style.display="";
                start.style.display="";
                player1.style.display="none";
                player2.style.display="none";
                player1_choose.style.display="none";
                player2_choose.style.display="none";
                alert("對手已離線，正在為您重新匹配");
                socket.emit("set",name,lchoose,lchar[0],lchar[2],lchar[3],lchar[4],lchar[5]);
            }
        }
    });
    socket.on("oneready", function (t) {
        if(t==team){
            if(choose)socket.emit("ready",user[0].Cnt,user[1].Cnt,t);
        }
    });
    socket.on("battle", function (p1,p2,str,n,t) {
        if(t==team){
            choose=false;
            if(p1.Id==myId){
                user[0]=p1;
                user[1]=p2;
            }else{
                user[1]=p1;
                user[0]=p2;
            }
            text.innerHTML+=`<hr>${user[0].Name} 選擇了${Choose[user[0].Choose]}<br>${user[1].Name} 選擇了${Choose[user[1].Choose]}<br>`;
            ScrollText();
            player1_choose.style.top=`${screen.clientHeight-150}px`;
            player1_choose.style.left=`${32}px`;
            player2_choose.style.top=`${screen.clientHeight-150}px`;
            player2_choose.style.left=`${screen.clientWidth-96}px`;
            if(user[0].Choose==1)player1_choose.style.backgroundImage="url('../img/others/atk.png')";
            if(user[0].Choose==2)player1_choose.style.backgroundImage="url('../img/others/def.png')";
            if(user[0].Choose==3)player1_choose.style.backgroundImage="url('../img/others/rec.png')";
            if(user[0].Choose==4)player1_choose.style.backgroundImage="url('../img/others/stk.png')";
            if(user[1].Choose==1)player2_choose.style.backgroundImage="url('../img/others/atk.png')";
            if(user[1].Choose==2)player2_choose.style.backgroundImage="url('../img/others/def.png')";
            if(user[1].Choose==3)player2_choose.style.backgroundImage="url('../img/others/rec.png')";
            if(user[1].Choose==4)player2_choose.style.backgroundImage="url('../img/others/stk.png')";
            player1_choose.style.display="";
            player2_choose.style.display="";
            Animate(str,n);
        }
    });
});