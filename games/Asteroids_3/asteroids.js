const config = {
    type: Phaser.AUTO,
    height: 600,
    width: 600,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: 0,
            debug: false,
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

function preload () {
    this.load.image('ship', '/spr_ship.png');
    this.load.image('bullet', '/bullet.png');
    this.load.image('lg_ast', '/lg_asteroid.png');
    this.load.image('med_ast', '/med_asteroid.png');
    this.load.image('sm_ast', '/sm_asteroid.png');
}

function create () {
    let rock = [];

    //create ship
    ship = this.physics.add.sprite(400, 400, 'ship');
    ship.setScale(0.4).setMaxVelocity(400);

    cursors = this.input.keyboard.createCursorKeys();

    //create bullet group
    bullets = this.physics.add.group({
        //key: 'bullet',
        collideWorldBounds: false,
        onWorldBounds: true,
        onCollide: true,
        setInteractive: true,
        });

    bigRocks = this.physics.add.group({
        //key: 'lg_ast',
        collideWorldBounds: false,
        onCollide: true,
        onWorldBounds: true,
        setInteractive: true,
        });
    
    medRocks = this.physics.add.group({
        //key: 'med_ast',
        collideWorldBounds: false,
        onCollide: true,
        onWorldBounds: true,
        setInteractive: true,
        });

    smallRocks = this.physics.add.group({
        //key: 'sm_ast',
        collideWorldBounds: false,
        onCollide: true,
        setInteractive: true,
        onWorldBounds: true,
        setInteractive: true,
    });
        

//create asteroids in random x,y spots, random angle, random velocity

//big rock
    function createBigRock() {
         bigRock = bigRocks.create(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800), 'lg_ast');
         bigRock.angle = Phaser.Math.RND.rotation();
         console.log(bigRock.x, bigRock.y);
        rock.push(bigRock)}
        console.log(rock)
 
     createBigRock();
     this.physics.velocityFromRotation(bigRock.rotation, Phaser.Math.RND.between(30,70), bigRock.body.velocity);


//medium rock
     function createMedRock(x, y) {
         medRock = medRocks.create(x, y, 'med_ast');
         medRock.angle = Phaser.Math.Angle.RandomDegrees();
         console.log(medRock.angle)
         console.log(medRock.x, medRock.y);
         rock.push(medRock)
        }
        console.log(rock)

     createMedRock(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800));
     this.physics.velocityFromAngle(medRock.angle, Phaser.Math.RND.between(30,70), medRock.body.velocity);

//small rock
     function createSmallRock(x, y) {
          smallRock = smallRocks.create(x, y, 'sm_ast');
          smallRock.angle = Phaser.Math.Angle.RandomDegrees();
          console.log(smallRock.x, smallRock.y);
          rock.push(smallRock)      }
          console.log(rock)

     createSmallRock(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800));
     this.physics.velocityFromAngle(smallRock.angle, Phaser.Math.RND.between(30,70), smallRock.body.velocity);
    console.log(rock)
//FIRE BULLET
      this.input.keyboard.on ('keydown-SPACE', fireBullet, this);
 
      function fireBullet() {
          bullet = bullets.create(ship.x, ship.y, 'bullet');
          bullet.scale = 2;
          bullet.angle = ship.angle;
          this.physics.velocityFromAngle(bullet.angle, 300, bullet.body.velocity);
          console.log('fire');
          return bullet;
      }   
//BULLET AND BIG ROCK COLLIDE
        this.physics.add.collider(bigRocks, bullets, destroyBigRock, checkBigRock, this);
        
        function checkBigRock() {
            if (bigRock) {
                return true
            }
        }

        function destroyBigRock() {
            console.log('BIG ROCK');
            //createMedRock(bigRock.x, bigRock.y);
            //this.physics.velocityFromAngle(medRock.angle, Phaser.Math.RND.between(30,70), medRock.body.velocity);    
            bullet.destroy();
            bigRock.destroy();
        }

//BULLET AND MEDIUM ROCK COLLIDE
        this.physics.add.collider(medRocks, bullets, destroyMedRock, checkMedRock, this) 

        function checkMedRock() {
            if (medRock) {
                return true
            }
        }

        function destroyMedRock() {
            console.log('MED ROCK')
            //createSmallRock(medRock.x, medRock.y)
            //this.physics.velocityFromAngle(smallRock.angle, Phaser.Math.RND.between(30,70), smallRock.body.velocity);
            bullet.destroy();
            medRock.destroy();
          };

//BULLET AND SMALL ROCK COLLIDE
        this.physics.add.collider(smallRocks, bullets, destroySmallRock, checkSmallRock, this) 
    
        function checkSmallRock() {
            if (smallRock) {
                return true
            }
        }

        function destroySmallRock() {
            console.log('SMALL ROCK')
            bullet.destroy()
            smallRock.destroy()
          }

}

function update () {
    function checkRocks() {         
        if (!bigRock && !medRock && !smallRock) {
            this.add.rectangle(100,100,100,100, 0x5827FF)
                this.add.text(300, 300,'NICE JOB').setFontSize(48)
            }
        }

    checkRocks()
    //Rotate rocks
    bigRock.angle += .5;
    smallRock.angle += .5;
    medRock.angle += .5;
    
    //Rotate ship
    if (cursors.left.isDown) {
        ship.angle -= 2
    }
    if (cursors.right.isDown) {
        ship.angle += 2
    }
    //Move ship forward
    if (cursors.up.isDown) {
        this.physics.velocityFromAngle(ship.angle, 100, ship.body.velocity);
    }
    //wrap ship and rocks around world bounds
    this.physics.world.wrap(ship, ship.width/3);
    this.physics.world.wrap(bigRocks, bigRock.width/3);
    this.physics.world.wrap(smallRocks, smallRock.width/3);
    this.physics.world.wrap(medRocks, medRock.width/3);

    // determine if there is a bullet in the world bounds

    if (this.bullet) {
        console.log(this.bullet.x, this.bullet.y)
 

    //destroy bullet when it leaves the world bounds
    if (this.bullet.x >= 800 || this.bullet.x <= 0 || this.bullet.y >= 800 || this.bullet.y <= 0) {
        console.log('WORLDBOUNDS');
        this.bullet.destroy();
    }
}   
}

