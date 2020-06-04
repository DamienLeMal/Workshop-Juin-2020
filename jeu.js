var config = {
	type: Phaser.AUTO,
	width: 720,
	height: 1280,
	scene: [menu,soleil,marelle,esquive],
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);