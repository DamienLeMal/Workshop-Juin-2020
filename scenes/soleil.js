class soleil extends Phaser.Scene {
	constructor(){
		super("s_soleil");
	}

	init(data) {
		this.score = data.score;
	}

	create() {
		this.add.image(0,0,'blue').setOrigin(0,0).setSize(1,1).setScale(20,20);


		this.player = this.physics.add.sprite(300,500,'violet').setScale(0.2,0.4);

		//mj & time
		this.add.text(-450,-200,"1...", {fontFamily: 'myFont'}).setFontSize(64);
		this.text = this.add.text(450,200,"1...", {fontFamily: 'myFont'}).setFontSize(64);
		this.bloc = this.physics.add.sprite(400,230,'blanc').setScale(0.2,0.2).setTint(0x00ff00);
		this.sun = -1;
		this.d = 0;

		//Illusion de l'animation de course :
			//Quand sun == 3 -> Sprite à l'arrêt
			//Quand le joueur appuit -> sprite course, et mirroir à chaque nouvel appuit
			//Eventuellement : Un timer qui se reset à chaque appuit, dès qu'il s'enclenche, passe la sprite en mode arrêt


		this.cursor = this.input.keyboard.createCursorKeys();

		
		this.time.addEvent({ delay: 1000, callback: ()=>{
			this.sun += 1;
			switch (this.sun) {
				case 0: this.text.setText("1...");
				case 1: this.text.setText("2...");
						this.bloc.setTint(0x00ff00); break;
						this.blancoc.setTint(0x00ff00); break;
				case 2: this.text.setText("3...");
						this.bloc.setTint(0xffA500); break;
				case 3: this.text.setText("SOLEIL !");
						this.sun = -2;
						this.bloc.setTint(0xff0000); break;
			}
        }, loop: true});


		new button("btn_up", 360, 1000, this);

		function button(sprite, x, y, cela) {
			this._sprite = cela.physics.add.sprite(x,y,sprite).setScale(0.25);

			this._sprite.setInteractive();
    		this._sprite.on("pointerover",()=>{
    			
        	})
        	this._sprite.on("pointerout",()=>{
        	    
        	})
        	this._sprite.on("pointerdown",()=>{
        		this._sprite.setTexture('btn_down');
        		if ((cela.sun == 0) || (cela.sun == 1) || (cela.sun == 2)){
					cela.player.y -= 5;
				}else{
					cela.player.setTint(0x00ffff);
				}
        	})
        	this._sprite.on("pointerup",()=>{
        		this._sprite.setTexture('btn_up');
        		this.d = 0;
        	})
		}
	}

	update() {
		if (this.cursor.down.isDown){	
			this.player.y += 10;
		}
		if (this.cursor.up.isDown && this.press == 0){
			if ((this.sun == 0) || (this.sun == 1) || (this.sun == 2)){
				this.player.y -= 5;
			}else{
				this.player.setTint(0x00ffff);
			}
			this.press = 1;
		}
		if (this.cursor.up.isUp){
			this.press = 0;
		}
	}
}

