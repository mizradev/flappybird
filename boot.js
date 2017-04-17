var Boot = {
    preload: () => {
        game.stage.backgroundColor = '#e74c3c';
        
        
        
        //game.load.setPreloadSprite(this.logo);

    },
    create: () => {
        game.state.start('Menu');
    }
}