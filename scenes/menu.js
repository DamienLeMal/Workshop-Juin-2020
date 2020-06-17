class menu extends Phaser.Scene {
	constructor(){
		super("s_menu");
	}

	init(data) {
		//this.score = data.score;
	}

	preload() {
		this.load.image('blue','assets/blue.jpg');
		this.load.image('title','assets/titre.png');
		this.load.image('wall','assets/mur.png');
		this.load.image('violet','assets/violet.jpg');
		this.load.image('blanc','assets/white_circle.png');

		//Soleil
		this.load.image('btn_up','assets/UI/soleil/btn_soleil_up.png');
		this.load.image('btn_down','assets/UI/soleil/btn_soleil_down.png');
		this.load.image('back_sun','assets/soleil/soleil_background.png');
		this.load.image('kid_run','assets/soleil/soleil_kid_run.png');
		this.load.image('kid_stop','assets/soleil/soleil_kid_stop.png');
		this.load.image('meneur_front','assets/soleil/meneur_front.png');
		this.load.image('meneur_back','assets/soleil/meneur_back.png');
		this.load.image('ia_run','assets/soleil/ia_run.png');
		this.load.image('ia_stop','assets/soleil/ia_stop.png');

		//Marelle
		this.load.image('back_ciel','assets/marelle/marelle_background_sky.png');
		this.load.image('back_ville','assets/marelle/marelle_background_ville.png');
		this.load.image('back_hill1','assets/marelle/marelle_background_hill1.png');
		this.load.image('back_hill2','assets/marelle/marelle_background_hill2.png');
		this.load.image('back_street','assets/marelle/marelle_background_street.png');
		//craie
		this.load.image('ciel','assets/marelle/ciel.png');
		this.load.image('terre','assets/marelle/terre.png');
		this.load.image('red','assets/marelle/rouge.png');
		this.load.image('green','assets/marelle/vert.png');
		this.load.image('both','assets/marelle/deux.png');
		this.load.image('kid_right','assets/marelle/kid_right.png');
		this.load.image('kid_left','assets/marelle/kid_left.png');
		this.load.image('kid_both','assets/marelle/kid_both.png');

		//Esquive
		this.load.image('back_esquive','assets/esquive/esquive_background.png');
		this.load.image('player_esquive','assets/esquive/player_esquive.png');
		this.load.image('esquive_kid1','assets/esquive/esquive_kid1.png');
		this.load.image('esquive_kid2','assets/esquive/esquive_kid2.png');
		this.load.image('esquive_kid3','assets/esquive/esquive_kid3.png');
		this.load.image('goutte','assets/esquive/goutte.png');
		this.load.image('btn_esquive_up','assets/UI/esquive/btn_arrow_up.png');
		this.load.image('btn_esquive_down','assets/UI/esquive/btn_arrow_down.png');

	}

	create() {
		this.add.image(-60,-60,'wall').setOrigin(0,0).setScale(1.5);

		new title("title", 360, 300, this);

		new button("violet", 360, 700, "s_soleil", this, "1, 2, 3, SOLEIL !");
		new button("violet", 360, 900, "s_marelle", this, "MARELLE");
		new button("violet", 360, 1100, "s_esquive", this, "ESQUIVE");

		this.cursor = this.input.keyboard.createCursorKeys();

		function button(sprite, x, y, target, cela, txt) {
			this._sprite = cela.physics.add.sprite(x,y,sprite).setScale(1.2,0.3).setTint(0x000000).setAlpha(0.5);

			this._text = cela.add.text(x,y,"test", {fontFamily: 'myFont', stroke:'#fff', strokeThickness: 10,}).setFontSize(64).setOrigin(0.5).setColor('#f5b342');

			cela.time.addEvent({ delay: 100, callback: ()=>{
				this._text.setText(txt);
        	}, loop: false});

			this._sprite.setInteractive();
    		this._sprite.on("pointerover",()=>{
    			this._sprite.setAlpha(0.6);
    			if (typeof this.timer2 !== 'undefined') {
    				this.timer2.remove(false);
    			}
    			this.timer1 = cela.time.addEvent({ delay: 10, callback: ()=>{
    				if (this._sprite.scaleX < 1.3){
            			this._sprite.scaleX += 0.01;
            			this._text.scaleX += 0.01;
            		}
        		}, loop: true});
        	})
        	this._sprite.on("pointerout",()=>{
        	    this._sprite.setAlpha(0.5);
        	    if (typeof this.timer1 !== 'undefined') {
    				this.timer1.remove(false);
    			}
        	    this.timer2 = cela.time.addEvent({ delay: 10, callback: ()=>{
    				if (this._sprite.scaleX > 1.2){
            			this._sprite.scaleX -= 0.01;
            			this._text.scaleX -= 0.01;
            		}
        		}, loop: true});
        	})
        	this._sprite.on("pointerdown",()=>{
        		this._sprite.setTint(0xcccccc);
        	})
        	this._sprite.on("pointerup",()=>{
        		cela.scene.start(target);
        	})
		}
		function title(sprite, x, y, cela) {
			this._sprite = cela.physics.add.sprite(x,y,sprite);
			this.anim_control = 0;
            
        	cela.time.addEvent({ delay: 220, callback: ()=>{
    			if (this.anim_control == 0){
            		this.anim_control = 1;
            	}else{
            		this.anim_control = 0;
            	}
            	if (this.anim_control == 0) {
					if (typeof this.timer2 !== 'undefined') {
    					this.timer2.remove(false);
    				}
					this.timer1 = cela.time.addEvent({ delay: 10, callback: ()=>{
    					if (this._sprite.scaleX < 1.3){
            				this._sprite.scaleX += 0.004;
            				this._sprite.scaleY += 0.004;
            			}
        			}, loop: true});
				}
				if (this.anim_control == 1) {
					if (typeof this.timer1 !== 'undefined') {
    					this.timer1.remove(false);
    				}
					this.timer2 = cela.time.addEvent({ delay: 10, callback: ()=>{
    					if (this._sprite.scaleX > 1){
            				this._sprite.scaleX -= 0.004;
            				this._sprite.scaleY -= 0.004;
            			}
        			}, loop: true});
				}
        	}, loop: true});
		}
	}

	update() {
		if (this.cursor.down.isDown){
			//this.scene.start("scene_1", {score: this.score});
			this.y += 10;
			this.cam.pan(this.x, this.y, 0);
		}
		if (this.cursor.up.isDown){
			//this.scene.start("scene_2", {score: this.score});
			this.y -= 10;
			this.cam.pan(this.x, this.y, 0);
		}
		if (this.cursor.right.isDown){
			//this.scene.start("scene_1", {score: this.score});
			this.x += 10;
			this.cam.pan(this.x, this.y, 0);
		}
		if (this.cursor.left.isDown){
			//this.scene.start("scene_2", {score: this.score});
			this.x -= 10;
			this.cam.pan(this.x, this.y, 0);
		}
	}
}

