const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let balls = [];
let numBalls = document.getElementById('numBalls').value;
let maxDistance = document.getElementById('distance').value;
let force = document.getElementById('force').value;
let animationFrameId;

class Ball {
    constructor(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.vx > canvas.width - this.radius || this.x + this.vx < this.radius) {
            this.vx = -this.vx;
        }
        if (this.y + this.vy > canvas.height - this.radius || this.y + this.vy < this.radius) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    }
}

function init() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        let radius = 5;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let vx = (Math.random() - 0.5) * 4;
        let vy = (Math.random() - 0.5) * 4;
        balls.push(new Ball(x, y, vx, vy, radius));
    }
}

function drawLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let dx = balls[i].x - balls[j].x;
            let dy = balls[i].y - balls[j].y;
            let distance = Math.sqrt(dx * dy + dy * dy);
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });
    drawLines();
    animationFrameId = requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    balls.forEach(ball => {
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < force) {
            const angle = Math.atan2(dy, dx);
            ball.vx += Math.cos(angle) * 0.1;
            ball.vy += Math.sin(angle) * 0.1;
        }
    });
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < ball.radius) {
            balls.splice(i, 1);
            balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, ball.radius));
            balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, ball.radius));
            break;
        }
    }
});

document.getElementById('startButton').addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    numBalls = document.getElementById('numBalls').value;
    maxDistance = document.getElementById('distance').value;
    force = document.getElementById('force').value;
    init();
    animate();
});

document.getElementById('resetButton').addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
});
