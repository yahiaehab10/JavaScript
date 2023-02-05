const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const blockWidth = 100
const blockHeight = 20 //from css

const boardWidth = 560
const boardHeight = 300

const ballDiamter = 20;
const ballStart = [270, 40]
let ballCurr = ballStart
let xDirection = 2
let yDirection = 2

const userStart = [230, 10]
let currentPos = userStart

let timerID //when we want the ball to stop

let score = 0

//create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}

const bArray = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw my block function
function addBlock() {


    for (let i = 0; i < bArray.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = bArray[i].bottomLeft[0] + 'px'
        block.style.bottom = bArray[i].bottomLeft[1] + 'px'
        grid.appendChild(block)

    }
}

addBlock()


/*BALL REGION*/
//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//draw ball
function drawBall() {
    ball.style.left = ballCurr[0] + 'px' //xAxis
    ball.style.bottom = ballCurr[1] + 'px' //yAxis
}

//move ball
function moveBall() {
    ballCurr[0] += xDirection // xAxis
    ballCurr[1] += yDirection
    drawBall()
    checkCollisions()
}

//check for collisions
function checkCollisions() {
    //check the blockk collisions
    for (let i = 0; i < bArray.length; i++) {
        if (
            (ballCurr[0] > bArray[i].bottomLeft[0] && ballCurr[0] < bArray[i].bottomRight[0]) &&
            (ballCurr[1] + ballDiamter > bArray[i].bottomLeft[1] && ballCurr[1] < bArray[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            bArray.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            //check for win
            if (bArray === 0) {
                scoreDisplay.innerHTML = 'YOU WON'
                clearInterval(timerID)
                document.removeEventListener('keydown', moveUser)
            }
        }

    }


    if (ballCurr[0] >= (boardWidth - ballDiamter) ||
        ballCurr[0] <= 0 ||
        ballCurr[1] >= (boardHeight - ballDiamter)) {
        changeDirection()
    }
    //check for user collision
    if (
        (ballCurr[0] > currentPos[0] && ballCurr[0] < currentPos[0] + blockWidth) &&
        (ballCurr[1] > currentPos[1] && ballCurr[1] < currentPos[1] + blockHeight)
    ) {
        changeDirection()
    }

    //check for gameOver
    if (ballCurr[1] <= 0) {
        clearInterval(timerID);
        scoreDisplay.innerHTML = 'You Lost'
        document.removeEventListener('keydown')
    }
}

//change direction during collison
function changeDirection() {

    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection == 2 && yDirection == -2) {
        xDirection = -2
        return
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2
        return
    }
    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2
        return
    }
}

/*USER REGION*/
//add user
const user = document.createElement('div')
user.classList.add('user')
drawuser()
grid.appendChild(user)


function drawuser() {
    user.style.left = currentPos[0] + 'px'
    user.style.bottom = currentPos[1] + 'px'
}
//move user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPos[0] > 0) {
                currentPos[0] -= 10
                drawuser()
            }
            break;

        case 'ArrowRight':
            if (currentPos[0] < boardWidth - blockWidth) { // as left corner of block is our anchor point
                currentPos[0] += 10
                drawuser()
            }
        default:
            break;
    }
}

document.addEventListener('keydown', moveUser)
timerID = setInterval(moveBall, 15)
