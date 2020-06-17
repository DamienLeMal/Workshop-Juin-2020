class marelle extends Phaser.Scene {
	constructor(){
		super("s_marelle");
	}

	init(data) {
		this.score = data.score;
	}

	create() {

		this.scrolling = 0;
		this.ciel = this.physics.add.group();
		this.ciel.create(0,0,'back_ciel').setOrigin(0,0);

		this.ville1 = this.physics.add.sprite(0,100,'back_ville').setOrigin(0,0);
		this.ville2 = this.physics.add.sprite(728,100,'back_ville').setOrigin(0,0);

		this.hills1 = this.physics.add.group();

		this.hills1.create(-500,210,'back_hill1').setOrigin(0,0);
		this.hills1.create(914,210,'back_hill1').setOrigin(0,0);
		this.hills1.create(2328,210,'back_hill1').setOrigin(0,0);

		this.hills2 = this.physics.add.group();

		this.hills2.create(0,300,'back_hill2').setOrigin(0,0);
		this.hills2.create(1220,300,'back_hill2').setOrigin(0,0);
		this.hills2.create(2440,300,'back_hill2').setOrigin(0,0);
		this.hills2.create(3660,300,'back_hill2').setOrigin(0,0);


		this.marelle = this.physics.add.group();

		this.marelle.create(0,260,'back_street').setOrigin(0,0);
		this.marelle.create(828,260,'back_street').setOrigin(0,0);
		this.marelle.create(1656,260,'back_street').setOrigin(0,0);
		this.marelle.create(2484,260,'back_street').setOrigin(0,0);
		this.marelle.create(3312,260,'back_street').setOrigin(0,0);
		this.marelle.create(4140,260,'back_street').setOrigin(0,0);
		this.marelle.create(4968,260,'back_street').setOrigin(0,0);
		this.marelle.create(5796,260,'back_street').setOrigin(0,0);

		this.marelle.create(0,260,'back_street').setOrigin(0,0);
		this.marelle.create(828,260,'back_street').setOrigin(0,0);
		this.marelle.create(1656,260,'back_street').setOrigin(0,0);
		this.marelle.create(2484,260,'back_street').setOrigin(0,0);
		this.marelle.create(3312,260,'back_street').setOrigin(0,0);
		this.marelle.create(4140,260,'back_street').setOrigin(0,0);
		this.marelle.create(4968,260,'back_street').setOrigin(0,0);
		this.marelle.create(5796,260,'back_street').setOrigin(0,0);

		this.level = [0, 1];
		for (var i = 0; i < 19; i++) {
		 	this.level.push((Math.floor(Math.pow(10,14)*Math.random()*Math.random())%(3-1+1))+1);
		}
		this.level.push(4);
		this.marelle.create(100, 1000, 'terre');
		this.marelle.create(5480, 1000, 'ciel');
		for (var i = 1; i < 21; i++) {
			switch (this.level[i]) {
				case 1 : this.marelle.create(65 + i * 260, 1000, 'red'); break;
				case 2 : this.marelle.create(65 + i * 260, 1000, 'green'); break;
				case 3 : this.marelle.create(65 + i * 260, 1000, 'both'); break;
			}
		}

		this.player = this.physics.add.sprite(100,780,'kid_both');

		this.physics.add.sprite(360,135,'violet').setScale(1.13,0.16).setTint(0x000000).setAlpha(0.5);
		this.physics.add.sprite(360,135,'violet').setScale(1.2,0.2).setTint(0x000000).setAlpha(0.5);

		this.failed = 0;
		this.count = 0;
		this.bothCheck = 0;
		this.anim = 0;
		this.delais = 2000;
		this.text = this.add.text(360,550,"READY ?", {fontFamily: 'myFont', stroke:'#fff', strokeThickness: 10,}).setFontSize(64).setOrigin(0.5).setColor('#999999');
		this.timer;

		this.timer = this.time.addEvent({ delay: this.delais, callback: ()=>{
			this.timer.remove(false);
			newTimer(this);
			instruction(this);
    	}, loop: true});

        this.graphic = this.add.graphics();
		this.cursor = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.graphic.clear();
		this.graphic.fillStyle(0xbdff96);
        this.graphic.fillRect(100, 100, 520 - 520 * this.timer.getProgress(), 70);
        if (this.failed != 2) {
        	switch (this.level[this.count]) {
				case 1://gauche
					if (this.cursor.left.isDown && this.failed == 1) {
						this.failed = 0;
					}else if (this.cursor.right.isDown){
						this.failed = 2;
					}
					if (this.cursor.left.isUp && this.failed == 0) {
						this.timer.remove(false);
						this.scrolling = 1;
						move(this);
						newTimer(this);
						instruction(this);
					}
					break;
				case 3://both
					if (this.cursor.left.isDown && this.cursor.right.isDown && this.failed == 1) {
						this.failed = 0;
					}
					if (this.cursor.left.isDown || this.cursor.right.isDown) {
						this.bothCheck = 1;
					}
					if (this.cursor.left.isUp && this.cursor.right.isUp && this.failed == 0 && this.bothCheck == 1) {
						this.timer.remove(false);
						this.scrolling = 1;
						move(this);
						newTimer(this);
						instruction(this);
						this.bothCheck = 0;
					}else if (this.cursor.left.isUp && this.cursor.right.isUp && this.bothCheck == 1){
						this.failed = 2;
					}
					break;
				case 2://right
					if (this.cursor.right.isDown && this.failed == 1) {
						this.failed = 0;
					}else if (this.cursor.left.isDown){
						this.failed = 2;
					}
					if (this.cursor.right.isUp && this.failed == 0) {
						this.timer.remove(false);
						this.scrolling = 1;
						move(this);
						newTimer(this);
						instruction(this);
					}
					break;
			}
		}else{
			this.text.setText("GAME OVER").setColor('#000000');
			this.timer.remove();
		}

		if ((this.cursor.left.isDown || this.cursor.right.isDown) && this.anim == 0) {
			if (this.player.scaleX < 1.25){
            	this.player.scaleX += 0.1;
            	this.player.scaleY += 0.1;
            }else{
            	this.anim = 1;
            }
		}else{
			if (this.player.scaleX > 1){
            	this.player.scaleX -= 0.1;
            	this.player.scaleY -= 0.1;
            }
            if (this.cursor.left.isUp && this.cursor.right.isUp) {
            	this.anim = 0;
			}
		}
		if (this.scrolling == 1) {

			this.ville1.x -= 0.6;
			this.ville2.x -= 0.6;

			Phaser.Actions.Call(this.hills1.getChildren(), function(go) {
					go.x -= 3;
			});

			Phaser.Actions.Call(this.hills2.getChildren(), function(go) {
					go.x -= 9;
			});

			Phaser.Actions.Call(this.marelle.getChildren(), function(go) {
					go.x -= 17.4;
			});
		}
	}	
}

function move(cela) {
	//timer qui sert à arrêter le scroll
	cela.timer2 = cela.time.addEvent({ delay: 100, callback: ()=>{
		cela.scrolling = 0;
		cela.timer2.remove(false);
    }, loop: false});
    switch (cela.level[cela.count]) {
    	case 1: cela.player.setTexture('kid_left'); break;
    	case 2: cela.player.setTexture('kid_right'); break;
    	case 3: cela.player.setTexture('kid_both'); break;
    }
}

function instruction(cela) {
	cela.count += 1;
	if (cela.failed == 0){
		switch (cela.level[cela.count]) {
			case 1: cela.text.setText("GAUCHE !").setColor('#f24444'); break;//left
			case 3: cela.text.setText("LES DEUX !").setColor('#f5e187'); break;//both
			case 2: cela.text.setText("DROITE !").setColor('#bdff96'); break;//right
			case 4: cela.text.setText("GAGNE !").setColor('#0000ff');
					cela.timer.remove(false); break;//right
		}
		cela.failed = 1;
		if (cela.delais > 1000) {
			cela.delais -= 75;
		}
	}else{
		cela.failed = 2;
	}
}
function newTimer (cela) {
	cela.timer = cela.time.addEvent({ delay: cela.delais, callback: ()=>{
		cela.failed = 2;
		cela.timer.remove(false);
    }, loop: true});
}