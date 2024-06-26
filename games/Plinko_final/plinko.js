const config = {
    type: Phaser.AUTO,
    height: 600,
    width: 400,
    backgroundColor: 0xF7F7FA,
    physics: {
        default: 'arcade',
        arcade: { 
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
    this.load.image('ball', '/games/Plinko_final/new_ball copy.png');
    this.load.image('peg', '/games/Plinko_final/peg copy.png');
    this.load.image('prize1', '/games/Plinko_final/prizebox1.png')
    this.load.image('prize2', '/games/Plinko_final/prizebox2.png')
    this.load.image('prize3', '/games/Plinko_final/prizebox3.png')
    this.load.image('prize4', '/games/Plinko_final/prizebox4.png')
    this.load.image('prize5', '/games/Plinko_final/prizebox5.png')

}

function create() {

    //this.add.text(20,10,'Press any key to drop the ball', {fill: 0x0D96D4})

    gameState.ball = this.physics.add.sprite(50, 50, 'ball');
    gameState.ball.setScale(0.7);

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
//gameState.scoreText = this.add.text(350, 10, gameState.score, { fontSize: '15px', fill: '#000'})
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

    gameState.ball.setGravityY(200);
    gameState.ball.setBounce(.7); 

 
})

//ball and peg collide
this.physics.add.collider(gameState.ball, gameState.pegs, function() {

    gameState.ball.setBounce(.8); 
    gameState.ball.setGravityY(200);

})

//ball hits a box
this.physics.add.collider(gameState.ball, gameState.prize1, function() {
    gameState.prize1.destroy();
    gameState.prize2.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.prize5.disableBody(true);
    gameState.score -= 20;
    document.getElementById("sco").innerHTML=`Score: ${gameState.score}`;
    //gameState.scoreText.setText(gameState.score)
})

this.physics.add.collider(gameState.ball, gameState.prize2, function() {
    gameState.prize2.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.prize5.disableBody(true);    
    gameState.score += 20;
    document.getElementById("sco").innerHTML=`Score: ${gameState.score}`;
    //gameState.scoreText.setText(gameState.score)
});

this.physics.add.collider(gameState.ball, gameState.prize3, function() {
    gameState.prize3.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize2.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.prize5.disableBody(true);
    gameState.score += 50;
    document.getElementById("sco").innerHTML=`Score: ${gameState.score}`;
    //gameState.scoreText.setText(gameState.score)
});

this.physics.add.collider(gameState.ball, gameState.prize4, function() {
    gameState.prize4.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize2.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize5.disableBody(true);
    gameState.score += 20;
    document.getElementById("sco").innerHTML=`Score: ${gameState.score}`;
    //gameState.scoreText.setText(gameState.score)
});

this.physics.add.collider(gameState.ball, gameState.prize5, function() {
    gameState.prize5.destroy();
    gameState.prize1.disableBody(true);
    gameState.prize2.disableBody(true);
    gameState.prize3.disableBody(true);
    gameState.prize4.disableBody(true);
    gameState.score -= 20;
    document.getElementById("sco").innerHTML=`Score: ${gameState.score}`;
    //gameState.scoreText.setText(gameState.score)
})


} 

function update() {

    if (gameState.ball.x >= 400) {
        gameState.ball.setVelocityX(-150)
    }
    if (gameState.ball.x <= 0) {
        gameState.ball.setVelocityX(150)
    }

}