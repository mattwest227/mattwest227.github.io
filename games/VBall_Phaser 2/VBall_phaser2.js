const config = {
    type: Phaser.AUTO,
    height: 600,
    width: 1000,
    physics: {
        default: 'arcade',
        arcade: {
        //gravity: {},
        //speedMax: {ball: 200},
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
    this.load.image('ball', '/games/VBall_Phaser_2/ball.png');
    this.load.image('player', '/games/VBall_Phaser_2/star_88.png');
    this.load.image('background', '/games/VBall_Phaser_2/VBackground.png');
};


function create() {
    gameState.background = this.add.image(500, 300, 'background');
    gameState.player1 = this.physics.add.sprite(925, 425, 'player');
    gameState.player2 = this.physics.add.sprite(570, 370, 'player');
    gameState.player3 = this.physics.add.sprite(300, 300, 'player');
    gameState.player4 = this.physics.add.sprite(450, 240, 'player');
    gameState.ball = this.physics.add.sprite(895, 400, 'ball');
    gameState.player = gameState.player3;
    //gameState.player1.checkCollision.down = false
    //gameState.player2.checkCollision.down = false
    //gameState.player3.checkCollision.down = false
    //gameState.player4.checkCollision.down = false
    gameState.ball.setInteractive();
    gameState.ball.setGravityY(0);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.player.setInteractive();
    gameState.player.setPushable(false);

// toss
    addEventListener('keydown', function () {
            gameState.ball.setGravityY(-400);
            if (gameState.ball.y <= 350) {
                gameState.ball.setGravityY(400)
            }
    
            if (gameState.ball.y > 400) {
                gameState.ball.y = 400
                gameState.ball.setGravityY(0)
            }
});
}
// serve
    addEventListener('keyup', function () { 
            gameState.ball.setAngularVelocity(-250);
            gameState.ball.setAngularAcceleration(-100);
            gameState.ball.setAngularDrag(1000);
            gameState.ball.setGravityX(-200);
            gameState.ball.setMaxVelocity(350);
            })
            if (gameState.ball.x <= 700) {
                gameState.ball.setGravityY(200)
            }
            if (gameState.ball.y >= 650) {
                gameState.ball.setGravityY(0)
    }
   

function update() {
 
            
//move player 3
            if (gameState.cursors.up.isDown) {
                gameState.player.y -= 1
            }
            if (gameState.cursors.down.isDown) {
                gameState.player.y += 1
            }
            if (gameState.cursors.left.isDown) {
                gameState.player.x -= 1
            }
            if (gameState.cursors.right.isDown) {
                gameState.player.x += 1 
            }
//bump

            this.physics.add.collider(gameState.player, gameState.ball, function () {
                    gameState.ball.setVelocity(100, 1200);
                    gameState.ball.setAcceleration(200);
                    gameState.player = gameState.player4;

            })

//move player 4
if (gameState.cursors.up.isDown) {
    gameState.player.y -= 1
}
if (gameState.cursors.down.isDown) {
    gameState.player.y += 1
}
if (gameState.cursors.left.isDown) {
    gameState.player.x -= 1
}
if (gameState.cursors.right.isDown) {
    gameState.player.x += 1 
}
//set
   
this.physics.add.collider(gameState.player, gameState.ball, function () {
    if (gameState.player.body.checkCollision.up === true) {
        gameState.ball.setGravityX(-1200)
    }

}) 

   
}
