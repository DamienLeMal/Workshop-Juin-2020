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
		this.load.image('blanc','assets/blanc.png');

	}

	create() {
		this.add.image(-60,-60,'wall').setOrigin(0,0).setScale(1.5);

		new title("title", 360, 300, this);

		new button("violet", 360, 700, "s_soleil", this);
		new button("violet", 360, 900, "s_marelle", this);
		new button("violet", 360, 1100, "s_esquive", this);

		this.cursor = this.input.keyboard.createCursorKeys();
		this.add.text(-450,-200,"1...", {fontFamily: 'myFont'}).setFontSize(64);

		function button(sprite, x, y, target, cela) {
			this._sprite = cela.physics.add.sprite(x,y,sprite).setScale(1.2,0.3);

			this._sprite.setInteractive();
    		this._sprite.on("pointerover",()=>{
    			this._sprite.setTint(0xdddddd);
    			if (typeof this.timer2 !== 'undefined') {
    				this.timer2.remove(false);
    			}
    			this.timer1 = cela.time.addEvent({ delay: 10, callback: ()=>{
    				if (this._sprite.scaleX < 1.3){
            			this._sprite.scaleX += 0.01;
            		}
        		}, loop: true});
        	})
        	this._sprite.on("pointerout",()=>{
        	    this._sprite.setTint(0xffffff);
        	    if (typeof this.timer1 !== 'undefined') {
    				this.timer1.remove(false);
    			}
        	    this.timer2 = cela.time.addEvent({ delay: 10, callback: ()=>{
    				if (this._sprite.scaleX > 1.2){
            			this._sprite.scaleX -= 0.01;
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

