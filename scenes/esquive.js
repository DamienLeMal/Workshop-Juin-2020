class esquive extends Phaser.Scene {
	constructor(){
		super("s_esquive");
	}

	init(data) {
		this.score = data.score;
	}

	create() {
		this.add.image(0,0,'blue').setOrigin(0,0).setSize(1,1).setScale(20,20);

		this.cursor = this.input.keyboard.createCursorKeys();

		this.n1 = new kids('violet', 120, this, 100);
		this.n2 = new kids('violet', 360, this, 100);
		this.n3 = new kids('violet', 600, this, 100);

		this.saliva = this.physics.add.group();

		this.physics.add.collider(this.n1._sprite,this.n2._sprite);
		this.physics.add.collider(this.n1._sprite,this.n3._sprite);
		this.physics.add.collider(this.n2._sprite,this.n3._sprite);

		function coll(one,two) {
			console.log(one._sprite);
			one.setVelocityX(one._velo*-1);
			two.setVelocityX(-20);
		}

		function kids(sprite, x, cela, velo) {
			this._sprite = cela.physics.add.sprite(x,100,sprite).setVelocityX(velo).setMaxVelocity(velo).setScale(0.1,0.1).setCollideWorldBounds(true).setBounce(1);
			this._velo = velo;
			this._rand = 2000*Math.random()+1000;
			cela.time.addEvent({ delay: this._rand, callback: ()=>{
				this._velo = this._sprite.body.velocity.x;
				this._sprite.setVelocityX(0);
				cela.time.addEvent({delay: 200, callback : ()=>{
					this._sprite.setVelocityX(this._velo);
				}, loop: false});
				this._rand = 2000*Math.random()+1000;
				cela.saliva.create(this._sprite.x,this._sprite.y,'blanc').setVelocityY(200).setScale(0.1,0.2);
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

