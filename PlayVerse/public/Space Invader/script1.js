window.onload = function(){
  var c = document.querySelector("canvas");
  var canvas = document.querySelector("canvas");
  c.width = innerWidth;
  c.height = innerHeight;
  c = c.getContext("2d");

  function startGame(){
  mouse = {
    x: innerWidth/2,
    y: innerHeight-33
  };
    
  touch = {
    x: innerWidth/2,
    y: innerHeight-33
  };
    
  canvas.addEventListener("mousemove", function(event){
  mouse.x = event.clientX;
  });
  canvas.addEventListener("touchmove", function(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var touch = event.changedTouches[0];
    var touchX = parseInt(touch.clientX);
    var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
    event.preventDefault();
    mouse.x = touchX;
    mouse.y = touchY;
  });
  var player_width = 32;
  var player_height = 32;
  var playerImg = new Image();
  var score = 0;
  var health = 100;
  playerImg.src = "https://image.ibb.co/dfbD1U/heroShip.png";
  
  var _bullets = []; 
  var bullet_width = 6;
  var bullet_height = 8;
  var bullet_speed = 10;

  var _enemies = []; 
  var enemyImg = new Image();
  enemyImg.src = "https://i.ibb.co/0YgHvmx/enemy-fotor-20230927153748.png"
  var enemy_width = 32;
  var enemy_height = 32;

  var _healthkits = []; 
  var healthkitImg = new Image();
  healthkitImg.src = "https://image.ibb.co/gFvSEU/first_aid_kit.png";
  var healthkit_width = 32;
  var healthkit_height = 32;
  
  function Player(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    this.draw = function(){
      c.beginPath();
      c.drawImage(playerImg, mouse.x-player_width, mouse.y-player_height); 
    };
    
    this.update = function(){
      this.draw();
    };
  }
  
  function Bullet(x, y, width, height, speed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    
    this.draw = function(){
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = "white";
      c.fill();
    };
    
    this.update = function(){
      this.y -= this.speed;
      this.draw();
    };
  }
  
  function Enemy(x, y, width, height, speed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    
    this.draw = function(){
      c.beginPath();
      c.drawImage(enemyImg, this.x, this.y);
    };
    
    this.update = function(){
      this.y += this.speed;
      this.draw();
    };
  }
  
  function Healthkit(x, y, width, height, speed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    
    this.draw = function(){
      c.beginPath();
      c.drawImage(healthkitImg, this.x, this.y);
    };
    
    this.update = function(){
      this.y += this.speed;
      this.draw();
    };
  }
    
  var __player = new Player(mouse.x, mouse.y, player_width, player_height);
  
  function drawEnemies(){
    for (var _ = 0; _<4; _++){ 
      var x = Math.random()*(innerWidth-enemy_width);
      var y = -enemy_height; 
      var width = enemy_width;
      var height = enemy_height;
      var speed = Math.random()*2;
      var __enemy = new Enemy(x, y, width, height, speed);
      _enemies.push(__enemy);
    }
  }setInterval(drawEnemies, 1234);
    
  function drawHealthkits(){
    for (var _ = 0; _<1; _++){   
      var x = Math.random()*(innerWidth-enemy_width);
      var y = -enemy_height; 
      var width = healthkit_width;
      var height = healthkit_height;
      var speed = Math.random()*2.6;
      var __healthkit = new Healthkit(x, y, width, height, speed);
      _healthkits.push(__healthkit); 
    }
  }setInterval(drawHealthkits, 15000);

  function fire(){ 
    for (var _ = 0; _<1; _++){
      var x = mouse.x-bullet_width/2;
      var y = mouse.y-player_height;
      var __bullet = new Bullet(x, y, bullet_width, bullet_height, bullet_speed);
      _bullets.push(__bullet);
    }
  }setInterval(fire, 200);
    
  canvas.addEventListener("click", function(){
  });
    
  function collision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }
  c.font = "1em Arial";
  
  function stoperror() {
    return true;
  }  
  window.onerror = stoperror;

  function animate(){
    requestAnimationFrame(animate); 
    c.beginPath(); 
    c.clearRect(0,0,innerWidth,innerHeight); 
    c.fillStyle = 'white';
    c.fillText("Health: " + health, 5, 20); 
    c.fillText("Score: " + score, innerWidth-100, 20); 
    
    __player.update();

    for (var i=0; i < _bullets.length; i++){
      _bullets[i].update();
      if (_bullets[i].y < 0){
        _bullets.splice(i, 1);
      }
    }

    for (var k=0; k < _enemies.length; k++){
      _enemies[k].update();
      if(_enemies[k].y > innerHeight){
        _enemies.splice(k, 1);
        health -= 10;
      if(health == 0){
        alert("You DIED!\nYour score was "+score);
        startGame();
       }
      }
    }
  
    for(var j = _enemies.length-1; j >= 0; j--){
      for(var l = _bullets.length-1; l >= 0; l--){
        if(collision(_enemies[j], _bullets[l])){
          _enemies.splice(j, 1);
          _bullets.splice(l, 1);
          score++;
        }
      }
    }
    
    for(var h=0; h < _healthkits.length; h++){
      _healthkits[h].update();
    }
    for(var hh = _healthkits.length-1; hh >= 0; hh--){
      for(var hhh = _bullets.length-1; hhh >= 0; hhh--){
        if(collision(_healthkits[hh], _bullets[hhh])){
          _healthkits.splice(hh, 1);
          _bullets.splice(hhh, 1);
          health += 10;
        }
      }
    } 
    
  }
  animate();
  }startGame();
  }; 
  const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

// ---------------- IMAGES ----------------
const shipImg = new Image();
shipImg.src = "spaceship.png"; // ✅ Uses spaceship.png

const invImg = new Image();
invImg.src = "invader.png"; // ✅ Uses invader.png

// ---------------- GAME STATE ----------------
const player = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 150,
    w: 60,
    h: 60,
    vx: 0,
    vy: 0,
    accel: 1.3,
    friction: 0.88,
    maxSpeed: 11,
    hasShield: false,
    shieldTimer: 0,
    shieldAlpha: 0,
    shieldIntensity: 0,
    shieldParticles: []
};

let lives = 3;
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let gameActive = true;
let currentWave = 1;
let gameTime = 0;
let hasBombPowerup = false;
let hasShieldPowerup = false;
let bombExplosion = null;

// Arrays
const bullets = [];
const enemies = [];
const enemyBullets = [];
const powerups = [];

// ---------------- BASE VALUES ----------------
let baseWaveSize = 6;
let baseWaveSpeed = 1.4;
let baseShootChance = 0.03;
let waveInterval = 3500;

// ---------------- SHOOTING ----------------
function shoot() {
    if (!gameActive) return;
    bullets.push({
        x: player.x + player.w / 2 - 3,
        y: player.y,
        w: 6,
        h: 12,
        speed: 16
    });
}

setInterval(shoot, 120);

// ---------------- SPAWN WAVES ----------------
function spawnWave() {
    if (!gameActive) return;
    const spacing = Math.max(70, 90 - currentWave * 2);
    let startX = (canvas.width - spacing * getWaveSize()) / 2;

    for (let i = 0; i < getWaveSize(); i++) {
        enemies.push({
            x: startX + i * spacing,
            y: -100 - Math.random() * 70,
            w: 60,
            h: 60,
            speed: getWaveSpeed(),
            shooter: Math.random() < getShootChance()
        });
    }
    currentWave++;
    updateWaveDisplay();
}

setInterval(spawnWave, waveInterval);

// ✅ EQUAL SPAWN RATES - 50/50 Bomb vs Shield
function spawnPowerup() {
    if (!gameActive || Math.random() > 0.4) return;
    
    // PERFECT 50/50 - Same spawn rate for bomb AND shield
    const types = ['bomb', 'shield'];
    const type = types[Math.floor(Math.random() * 2)]; // Exactly 50% each
    
    powerups.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        w: 40,
        h: 40,
        type: type,
        speed: 2.5 + Math.random() * 2.5,
        rotation: 0
    });
}

setInterval(spawnPowerup, 6000); // Same interval = same spawn frequency

// ---------------- ENEMY SHOOTING ----------------
setInterval(() => {
    if (!gameActive) return;
    enemies.forEach(e => {
        if (e.shooter && Math.random() < getShootChance() * 1.5) {
            enemyBullets.push({
                x: e.x + e.w / 2,
                y: e.y + e.h,
                w: 6,
                h: 14,
                speed: 6 + currentWave * 0.3
            });
        }
    });
}, 250);

// ---------------- ULTIMATE SHIELD SYSTEM ----------------
function updateShield() {
    if (player.hasShield && player.shieldTimer > 0) {
        player.shieldTimer -= 16;
        player.shieldAlpha = Math.sin(Date.now() * 0.01) * 0.2 + 0.6;
        player.shieldIntensity = Math.max(0, player.shieldIntensity - 0.02);
        
        if (Math.random() < 0.3) {
            player.shieldParticles.push({
                angle: Math.random() * Math.PI * 2,
                dist: player.w/2 + 8,
                life: 1.0,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4
            });
        }
    } else {
        player.hasShield = false;
        player.shieldAlpha *= 0.92;
        player.shieldIntensity *= 0.95;
    }
    
    player.shieldParticles = player.shieldParticles.filter(p => {
        p.life -= 0.03;
        p.dist += 1.5;
        p.vx *= 0.98;
        p.vy *= 0.98;
        return p.life > 0;
    });
}

function drawUltimateShield() {
    if (player.shieldAlpha > 0.05 || player.shieldIntensity > 0.1) {
        const centerX = player.x + player.w/2;
        const centerY = player.y + player.h/2;
        const baseRadius = player.w/2 + 10;
        
        // 3 animated energy rings
        for (let ring = 0; ring < 3; ring++) {
            const radius = baseRadius + ring * 8 + Math.sin(Date.now() * 0.008 + ring) * 6;
            const alpha = (player.shieldAlpha * 0.7 - ring * 0.2) * (1 + player.shieldIntensity);
            
            const outerGrd = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.4);
            outerGrd.addColorStop(0, `rgba(0,243,255,${alpha})`);
            outerGrd.addColorStop(0.4, `rgba(155,92,255,${alpha * 0.6})`);
            outerGrd.addColorStop(1, `rgba(0,100,200,0)`);
            
            ctx.strokeStyle = outerGrd;
            ctx.lineWidth = 4 + ring * 2;
            ctx.shadowColor = `rgba(0,243,255,${alpha})`;
            ctx.shadowBlur = 25 + ring * 10;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        
        // Shield hit flash
        if (player.shieldIntensity > 0.1) {
            const flashGrd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, player.w * 2);
            flashGrd.addColorStop(0, `rgba(255,255,255,${player.shieldIntensity * 0.6})`);
            flashGrd.addColorStop(0.3, `rgba(0,243,255,${player.shieldIntensity * 0.3})`);
            flashGrd.addColorStop(1, 'rgba(0,0,0,0)');
            
            ctx.fillStyle = flashGrd;
            ctx.beginPath();
            ctx.arc(centerX, centerY, player.w * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Animated particles
        player.shieldParticles.forEach(p => {
            const px = centerX + Math.cos(p.angle) * p.dist + p.vx;
            const py = centerY + Math.sin(p.angle) * p.dist + p.vy;
            
            const particleGrd = ctx.createRadialGradient(px, py, 0, px, py, 4);
            particleGrd.addColorStop(0, `rgba(0,243,255,${p.life})`);
            particleGrd.addColorStop(1, `rgba(0,243,255,0)`);
            
            ctx.fillStyle = particleGrd;
            ctx.shadowColor = 'rgba(0,243,255,0.8)';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(px, py, 4 * p.life, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.shadowBlur = 0;
    }
}

// ---------------- BOMB ----------------
function triggerBomb() {
    if (!hasBombPowerup) return;
    
    bombExplosion = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        alpha: 1
    };

    enemies.length = 0;
    enemyBullets.length = 0;
    score += 50 * currentWave;
    updateScoreDisplay();
    hasBombPowerup = false;
    updatePowerupUI();
}

function drawFireExplosion() {
    if (!bombExplosion) return;
    let e = bombExplosion;

    const grd = ctx.createRadialGradient(e.x, e.y, e.radius * 0.2, e.x, e.y, e.radius);
    grd.addColorStop(0, `rgba(255,200,0,${e.alpha})`);
    grd.addColorStop(0.4, `rgba(255,80,0,${e.alpha})`);
    grd.addColorStop(1, `rgba(70,0,0,0)`);

    ctx.fillStyle = grd;
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur = 50;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    e.radius += 45; 
    e.alpha -= 0.03;
    if (e.alpha <= 0) bombExplosion = null;
}

// ---------------- MOVEMENT ----------------
const keys = {};
window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
    
    if (!gameActive) {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            restart();
        }
        return;
    }
    
    if (e.key.toLowerCase() === "b") triggerBomb();
    if (e.key.toLowerCase() === "s") activateShield();
});

window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function smoothMovement() {
    if (keys["arrowleft"] || keys["a"]) player.vx -= player.accel;
    if (keys["arrowright"] || keys["d"]) player.vx += player.accel;
    if (keys["arrowup"] || keys["w"]) player.vy -= player.accel;
    if (keys["arrowdown"] || keys["s"]) player.vy += player.accel;

    player.vx *= player.friction;
    player.vy *= player.friction;

    player.vx = Math.max(-player.maxSpeed, Math.min(player.maxSpeed, player.vx));
    player.vy = Math.max(-player.maxSpeed, Math.min(player.maxSpeed, player.vy));

    player.x += player.vx;
    player.y += player.vy;

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.w) player.x = canvas.width - player.w;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height - player.h) player.y = canvas.height - player.h;
}

// ---------------- POWERUPS ----------------
function activateShield() {
    if (!hasShieldPowerup) return;
    player.hasShield = true;
    player.shieldTimer = 10000; // 10 seconds
    hasShieldPowerup = false;
    updatePowerupUI();
}

function updatePowerupUI() {
    document.getElementById("pShield").classList.toggle("active", hasShieldPowerup);
    document.getElementById("pBomb").classList.toggle("active", hasBombPowerup);
}

// ---------------- DIFFICULTY ----------------
function getWaveSize() {
    return Math.min(15, baseWaveSize + Math.floor(gameTime / 60000));
}

function getWaveSpeed() {
    return baseWaveSpeed + (gameTime / 60000) * 0.5;
}

function getShootChance() {
    return Math.min(0.6, baseShootChance + (gameTime / 60000) * 0.08);
}

function updateWaveDisplay() {
    document.getElementById("waveDisplay").textContent = currentWave;
}

// ---------------- COLLISIONS ----------------
function collide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function checkCollisions() {
    // Player bullets vs enemies
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
        const b = bullets[bi];
        for (let ei = enemies.length - 1; ei >= 0; ei--) {
            const e = enemies[ei];
            if (collide(b, e)) {
                bullets.splice(bi, 1);
                enemies.splice(ei, 1);
                score += 10 * currentWave;
                updateScoreDisplay();
                break;
            }
        }
    }

    // Powerups vs player
    for (let pi = powerups.length - 1; pi >= 0; pi--) {
        if (collide(player, powerups[pi])) {
            const p = powerups.splice(pi, 1)[0];
            if (p.type === 'bomb') {
                hasBombPowerup = true;
                document.getElementById("pBomb").classList.add("active", "bomb");
            } else if (p.type === 'shield') {
                hasShieldPowerup = true;
                document.getElementById("pShield").classList.add("active", "shield");
            }
        }
    }

    // Enemy bullets vs player
    for (let bi = enemyBullets.length - 1; bi >= 0; bi--) {
        if (collide(enemyBullets[bi], player)) {
            enemyBullets.splice(bi, 1);
            if (player.hasShield) {
                player.hasShield = false;
                player.shieldIntensity = 1.5; // Shield hit flash!
            } else {
                loseLife();
            }
            break;
        }
    }

    // Enemies vs player
    for (let ei = enemies.length - 1; ei >= 0; ei--) {
        if (collide(enemies[ei], player)) {
            enemies.splice(ei, 1);
            if (player.hasShield) {
                player.hasShield = false;
                player.shieldIntensity = 1.5;
            } else {
                loseLife();
            }
            break;
        }
    }
}

function loseLife() {
    lives--;
    updateLivesDisplay();
    if (lives <= 0) gameOver();
}

// ---------------- RENDERING ----------------
function drawPlayer() {
    ctx.save();
    
    // Use spaceship.png if loaded, otherwise fallback
    if (shipImg.complete && shipImg.naturalHeight !== 0) {
        ctx.shadowColor = player.hasShield ? 'cyan' : '#00ff88';
        ctx.shadowBlur = player.hasShield ? 25 : 15;
        ctx.drawImage(shipImg, player.x, player.y, player.w, player.h);
    } else {
        // Fallback ship drawing
        ctx.shadowColor = player.hasShield ? 'cyan' : '#00ff88';
        ctx.shadowBlur = player.hasShield ? 25 : 15;
        ctx.fillStyle = player.hasShield ? '#44ffcc' : '#00ff88';
        ctx.beginPath();
        ctx.moveTo(player.x + player.w/2, player.y);
        ctx.lineTo(player.x, player.y + player.h);
        ctx.lineTo(player.x + player.w/2 - 10, player.y + player.h - 20);
        ctx.lineTo(player.x + player.w/2 + 10, player.y + player.h - 20);
        ctx.lineTo(player.x + player.w, player.y + player.h);
        ctx.closePath();
        ctx.fill();
    }
    
    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawEnemies() {
    enemies.forEach(e => {
        ctx.save();
        
        // Use invader.png if loaded, otherwise fallback
        if (invImg.complete && invImg.naturalHeight !== 0) {
            ctx.shadowColor = '#ff6666';
            ctx.shadowBlur = 12;
            ctx.drawImage(invImg, e.x, e.y, e.w, e.h);
        } else {
            // Fallback enemy drawing
            ctx.shadowColor = '#ff6666';
            ctx.shadowBlur = 12;
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.moveTo(e.x + e.w/2, e.y);
            ctx.lineTo(e.x + e.w, e.y + e.h);
            ctx.lineTo(e.x + e.w/2 + 10, e.y + e.h - 15);
            ctx.lineTo(e.x + e.w/2 - 10, e.y + e.h - 15);
            ctx.lineTo(e.x, e.y + e.h);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.shadowBlur = 0;
        ctx.restore();
    });
}

function drawBullets() {
    ctx.fillStyle = "#ffff00";
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = 10;
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
    ctx.shadowBlur = 0;
}

function drawEnemyBullets() {
    ctx.fillStyle = "#ff4444";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 8;
    enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
    ctx.shadowBlur = 0;
}

function drawPowerups() {
    powerups.forEach(p => {
        ctx.save();
        ctx.translate(p.x + p.w/2, p.y + p.h/2);
        ctx.rotate(p.rotation);
        ctx.shadowColor = p.type === 'bomb' ? '#ff6666' : '#66ffaa';
        ctx.shadowBlur = 20;
        ctx.fillStyle = p.type === 'bomb' ? '#ff4444' : '#44ff88';
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = 'white';
        ctx.font = '28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.type === 'bomb' ? '💣' : '🛡️', 0, 0);
        ctx.restore();
        p.rotation += 0.1;
    });
}

// ---------------- UPDATES ----------------
function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < -30) bullets.splice(i, 1);
    }
}

function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemies[i].speed;
        if (enemies[i].y > canvas.height + 40) enemies.splice(i, 1);
    }
}

function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        enemyBullets[i].y += enemyBullets[i].speed;
        if (enemyBullets[i].y > canvas.height + 30) enemyBullets.splice(i, 1);
    }
}

function updatePowerups() {
    for (let i = powerups.length - 1; i >= 0; i--) {
        powerups[i].y += powerups[i].speed;
        powerups[i].rotation += 0.1;
        if (powerups[i].y > canvas.height + 40) powerups.splice(i, 1);
    }
}

function updateScoreDisplay() {
    document.getElementById("scoreDisplay").textContent = score.toLocaleString();
    document.getElementById("livesDisplay").textContent = lives;
    document.getElementById("highScoreDisplay").textContent = highScore.toLocaleString();
}

function updateLivesDisplay() {
    document.getElementById("livesDisplay").textContent = lives;
}

// ---------------- GAME LOOP ----------------
function loop() {
    if (!gameActive) return;
    
    gameTime += 16;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    smoothMovement();
    updateBullets();
    updateEnemies();
    updateEnemyBullets();
    updatePowerups();
    updateShield();
    checkCollisions();

    drawUltimateShield();
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawEnemyBullets();
    drawPowerups();
    drawFireExplosion();

    requestAnimationFrame(loop);
}

// ---------------- MINUTE DIFFICULTY ----------------
setInterval(() => {
    if (!gameActive) return;
    baseWaveSize += 1;
    baseWaveSpeed += 0.3;
    baseShootChance = Math.min(0.5, baseShootChance + 0.04);
    waveInterval = Math.max(1500, waveInterval - 100);
}, 60000);

// ---------------- GAME OVER & RESTART ----------------
function gameOver() {
    gameActive = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    document.getElementById("finalScore").textContent = score.toLocaleString();
    document.getElementById("gameHighScore").textContent = highScore.toLocaleString();
    document.getElementById("gameOver").classList.add("show");
    updateScoreDisplay();
}

function restart() {
    lives = 3;
    score = 0;
    currentWave = 1;
    gameTime = 0;
    hasBombPowerup = false;
    hasShieldPowerup = false;
    player.hasShield = false;
    player.shieldTimer = 0;
    player.shieldAlpha = 0;
    player.shieldIntensity = 0;
    player.shieldParticles = [];

    baseWaveSize = 6;
    baseWaveSpeed = 1.4;
    baseShootChance = 0.03;
    waveInterval = 3500;

    bullets.length = 0;
    enemies.length = 0;
    enemyBullets.length = 0;
    powerups.length = 0;
    bombExplosion = null;

    player.x = canvas.width / 2 - 30;
    player.y = canvas.height - 150;
    player.vx = 0;
    player.vy = 0;

    gameActive = true;
    document.getElementById("gameOver").classList.remove("show");
    updatePowerupUI();
    updateScoreDisplay();
    updateWaveDisplay();
    loop();
}

// ---------------- EVENT LISTENERS ----------------
document.getElementById("restartBtn").onclick = restart;
document.getElementById("gameOver").onclick = (e) => {
    if (e.target === e.currentTarget) restart();
};

// ---------------- START GAME ----------------
updateScoreDisplay();
updateWaveDisplay();
loop();
