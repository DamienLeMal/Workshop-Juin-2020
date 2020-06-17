class esquive extends Phaser.Scene {
	constructor(){
		super("s_esquive");
	}

	init(data) {
		this.score = data.score;
	}

	create() {
		this.add.image(0,0,'back_esquive').setOrigin(0,0);

		this.up1 = 0;
		this.up2 = 1;
		this.move1 = 0;
		this.move2 = 0;

		this.cursor = this.input.keyboard.createCursorKeys();

		this.player = this.physics.add.sprite(360, 800, 'player_esquive').setScale(0.6,0.6);
		this.physics.add.sprite(360,400,'violet').setScale(1.13,0.16).setTint(0x000000).setAlpha(0.5);
		this.physics.add.sprite(360,400,'violet').setScale(1.2,0.2).setTint(0x000000).setAlpha(0.5);

		this.n1 = new kids('esquive_kid1', 120, this, 100);
		this.n2 = new kids('esquive_kid2', 360, this, 100);
		this.n3 = new kids('esquive_kid3', 600, this, 100);

		this.gauche = new button(150, 1000, this, 0, true);
		this.droite = new button(570, 1000, this, 1, false);

		this.saliva = this.physics.add.group();

		this.violet = this.physics.add.sprite(0,2000,'violet').setScale(100,0.5);

		this.physics.add.collider(this.n1._sprite,this.n2._sprite);
		this.physics.add.collider(this.n1._sprite,this.n3._sprite);
		this.physics.add.collider(this.n2._sprite,this.n3._sprite);
		this.physics.add.overlap(this.player,this.saliva,gameOver,null,this);
		this.physics.add.overlap(this.violet,this.saliva,destroy,null,this);

		this.text = this.add.text(360,550,"ESQUIVE !", {fontFamily: 'myFont', stroke:'#999', strokeThickness: 10}).setFontSize(64).setOrigin(0.5).setColor('#fff');

		this.timer = this.time.addEvent({ delay: 10000, callback: ()=>{
			this.text.setAlpha(1);
			this.text.setText("GAGNE !");
    	}, loop: false});
    	this.timer2 = this.time.addEvent({ delay: 3000, callback: ()=>{
			this.text.setAlpha(0);
    	}, loop: false});

    	this.graphic = this.add.graphics();
		this.graphic.fillStyle(0xbdff96);

		function gameOver () {
			console.log("perdu");
			this.timer.paused = true;
			this.text.setAlpha(1);
			this.text.setText("PERDU !");
		}
		function destroy (a,b) {
			b.destroy();
		}

		function kids(sprite, x, cela, velo) {
			this._sprite = cela.physics.add.sprite(x,106,sprite).setVelocityX(velo).setMaxVelocity(velo).setCollideWorldBounds(true).setBounce(1);
			this._velo = velo;
			this._rand = 2000*Math.random()+2000;
			cela.time.addEvent({ delay: this._rand, callback: ()=>{
				this._velo = this._sprite.body.velocity.x;
				this._sprite.setVelocityX(0);
				cela.time.addEvent({delay: 200, callback : ()=>{
					this._sprite.setVelocityX(this._velo);
				}, loop: false});
				this._rand = 2000*Math.random()+1800;
				if (!cela.timer.paused) {
					cela.saliva.create(this._sprite.x,this._sprite.y,'goutte').setVelocityY(300).setScale(0.5,0.5);
        		}
        	}, loop: true});
		}

		function button(x, y, cela, dir, dir2) {
			this._sprite = cela.physics.add.sprite(x,y,'btn_esquive_up').setScale(0.20).setFlipX(dir2).setDepth(9);
			this.var = 0;

			this._sprite.setInteractive();
        	this._sprite.on("pointerdown",()=>{
        		if (!cela.timer.paused) {
        			this._sprite.setTexture('btn_esquive_down');
        			if (dir == 1){
        				cela.move1 = 1; 
        			}else{
        				cela.move2 = 1;
        			}
        		}
        	})
        	this._sprite.on("pointerup",()=>{
        		if (!cela.timer.paused) {
        			this._sprite.setTexture('btn_esquive_up');
        			cela.move1 = 0;
        			cela.move2 = 0;
        		}
        	})
		}
	}

	update() {
		this.graphic.clear();
        this.graphic.fillRect(100, 365, 520 - 520 * this.timer.getProgress(), 70);
        if (this.timer.paused) {
			this.graphic.fillStyle(0xf24444);
			this.physics.world.timeScale = 999999;
		}else{
			this.graphic.fillStyle(0xbdff96);
		}

		if (!this.timer.paused) {
			if (this.cursor.right.isDown){
				this.player.x += 2;
				this.droite._sprite.setTexture('btn_esquive_down');
				this.up1 = 1;
			}else if (this.up1 == 1){
				this.up1 = 0;
				this.droite._sprite.setTexture('btn_esquive_up');
			}
			if (this.cursor.left.isDown){
				this.player.x -= 2;
				this.gauche._sprite.setTexture('btn_esquive_down');
				this.up2 = 1;
			}else if (this.up2 == 1){
				this.up2 = 0;
				this.gauche._sprite.setTexture('btn_esquive_up');
			}
	
			if (this.move1 == 1){
				this.player.x += 2;
			}
			if (this.move2 == 1){
				this.player.x -= 2;
			}
		}
	}
}

