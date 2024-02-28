const board=document.getElementById('game-board');
const instruction=document.getElementById('instruction-text');
const logo=document.getElementById('logo');
const highscore=document.getElementById('highscore');
const score=document.getElementById('score');
 let snake=[{x:10,y:10}]; 
 let hscore=0;
 let f=food(); 
 let direction='right';
 let pt=false;
 let gameInterval;
 let speeddelay=200;
 let pre='yt';
 function food(){

  let r=Math.floor(Math.random()*20+1);
  let p=Math.floor(Math.random()*20+1);
 while(true){
  r=Math.floor(Math.random()*20+1);
   p=Math.floor(Math.random()*20+1);
   if(!ch(r,p)){
    break;
   }
 }
  const food=[{x:r,y:p}];
  return food;
 }
 function ch(r,p){
  snake.forEach((element) => {
     if(element.x===r && element.y===p) {
      return true;
     }
  });
  return false;
 }
//  console.log(f);
function draw(){  
  board.innerHTML=''; 
  drawsnake(); 
  drawfood(); 
}  
function drawsnake(){  
  if(pt){
  // console.log('jif');
   snake.forEach((segment)=>{
    const snakeElement=createElement('div','snake');
    // console.log(snakeElement);
    // if(segment===f) pt=true;
    setposition(snakeElement,segment);
    board.appendChild(snakeElement);
   }); }
}
 function drawfood(){
  if(pt){
  const snakeElement=createElement('div','food');
  // console.log(snakeElement);
  setposition(snakeElement,f[0]);
  board.appendChild(snakeElement);}
 }  
function createElement(tag,className){
  const element =document.createElement(tag);
  element.className=className;
  return element;
}
function setposition(tag,pos){
   tag.style.gridColumn=pos.x;
   tag.style.gridRow=pos.y;
}
//  draw();
function move(){
  // console.log(speeddelay);
  const head={...snake[0]};
  switch (direction){
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'top':
      head.y--;
      break;
    case 'bottom':
      head.y++;
      break;
  }
  snake.unshift(head);
  if(head.x===f[0].x && head.y===f[0].y){
   f=food();
   if(speeddelay>150) speeddelay-=5;
   clearInterval(gameInterval);
   gameInterval=setInterval(()=>{
    move();
    scored();
    // updateHighscore();
    collision();
    draw();
   },speeddelay);
  }else{
  snake.pop();} 
}

 function press(event){
if(((!pt) && event.code === 'Space') || ((!pt) && event.key===' ')){
  startgame();
}
else{ 
  // console.log(event.key===pre);
  if(f()){
  switch(event.key){
    case 'ArrowUp':
      direction='top';
      break;
    case 'ArrowDown':
      direction='bottom';
      break;
    case 'ArrowLeft':
      direction='left';
      break;
    case 'ArrowRight':
      direction='right';
      break;
  } pre=event.key;
}
  
  //  console.log(pre);
}   
function f(){
  const t=event.key;
  if(t=='ArrowUp'){
    return pre!=='ArrowDown';
  }
  if(t=='ArrowRight'){
    return pre!=='ArrowLeft';
  }
  if(t=='ArrowDown'){
    return pre!=='ArrowUp';
  }
  if(t=='ArrowLeft'){
    return pre!=='ArrowRight';
  }
  return true;
}
 }
 function startgame(){
  pt=true;
  // clearInterval(gameInterval);
  instruction.style.display='none';
  logo.style.display='none';
  gameInterval=setInterval(()=>{
    move();  
    scored();
    // updateHighscore();
    collision();
    draw();
  },speeddelay);
 }
 
document.addEventListener('keydown',press);
function collision(){
  
  const h=snake[0];
   if(h.x<1 || h.y<1 || h.x>20 || h.y>20){
    // console.log('border' +" "+h.x +" "+h.y);
    resetgame();
   }
    for(let p=1;p<snake.length;p++){
      if(h.x===snake[p].x && h.y===snake[p].y){
        // console.log('snake');
        resetgame();
      }
    }
   }  
   function resetgame(){
    // console.log('hty');
    updatescore();
    clearInterval(gameInterval);
    pt=false;
    snake=[{x:10,y:10}];
    f=food();
     direction='right';
    speeddelay=200;
    instruction.style.display='block';
    logo.style.display='block'; 
   }
   function  scored(){
    const s=snake.length-1;
     score.textContent=s.toString().padStart(3,'0');
  } 
  function updatescore(){
    const s=snake.length-1;
    if(hscore<snake.length-1) {
      hscore=s;
      highscore.textContent=s.toString().padStart(3,'0');
  }
    highscore.style.display='block';
    score.textContent='000';
   }
 