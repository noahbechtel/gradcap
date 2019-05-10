let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = (document.body.clientHeight / 3);

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let lineY = 0;
let lines = [];
let maxLineWidth = 1;
let minLineWidth = 1;
let spacing = 70;
let verticalLines = Math.round(canvas.width / spacing / 2);
let speed = 0.4;
let accel = 0.0105;
let linesCount = 10;
let spacingY = Math.floor(canvas.height / linesCount) * 0.7;

for (let i = 0; i < linesCount; i++) {
  lines.push({
    y: i * -spacingY
  });
}

function update(dt) {
  let minY = lines[linesCount-1].y;
  
  for (let i = 0; i < lines.length; i++) {
    lines[i].y += speed + Math.max(0, lines[i].y * accel);
    
    if (lines[i].y < minY) {
      minY = lines[i].y;
    }
    
    if (lines[i].y > canvas.height) {
      lines[i].y = minY - spacingY;
      minY = lines[i].y
    }
  }
}

function draw(dt) {
  requestAnimationFrame(draw);
  update(dt);
  
  ctx.fillStyle = "#24241f";
  ctx.strokeStyle = "#dd5277";
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.shadowColor = '#dd5277';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 20;
  
  ctx.lineWidth = 3.0;  
  
  // middle line
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.stroke();
  
  for (let i = 1; i <= verticalLines; i++) {    
    ctx.beginPath();
    ctx.moveTo(centerX - (i * spacing), -1);
    ctx.bezierCurveTo(
      centerX - (i * spacing) * 1.5, 10,
      centerX - (i * spacing) * 2.5, canvas.height,
      centerX - (i * spacing) * 2.5, canvas.height,
    );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + (i * spacing), -1);
    ctx.bezierCurveTo(
      centerX + (i * spacing) * 1.5, 10,
      centerX + (i * spacing) * 2.5, canvas.height,
      centerX + (i * spacing) * 2.5, canvas.height,
    );
    ctx.stroke();
  }
  
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].y < 0 || lines[i].y > canvas.height) {
      continue;
    }
    
    ctx.beginPath();
    ctx.moveTo(0, lines[i].y);
    ctx.lineWidth = minLineWidth + (lines[i].y * (maxLineWidth - minLineWidth) / canvas.height)
    ctx.lineTo(canvas.width, lines[i].y);
    //ctx.bezierCurveTo(
      //centerX - centerX / 2, lines[i].y + 15, 
      //centerX + centerX / 2, lines[i].y + 15, 
      //canvas.width, lines[i].y);
    ctx.stroke();
  }
}

draw();