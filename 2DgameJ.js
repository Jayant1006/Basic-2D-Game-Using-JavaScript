//for building canvas ,ball ,paddle
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
//for key presses
var rightPressed = false;
var leftPressed = false;
//to build the bricks 
var brickRowsCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//to count the score of the participant 
var score = 0;
var lives = 3;
//Making the Bricks for the game 
var bricks = [];
//i is for columns and j is for rows 
for (var i = 0; i < brickColCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRowsCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseHandler, false);
//for key down operation
//key : holds the information about the key that was pressed

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    if (e.key == 'Left' || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

//for key up operation
//key : holds the information about the key that was pressed
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    if (e.key == 'Left' || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//funtion for the mouse hover movements
function mouseHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
//collison detection for the bricks
function collisionDetection() {
    for (var c = 0; c < brickColCount; c++) {
        for (var r = 0; r < brickRowsCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowsCount * brickColCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


function drawBall() {
    ctx.beginPath();// to begin a new path using the canvas api which is included in the HTML
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();//Used to close the current path 
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var i = 0; i < brickColCount; i++) {
        for (var j = 0; j < brickRowsCount; j++) {
            if (bricks[i][j].status == 1) {
                var brickX = (i * (brickWidth + brickPadding) + brickOffsetLeft);
                var brickY = (j * (brickHeight + brickPadding) + brickOffsetTop);
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//counting the obtained score by the participant
function getScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
//function for calculating the lives 
function getLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    getScore();
    getLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //Bounce of the wall
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    //implementing the game over part
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    //paddle moving logic
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

