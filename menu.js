var logo, bg;
var Menu = {
    
    preload: function(){
        game.stage.backgroundColor = '#FFF';
        game.load.image('bg', 'img/bg.jpeg');
        game.load.image('logoFlappy', 'img/logo-flappy.png');
        game.load.image('boton', 'img/btn.png');
        game.load.image('logoCompany','img/logo-tslabs-color.png');
        game.load.audio('click','sound/click.mp3');
        game.load.audio('music_happy','sound/happy.mp3');
    },
    
    create: function(){
        bg = game.add.tileSprite(0, 0, 370, 550, 'bg');

        var boton = this.add.button(game.width/2, game.height/2, 'boton', this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
        
        //-------------[se agrega el logo y subtitulo del Flappy]-------------
        this.logoFlappy = game.add.sprite(game.world.centerX, (game.world.centerY) - 150,'logoFlappy');
        this.logoFlappy.scale.setTo(0.3,0.3);
        this.logoFlappy.anchor.setTo(0.5);
        var txtIniciar = game.add.text(game.width/2, game.height/2 -85, "Iniciar juego", {font: "bold 24px sans-serif", fill:"black", align:"center"});
        txtIniciar.anchor.setTo(0.5);
        
        //var txtTitulo = game.add.text(game.width/2, game.height/2 -125, "Flappy Bird", {font: "bold 30px sans-serif", fill:"black", align:"center"});
        //txtTitulo.anchor.setTo(0.5);

        //-------------[se agrega el logoCompany]-------------
        logo = game.add.sprite(game.world.centerX,(game.world.centerY) + 235, 'logoCompany');
        logo.anchor.setTo(0.5);
        logo.scale.setTo(0.6,0.6);
        //logo.alpha = 0;

        //-------------[se agrega la animacion del logoCompany]-------------
        //logo.animations.add('swim');
        //logo.animations.play('swim', 30,true);
        game.add.tween(this.logoFlappy).to({y:100}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        game.add.tween(logo).to({y:450}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        
        //-------------[se agrega la musica del juego]-------------
        musicaBg = game.add.audio('music_happy');
        musicaBg.volume = 0.3;
        musicaBg.play();
    },

    update: function () {
        bg.tilePosition.x -= 1;
    },
    
    iniciarJuego: function(){
        this.click = game.add.audio('click');
        this.click.play();
        musicaBg.stop();
        this.state.start('Juego');
    }
    
};