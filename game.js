// Get the game objects
const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipeTop");
const pipeBottom = document.getElementById("pipeBottom");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

// Bird settings
let birdY = 250;
let velocity = 0;

const gravity = 0.5;
const jumpPower = -9;

// Pipe settings
let pipeX = 400;
let gapY = 220;

let score = 0;
let gameRunning = true;


// Make the bird jump
function jump() {
    if (gameRunning) {
        velocity = jumpPower;
    }
}


// Keyboard control
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }
});


// Mouse / touch control
document.getElementById("game").addEventListener("click", function(event) {

    // Don't jump when clicking the Play Again button
    if (event.target.tagName !== "BUTTON") {
        jump();
    }

});


// Create a new pipe position
function createPipe() {

    pipeX = 400;

    // Random position for the gap
    gapY = Math.floor(Math.random() * 250) + 100;

    pipeTop.style.height = gapY + "px";

    pipeBottom.style.height = (600 - gapY - 150) + "px";
}


// Check whether two objects are touching
function collision(rect1, rect2) {

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}


// End the game
function endGame() {

    gameRunning = false;

    finalScore.textContent = "Score: " + score;

    gameOverScreen.style.display = "block";
}


// Restart the game
function restartGame() {

    birdY = 250;
    velocity = 0;

    pipeX = 400;

    score = 0;

    scoreText.textContent = "Score: 0";

    gameRunning = true;

    gameOverScreen.style.display = "none";

    createPipe();

    gameLoop();
}


// Main game loop
function gameLoop() {

    if (!gameRunning) {
        return;
    }

    // --------------------
    // Bird movement
    // --------------------

    velocity += gravity;

    birdY += velocity;

    bird.style.top = birdY + "px";


    // --------------------
    // Move pipes
    // --------------------

    pipeX -= 3;

    pipeTop.style.left = pipeX + "px";
    pipeBottom.style.left = pipeX + "px";


    // --------------------
    // Create new pipes
    // --------------------

    if (pipeX < -70) {

        createPipe();

        score++;

        scoreText.textContent = "Score: " + score;
    }


    // --------------------
    // Collision detection
    // --------------------

    const birdRect = bird.getBoundingClientRect();
    const topPipeRect = pipeTop.getBoundingClientRect();
    const bottomPipeRect = pipeBottom.getBoundingClientRect();

    if (
        collision(birdRect, topPipeRect) ||
        collision(birdRect, bottomPipeRect)
    ) {
        endGame();
        return;
    }


    // --------------------
    // Ground and sky collision
    // --------------------

    if (birdY < 0 || birdY > 550) {
        endGame();
        return;
    }


    // Run the game again
    requestAnimationFrame(gameLoop);
}


// Start the game
createPipe();
gameLoop();
