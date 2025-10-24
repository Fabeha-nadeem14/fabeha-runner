


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 500, width: 40, height: 40, color: "#0f0" };
let obstacles = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "#f00";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  });
}

function updateObstacles() {
  obstacles.forEach(ob => ob.y += 5);
  obstacles = obstacles.filter(ob => ob.y < canvas.height);
  if (Math.random() < 0.05) {
    obstacles.push({
      x: Math.random() * (canvas.width - 40),
      y: -40,
      width: 40,
      height: 40
    });
  }
}

function checkCollision() {
  for (let ob of obstacles) {
    if (
      player.x < ob.x + ob.width &&
      player.x + player.width > ob.x &&
      player.y < ob.y + ob.height &&
      player.y + player.height > ob.y
    ) {
      gameOver = true;
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "#fff";
    ctx.font = "30px monospace";
    ctx.fillText("Game Over", 120, 300);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  updateObstacles();
  checkCollision();
  drawScore();
  score++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 20;
});

gameLoop();