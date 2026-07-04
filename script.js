const player = document.getElementById('player');
const ball = document.getElementById('ball');
const info = document.getElementById('info');
let px = 162, py = 420; // initial pos in px within 360x540
let bx = 171, by = 378;

function setPositions(){
  player.style.left = px + 'px';
  player.style.top = py + 'px';
  ball.style.left = bx + 'px';
  ball.style.top = by + 'px';
}

setPositions();

function move(dx,dy){
  px = Math.max(18, Math.min(342, px + dx));
  py = Math.max(18, Math.min(522, py + dy));
  // if close to ball, move ball slightly (dribble)
  const dist = Math.hypot((px-bx),(py-by));
  if(dist < 36){
    bx = Math.max(9, Math.min(351, bx + dx));
    by = Math.max(9, Math.min(531, by + dy));
  }
  setPositions();
}

function kick(){
  // simple kick: ball moves forward quickly toward top of field
  info.textContent = 'Kick!';
  const targetY = 20;
  const steps = 30;
  let i = 0;
  const vx = (bx - px) * 0.02; // slight curve based on relative position
  const vy = (targetY - by) / steps;
  const id = setInterval(()=>{
    bx += vx;
    by += vy;
    setPositions();
    i++;
    if(i>=steps){ clearInterval(id); info.textContent='Ready'; }
  }, 16);
}

document.addEventListener('keydown', (e)=>{
  const key = e.key;
  if(key === 'ArrowLeft') move(-12,0);
  if(key === 'ArrowRight') move(12,0);
  if(key === 'ArrowUp') move(0,-12);
  if(key === 'ArrowDown') move(0,12);
  if(key === ' ') kick();
});
document.getElementById('left').onclick = ()=>move(-12,0);
document.getElementById('right').onclick = ()=>move(12,0);
document.getElementById('up').onclick = ()=>move(0,-12);
document.getElementById('down').onclick = ()=>move(0,12);
document.getElementById('kick').onclick = kick;
