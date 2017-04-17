var Game_Over = {
    
    preload: function(){
        game.stage.backgroundColor = '#2c3e50';
        game.load.image('boton', 'img/btn.png');
    }, 
    
    create: function(){
        var boton = this.add.button(game.width/2, game.height/2, 'boton', this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
        
        var txtPuntosEtiqueta = game.add.text(game.width/2 -50, game.height/2 -85, "Puntos: ", {font: "bold 20px sans-serif", fill:"white", align:"center"});
        txtPuntosEtiqueta.anchor.setTo(0.5);
        if(puntos == -1)
            puntos = 0;
        var txtPuntosNumero = game.add.text(game.width/2 +50, game.height/2 -85, puntos.toString(), {font: "bold 20px sans-serif", fill:"white", align:"center"});
        txtPuntosNumero.anchor.setTo(0.5);
        var txtTitulo = game.add.text(game.width/2, game.height/2 -125, "Juego terminado", {font: "bold 30px sans-serif", fill:"white", align:"center"});
        txtTitulo.anchor.setTo(0.5);
    }, 
    
    iniciarJuego: function(){
        this.state.start('Juego');
    }
    
};