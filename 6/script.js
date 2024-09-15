const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const gameCanvas = document.getElementById('gameCanvas');
let startTime;
let moveCount = 0;

function getRandomPosition(element) {
    const x = Math.floor(Math.random() * (gameCanvas.clientWidth - element.clientWidth));
    const y = Math.floor(Math.random() * (gameCanvas.clientHeight - element.clientHeight));
    return { x, y };
}

function placeElements() {
    const ballPos = getRandomPosition(ball);
    const holePos = getRandomPosition(hole);
    ball.style.left = `${ballPos.x}px`;
    ball.style.top = `${ballPos.y}px`;
    hole.style.left = `${holePos.x}px`;
    hole.style.top = `${holePos.y}px`;
}

function checkCollision() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();
    return !(
        ballRect.top > holeRect.bottom ||
        ballRect.bottom < holeRect.top ||
        ballRect.left > holeRect.right ||
        ballRect.right < holeRect.left
    );
}

function onDeviceMove(event) {
    const { alpha, beta, gamma } = event;
    ball.style.left = `${parseFloat(ball.style.left) + gamma / 2}px`;
    ball.style.top = `${parseFloat(ball.style.top) + beta / 2}px`;

    if (checkCollision()) {
        if (!startTime) {
            startTime = new Date();
        } else {
            moveCount++;
        }
        placeElements();
        alert(`Move count: ${moveCount}`);
    }
}

window.addEventListener('deviceorientation', onDeviceMove);
placeElements();
