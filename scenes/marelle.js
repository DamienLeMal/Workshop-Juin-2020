class marelle extends Phaser.Scene {
	constructor(){
		super("s_marelle");
	}

	init(data) {
		this.score = data.score;
	}

	create() {
		this.add.image(0,0,'blue').setOrigin(0,0).setSize(1,1).setScale(20,20);
		this.bloc = this.physics.add.sprite(360,400,'blanc').setScale(0.5,0.5);

		this.failed = 0;
		this.count = 0;
		this.delais = 2000;
		this.text = this.add.text(250,500,"READY ?").setFontSize(64);
		this.timer = this.time.addEvent({ delay: this.delais, callback: ()=>{
			this.timer.timeScale = 1;
			this.timer.delay = this.delais;
			this.rand = Math.floor(Math.random() * Math.floor(3));
			if (this.failed == 0){
				switch (this.rand) {
					case 0: this.text.setText("LEFT !");
							this.bloc.setTint(0xff0000); break;//left
					case 1: this.text.setText("LEFT AND RIGHT !");
							this.bloc.setTint(0x00ff00); break;//both
					case 2: this.text.setText("RIGHT !");
							this.bloc.setTint(0x0000ff); break;//right
				}
				this.failed = 1;
				this.count += 1; //20 ça semble pas mal
				console.log(this.count);
				if (this.delais > 1000) {
					this.delais -= 75;
				}
			}else{
				this.failed = 2;
			}
        }, loop: true});

        this.graphic = this.add.graphics();
		this.cursor = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.graphic.clear();
		this.graphic.fillStyle(0xff0000);
        this.graphic.fillRect(100, 100, 520 - 520 * this.timer.getProgress(), 70);
        if (this.failed != 2) {
        	switch (this.rand) {
				case 0:
					if (this.cursor.left.isDown && this.failed == 1) {
						this.failed = 0;
					}else if (this.cursor.right.isDown){
						this.failed = 2;
					}
					if (this.cursor.left.isUp && this.failed == 0) {
						this.timer.timeScale = 20;
					}
					break;
				case 1:
					if (this.cursor.left.isDown && this.cursor.right.isDown && this.failed == 1) {
						this.failed = 0;
					}
					if (this.cursor.right.isUp && this.failed == 0) {
						this.timer.timeScale = 20;
					}
					break;
				case 2:
					if (this.cursor.right.isDown && this.failed == 1) {
						this.failed = 0;
					}else if (this.cursor.left.isDown){
						this.failed = 2;
					}
					if (this.cursor.right.isUp && this.failed == 0) {
						this.timer.timeScale = 20;
					}
					break;
			}
		}else{
			this.bloc.setTint(0xffffff);
			this.text.setText("GAME OVER");
			this.timer.remove();
		}
	}	
}