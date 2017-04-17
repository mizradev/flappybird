var bg, tubos, flappy, salto, timer, puntos, txtPuntos;
var Juego = {
  
    preload: function(){
        game.load.image('bg', 'img/bg.jpeg');
        game.load.spritesheet('pajaros', 'img/pajaro2.png', 707, 590);
        //game.load.spritesheet('pajaros', 'img/pajaro.png', 261, 222);
        game.load.image('tubo', 'img/tubo.png');
        game.load.audio('punto','sound/punto.mp3');
        game.load.audio('aleteo','sound/aleteo.mp3');
        game.load.audio('choque','sound/choque.mp3');
        game.forceSingleUpdate = true;
    },
    
    create: function(){
        bg = game.add.tileSprite(0, 0, 370, 550, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        tubos = game.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20, 'tubo');
        
        flappy = game.add.sprite(100, 245, 'pajaros');
        flappy.frame = 1;
        flappy.scale.setTo(0.07,0.07);
        flappy.anchor.setTo(0.5);
        flappy.animations.add('vuelo', [0,1,2,3], 10, true);
        
        game.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1200;
        
        //salto = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //salto.onDown.add(this.saltar, this);
        
        game.input.onTap.add(this.onTap, this);

        timer = game.time.events.loop(1500, this.crearColumna, this);
        
        puntos = -1;
        txtPuntos = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#FFF"});
        musicaBg.play();
 
    },
    
    update: function(){
        if(flappy.inWorld == false)
        {
            //Reiniciar = enviar a Game_Over
            musicaBg.stop();
            this.state.start('Game_Over');
        }
        else if(flappy.position.y >460)
        {
            //Reiniciar = enviar a Game_Over
            flappy.alive = false;
            tubos.forEachAlive(function(t){
                   t.body.velocity.x = 0;
            }, this);
        }
        else
        {
            bg.tilePosition.x -= 1; 
        }
        
        game.physics.arcade.overlap(flappy, tubos, this.tocoTubo, null, this);
        
        flappy.animations.play('vuelo');
        if(flappy.angle < 20){
            flappy.angle += 1;

        }
    },

    onTap: function (pointer,doubleTap) {
        if(pointer || doubleTap){
            flappy.body.velocity.y = -350;
        game.add.tween(flappy).to({angle:-20}, 100).start();
        this.aleteo = game.add.audio('aleteo');
        this.aleteo.volume = 0.2;
        this.aleteo.play();
        }
    },
    
    saltar: function(){
        flappy.body.velocity.y = -350;
        game.add.tween(flappy).to({angle:-20}, 100).start();
        this.aleteo = game.add.audio('aleteo');
        this.aleteo.volume = 0.2;
        this.aleteo.play();

    },

    crearColumna: function(){
        var hueco = Math.floor(Math.random()*5)+1;
        for( var i = 0; i < 8; i++)
        {
            if(i != hueco && i != hueco+1){
                this.crearUnTubo(370, i*55+20);
            }
        }
        puntos +=1;
        txtPuntos.text = puntos;
        this.punto = game.add.audio('punto');
        this.punto.play();
    }, 
    
    crearUnTubo: function(x, y){
        var tubo = tubos.getFirstDead();
        tubo.reset(x, y);
        tubo.body.velocity.x = -180;
        tubo.checkWorldBounds = true;
        tubo.outOfBoundsKill = true;
    },
    
    tocoTubo: function(){
        if(flappy.alive == false)
            return;
        flappy.alive = false;
        game.time.events.remove(timer);
        
        tubos.forEachAlive(function(t){
            t.body.velocity.x = 0;
            this.choque = game.add.audio('choque');
            this.choque.volume = 0.2;
            this.choque.play();
            musicaBg.stop();
        }, this);
    }
    
};