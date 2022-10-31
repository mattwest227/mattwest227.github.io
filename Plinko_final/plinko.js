const config = {
    type: Phaser.AUTO,
    height: 600,
    width: 400,
    backgroundColor: 0xF7F7FA,
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: 0,
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }  
};

const game = new Phaser.Game(config);
const gameState = {};
 
function preload() {
    this.load.image('ball', '/new_ball copy.png');
    this.load.image('peg', '/peg copy.png');
    this.load.image('prize25', '/prize25.png')
    this.load.image('prize50', '/prize50.png')
    this.load.image('prizeMask', '/prizes_mask_0000_mask.png')
    this.load.image('prize1', '/prizebox1.png')
    this.load.image('prize2', '/prizebox2.png')
    this.load.image('prize3', '/prizebox3.png')
    this.load.image('prize4', '/prizebox4.png')
    this.load.image('prize5', '/prizebox5.png')

}

function create() {

    this.add.text(20,10,'Press any key to drop the ball', {fill: 0x0D96D4})

    gameState.ball = this.physics.add.sprite(50, 50, 'ball');
    gameState.ball.setScale(0.7);

 /*   gameState.prize25 = this.physics.add.sprite(80, 400, 'prize25');
    gameState.prize25.setScale(0.02);

    gameState.prize50 = this.physics.add.sprite(200, 400, 'prize50');
    gameState.prize50.setScale(0.02);

    gameState.prize25b = this.physics.add.sprite(320, 400, 'prize25');
    gameState.prize25b.setScale(0.025);
*/

    //create pegs
    gameState.pegs = this.physics.add.staticGroup();

       for (let i = 20; i <= 390; i += 50) {
            for (let j = 100; j <= 540; j += 100) {
            let peg = gameState.pegs.create(i, j, 'peg');
            //peg.setScale(0.01);


            const body = peg.body
            body.updateFromGameObject();
        }
        }

        for (let i = 45; i <= 390; i += 50) {
            for (let j = 150; j <= 540; j+=100) {
            let peg = gameState.pegs.create(i, j, 'peg');
            //peg.setScale(0.01);


            const body = peg.body
            body.updateFromGameObject();
        }
    }

gameState.score = 0;
gameState.scoreText = this.add.text(350, 10, gameState.score, { fontSize: '15px', fill: '#000'})
gameState.prize1 = this.physics.add.sprite(40,590,'prize1');
gameState.prize2 = this.physics.add.sprite(120,590,'prize2');
gameState.prize3 = this.physics.add.sprite(200,590,'prize3');
gameState.prize4 = this.physics.add.sprite(280,590,'prize4');
gameState.prize5 = this.physics.add.sprite(360,590,'prize5');

this.add.text(30,577,'-20')
this.add.text(110,577,'20')
this.add.text(190,577,'50')
this.add.text(270,577,'20')
this.add.text(350,577,'-20')

gameState.ball.setVelocityX(100)


} 

function update() {

gameState.ball.setInteractive();

//start game - ball goes back and forth
if (gameState.ball.x >= 400) {
gameState.ball.setVelocityX(-100)
}

if (gameState.ball.x <=0) {
    gameState.ball.setVelocityX(100)
}

//keypress - drop ball
addEventListener('keydown', function() {

    gameState.ball.setGravityY(250);
    gameState.ball.setBounce(.6); 

    if (gameState.ball.x >= 400) {
        gameState.ball.setVelocityX(-150)
    }
    if (gameState.ball.x <= 0) {
        gameState.ball.setVelocityX(150)
    }
})

//ball and peg collide
this.physics.add.collider(gameState.ball, gameState.pegs, function() {

    gameState.ball.setBounce(.85); 
    gameState.ball.setGravityY(150);
    gameState.ball.setAngularVelocity(-100);

})

/*ball hits a circle prize
this.physics.add.collider(gameState.ball, gameState.prize25, function() {
    gameState.score += 25;
    gameState.scoreText.setText(gameState.score)
    gameState.prize25.setGravityY(1000);
})

this.physics.add.collider(gameState.ball, gameState.prize25b, function() {
    gameState.score += 25;
    gameState.scoreText.setText(gameState.score)
    gameState.prize25b.setGravityY(1000);
})

this.physics.add.collider(gameState.ball, gameState.prize50, function() {
    gameState.score += 50;
    gameState.scoreText.setText(gameState.score)
    gameState.prize50.setGravityY(1000);
})
*/
//ball hits a box
this.physics.add.collider(gameState.ball, gameState.prize1, function() {
    gameState.prize1.destroy();
    gameState.prize2.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.prize5.disableBody(true);
    gameState.score -= 20;
    gameState.scoreText.setText(gameState.score)
})

this.physics.add.collider(gameState.ball, gameState.prize2, function() {
    gameState.prize2.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.prize5.disableBody(true);    gameState.score += 20;
    gameState.scoreText.setText(gameState.score)
});

this.physics.add.collider(gameState.ball, gameState.prize3, function() {
    gameState.prize3.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize2.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.prize5.disableBody(true);
    gameState.score += 50;
    gameState.scoreText.setText(gameState.score)
});

this.physics.add.collider(gameState.ball, gameState.prize4, function() {
    gameState.prize4.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize2.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize5.disableBody(true);
    gameState.score += 20;
    gameState.scoreText.setText(gameState.score)
});

this.physics.add.collider(gameState.ball, gameState.prize5, function() {
    gameState.prize5.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize2.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.score -= 20;
    gameState.scoreText.setText(gameState.score)
})

/*
function updateScore(points) {
    const oldScore = document.getElementbyID("score")
    const newScore = oldScore + points;
    document.score.innerHTML = "newScore"

}
*/
}