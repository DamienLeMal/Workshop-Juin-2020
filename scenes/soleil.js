class soleil extends Phaser.Scene {
	constructor(){
		super("s_soleil");
	}

	init(data) {
		this.score = data.score;
	}

	create() {
		//this.add.image(0,0,'blue').setOrigin(0,0).setSize(1,1).setScale(20,20);
		this.add.image(0,0,'back_sun').setOrigin(0,0);

		this.meneur = this.physics.add.sprite(360,200,'meneur_front').setScale(0.75);
		this.player = this.physics.add.sprite(200,500,'kid_stop').setScale(0.75);
		this.ia = this.physics.add.sprite(520,500,'ia_stop').setScale(0.75);
		this.violet = this.physics.add.sprite(0,-50,'violet').setScale(100,0.5).setAlpha(0);
		this.flipI;

		//mj & time
		this.add.text(-450,-200,"Ready ?", {fontFamily: 'myFont', stroke:'#000', strokeThickness: 10}).setFontSize(64);
		this.text = this.add.text(450,100,"Ready ?", {fontFamily: 'myFont', stroke:'#000', strokeThickness: 10}).setFontSize(64);
		this.bloc = this.physics.add.sprite(0,0,'blanc').setScale(0.2,0.2).setTint(0xff0000);
		this.sun = -1;

		this.cursor = this.input.keyboard.createCursorKeys();
		
		this.timejeu = this.time.addEvent({ delay: 1000, callback: ()=>{
			this.sun += 1;
			switch (this.sun) {
				case 0: this.text.setText("1...");
						this.bloc.setTint(0x00ff00);
						ia_vance(this);
						if (this.meneur.scaleX < 0.90){
 							this.meneur.scaleX += 0.1;
							this.meneur.scaleY += 0.1;
						}
						this.meneur.setTexture('meneur_back');
						this.time.addEvent({ delay: 100, callback: ()=>{
							if (this.meneur.scaleX > 0.75){
   								this.meneur.scaleX -= 0.1;
   								this.meneur.scaleY -= 0.1;
   							}
						}, loop: false});
						break;
				case 1: this.text.setText("2...");
						this.bloc.setTint(0x00ff00); break;
				case 2: this.text.setText("3...");
						this.bloc.setTint(0xffA500); break;
				case 3: this.text.setText("SOLEIL !");
						this.sun = -2;
						this.bloc.setTint(0xff0000);
						if (this.meneur.scaleX < 0.90){
 							this.meneur.scaleX += 0.1;
							this.meneur.scaleY += 0.1;
						}
						this.meneur.setTexture('meneur_front');
						this.time.addEvent({ delay: 100, callback: ()=>{
							if (this.meneur.scaleX > 0.75){
   								this.meneur.scaleX -= 0.1;
   								this.meneur.scaleY -= 0.1;
   							}
						}, loop: false});
						break;
			}
        }, loop: true});

		this.btn = new button("btn_up", 360, 1000, this);

		this.physics.add.overlap(this.player,this.violet,win,null,this);
		this.physics.add.overlap(this.ia,this.violet,loose,null,this);


		function win() {
			console.log("gg");
			this.timejeu.remove(false);
		}
		function loose() {
			console.log("gg à l'autre");
			this.timejeu.remove(false);
		}

		function button(sprite, x, y, cela) {
			this._sprite = cela.physics.add.sprite(x,y,sprite).setScale(0.25);
			this.var = 0;

			this._sprite.setInteractive();
        	this._sprite.on("pointerdown",()=>{
        		click(this._sprite, cela, cela.player);
        	})
        	this._sprite.on("pointerup",()=>{
        		unclick(this._sprite, cela, cela.player)
        	})
		}
		function ia_vance (cela) {
			cela.time.addEvent({ delay: 300, callback: ()=>{
    			if ((cela.sun == 0) || (cela.sun == 1) || (cela.sun == 2)){
					cela.ia.y -= 7;
					if (cela.flipI == 0){
						cela.flipI = 1;
					}else{
						cela.flipI = 0;
					}
					cela.ia.setTexture('ia_run').setFlipX(cela.flipI) ;
					if (cela.ia.scaleX < 0.90){
 						cela.ia.scaleX += 0.1;
						cela.ia.scaleY += 0.1;
					}
				}else{
					cela.ia.setTint(0x00ffff);
				}
				if (typeof cela.timeCount1 !== 'undefined') {
					cela.timeCount1.remove(false);
				}
				cela.time.addEvent({ delay: 50, callback: ()=>{
					if (cela.ia.scaleX > 0.75){
   						cela.ia.scaleX -= 0.1;
   						cela.ia.scaleY -= 0.1;
   					}
   					cela.timeCount1 = cela.time.addEvent({ delay: 200, callback: ()=>{
						cela.ia.setTexture('ia_stop');
					}, loop: true});
        		}, loop: false});
        	}, repeat: 8});
		}
	}

	update() {
		if (this.cursor.down.isDown){	
			this.player.y += 10;
		}
		if (this.cursor.up.isDown && this.press == 0){
			click(this.btn._sprite, this, this.player);
			this.press = 1;
			this.btn._sprite.setTexture('btn_down');
		}
		if (this.cursor.up.isUp){
			if (this.press == 1) {
				this.btn._sprite.setTexture('btn_up');
				unclick(this.btn._sprite, this, this.player)
			}
			this.press = 0;
		}
	}
}

function click (sprite, cela, target) {
	sprite.setTexture('btn_down');
    if ((cela.sun == 0) || (cela.sun == 1) || (cela.sun == 2)){
		target.y -= 5;
		if (this.var == 0){
			this.var = 1;
		}else{
			this.var = 0;
		}
		target.setTexture('kid_run').setFlipX(this.var);
		if (target.scaleX < 0.90){
 			target.scaleX += 0.1;
			target.scaleY += 0.1;
		}
	}else{
		target.setTint(0x00ffff);
	}
	if (typeof cela.timeCount !== 'undefined') {
		cela.timeCount.remove(false);
	}
}

function unclick (sprite, cela, target) {
	sprite.setTexture('btn_up');
	if (target.scaleX > 0.75){
   		target.scaleX -= 0.1;
   		target.scaleY -= 0.1;
   	}
   	
   	cela.timeCount = cela.time.addEvent({ delay: 200, callback: ()=>{
		target.setTexture('kid_stop');
	}, loop: true});

}