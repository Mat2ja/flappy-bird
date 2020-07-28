document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    // in rems
    let birdLeft = 22;
    let birdBottom = 10;
    let gravity = .2;
    let jumpHeight = 5;
    let isGameOver = false;


    function startGame() {
        birdBottom -= gravity

        bird.style.bottom = birdBottom + 'rem';
        bird.style.left = 50 + '%';
        bird.style.transform = 'translateX(-50%)';

    }
    let gameTimerId = setInterval(startGame, 20);


    function control(e) {
        // SPACE || ENTER
        if (e.keyCode === 32 || e.keyCode === 13 || e.type === 'mouseup') {
            jump();
        }
    }

    function jump() {
        if (birdBottom < 57) birdBottom += jumpHeight;

        bird.style.bottom = birdBottom + 'rem';

        console.log(Math.round(birdBottom * 10) + 'px');
    }
    document.addEventListener('keyup', control);
    document.addEventListener('mouseup', control);


    function generateObstacle() {
        let obstacleLeft = 50; // 500px off to right, just outside the game
        let randomHeight = Math.floor(Math.random() * 6.1);
        console.log('random', randomHeight);
        let obstacleBottom = randomHeight;



        const obstacle = document.createElement('div');

        if (!isGameOver) {
            obstacle.classList.add('obstacle');
        }
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeft + 'rem';
        obstacle.style.bottom = obstacleBottom + 'rem';


        function moveObstacle() {
            obstacleLeft -= .2; // move 2px to left
            obstacle.style.left = obstacleLeft + 'rem';

            // width of the obstacle
            // when obstcle exits the screen, remove it
            if (obstacleLeft <= -6) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle)
            }

            if (
                obstacleLeft > 20 && obstacleLeft < 28 &&
                //TODO birdBottom < obstacleBottom + 15.3 ||
                birdBottom <= 0
            ) {
                gameOver();
                clearInterval(timerId)
            }

        }

        // move obstacle towards left
        let timerId = setInterval(moveObstacle, 20);
        // generate new obstacle every n seconds

        if (!isGameOver) {
            setTimeout(generateObstacle, 3000)
        }



    }

    generateObstacle();


    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        document.removeEventListener('mouseup', control);
        console.log('game over');
    }
});