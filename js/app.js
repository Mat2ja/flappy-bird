document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    let groundHeight = getComputedStyle(ground).height.replace('px', '');

    // in rems
    let birdLeft = 22;
    let birdBottom = 10;
    let gravity = .2;
    let jumpHeight = 5;
    let isGameOver = false;
    let gap = 5;


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
    }
    document.addEventListener('keyup', control);
    document.addEventListener('mouseup', control);


    function generateObstacle() {
        let obstacleLeft = 50; // 500px off to right, just outside the game
        let randomHeight = Math.floor(Math.random() * 6.1);
        let obstacleBottom = randomHeight;

        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');



        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('obstacle--top');
        }

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'rem';
        obstacle.style.bottom = obstacleBottom + 'rem';
        topObstacle.style.left = obstacleLeft + 'rem';
        topObstacle.style.top = -obstacleBottom + 'rem';

        let randomHue = Math.floor(Math.random() * 360 + 1);
        console.log(randomHue);
        obstacle.style.filter = `hue-rotate(${randomHue}deg)`


        // only number values, but in pixels
        let obstacleHeight = +getComputedStyle(obstacle).height.replace('px', '');
        let obstacleWidth = +getComputedStyle(obstacle).width.replace('px', '');



        function moveObstacle() {
            obstacleLeft -= .2; // move 2px to left
            obstacle.style.left = obstacleLeft + 'rem';
            topObstacle.style.left = obstacleLeft + 'rem';

            // when obstacle exits the screen, remove it
            if (obstacleLeft <= -obstacleWidth) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if (
                obstacleLeft > 18 && obstacleLeft < 28 &&
                (birdBottom < obstacleBottom + obstacleHeight / 10 - groundHeight / 10 ||
                    birdBottom > obstacleBottom + obstacleHeight / 10 + gap - 2.5)
                || birdBottom <= 0
            ) {
                console.log('birdbottom', birdBottom);
                console.log('obstacleBottom', obstacleBottom);
                console.log('gap', gap);
                console.log('obs', obstacleBottom + obstacleHeight / 10 + gap - 2.5);
                //TODO make next obstacle disappear
                // let allObstacles = document.querySelectorAll('.obstacle');
                // for (let o of allObstacles) {
                //     clearInterval(timerId);
                // }
                clearInterval(timerId);
                gameOver();
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
        console.log('%cGAME OVER', 'background: orangered; padding: .2em 1em; font-size: 30px');
    }
});