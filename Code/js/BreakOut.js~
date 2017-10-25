	'use strict'

	var game = new Phaser.Game(900, 600, Phaser.CANVAS,
		'game-container', {
			preload: preload,
			create: create,
			update: update,
			render: render
		}
	)


	var ballOnPaddle = true;
	var gameOvers = false;
	var background
	var i

	var ballVelocity = -330
	var brickValue = 30
	var ninjaValue = 50
	var coinValue = 100

	var goodRate = 60
	var badRate = 80
	var vidasRate = 70
	var fase = 1



	var hits
	var coinTador = 0
	var coins
	var ball
	var paddle
	var bullets
	var groupBricks
	var bonus
	var vidas
	var ninja
	var ninja2
	var shurikens
	var health

	var bn = 0
	var lives = 3;
	var score = 0;
	var maiorL
	var faseBase
	var scoreBase
	var scoreBase1
	var nextFire = 0;
	var fireRate = 200;
	var rest
	var fire
	var faseText;
	var scoreText;
	var livesText;
	var introText;
	var bulText;
	var bulArt
	var ballBounce
	var jogaShur
	var shoot
	var punch

	var first = true
	var ninjaB
	var ninjaA
	var bo1
	var bo2
	var bo3
	var bo5
	var introsBase
	var textIntrosBase
	var textIntrosBase1
	var introsBase1
	var autorText


	function preload() {
		game.load.image('background', 'assets/background.jpeg')
		game.load.image('backgroundt', 'assets/backgroundteste.png')
		game.load.image('scor', 'assets/score.png')
		game.load.image('vid', 'assets/vid.png')
		game.load.image('paddle', 'assets/paddle.png')
		game.load.image('paddleF', 'assets/paddleF.png')
		game.load.image('ninjabrm', 'assets/ninjaBranco.png')
		game.load.image('shuriken', 'assets/shuriken.png')
		game.load.image('shot', 'assets/shot.png')
		game.load.image('vida', 'assets/vida.png')
		game.load.image('health', 'assets/health.png')
		game.load.image('ninjaMorto', 'assets/ninjaAmarelo.png')
		game.load.spritesheet('ball', 'assets/ball.png', 16, 16)
		game.load.spritesheet('bricks', 'assets/bricks.png', 38, 19)
		game.load.spritesheet('bonus', 'assets/bonus.png', 32, 32)
		game.load.spritesheet('coin', 'assets/coin.png', 88, 90)
		game.load.spritesheet('ninja', 'assets/ninja.png', 72, 72)
		game.load.spritesheet('hit', 'assets/hit.png', 32, 32)
		game.load.spritesheet('ninjab', 'assets/ninjabranco.png', 72, 72)
		game.load.audio('bounces', 'assets/Audio/ballBounce.mp3')
		game.load.audio('jogaShur', 'assets/Audio/Shuriken.mp3')
		game.load.audio('shoot', 'assets/Audio/blaster.mp3')
		game.load.audio('punch', 'assets/Audio/punch.mp3')


	}


	function create() {
		bn = 0
		lives = 3;
		score = 0;

		ballOnPaddle = true;
		gameOvers = false;
		game.renderer.roundPixels = true
		game.renderer.clearBeforeRender = false
		game.physics.startSystem(Phaser.Physics.ARCADE)
		background = game.add.sprite(0, 0, 'backgroundt')
		background.scale.x = game.width / background.width
		background.scale.y = game.height / background.height

		ballBounce = game.add.audio('bounces')
		shoot = game.add.audio('shoot')
		jogaShur = game.add.audio('jogaShur')
		ballBounce.volume = 0.2
		jogaShur.volume = 0.05
		shoot.volume = 0.05
		punch = game.add.audio('punch')
		punch.volume = 0.35

		document.getElementById("game-container").style.cursor = "default"

		//---------------------------------------MAPA-------
		var mapas = [
			//[1, 6, 2, 3, 4, 5, 6, 1, 2, 3, 0, 4, 5, 2, 2, 2, 3],
			// [1, 2, 3, 4, 5, 6, 1, 2, 3, 0, 0, 4, 5, 2, 2, 2, 3],
			//[0, 0, 0, 1, 2, 3, 4, 5, 6, 1, 2, 3, 0, 0, 4, 5, 2, 2, 2, 3],
			/*			[6, 6, 0, 0, 0, 0, 1, 1, 1, 1, 1],
						[6, 6, 0, 0, 0, 1, 3, 2, 2, 3, 4, 5, 6, 1, 2, 3, 0],
			*/
			[0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
			[6, 6, 6, 0, 1, 2, 3, 4, 5, 6, 6, 6],
			[6, 6, 6, 0, 1, 2, 3, 4, 5, 6, 6, 6],
			[6, 6, 6, 0, 1, 2, 3, 4, 5, 6, 6, 6],
			[6, 6, 6, 0, 1, 2, 3, 4, 5, 6, 6, 6]
			//[0, 1, 2, 3, 4, 5],
			//[0, 1, 2, 3, 4, 5]
			//[1, 2, 3, 4, 5, 6, 1, 2, 4],
			//[1, 2, 2, 2, 2, 2, 2, 2, 4],
			//[1, 2, 3, 4, 5, 6, 1, 2, 3, 0, 0, 4, 5, 2, 2, 2, 3],
			//[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]

		var numero = getMapaElements(mapas)
		groupBricks = game.add.group()
		groupBricks.enableBody = true
		groupBricks.physicsBodyType = Phaser.Physics.ARCADE

		if (first) {

			introsBase = game.add.sprite(310, game.world.centerY - 55, 'vid');
			introsBase.scale.setTo(3.35, 2)
			introsBase.anchor.setTo(0.1, 0.3)
			//introsBase.alpha = 0.7
			introsBase.tint = 0xff0000
			introsBase1 = game.add.sprite(303 + introsBase.width, game.world.centerY - 55, 'vid');
			introsBase1.scale.setTo(3.35, 2)
			introsBase1.anchor.setTo(0.1, 0.3)
			//introsBase1.alpha = 0.7
			introsBase1.tint = 0x00ff00

			textIntrosBase = game.add.text(330, game.world.centerY - 70, 'RUINS', {
				font: "20px Calibri",
				//style: "bold",
				fill: "#ffffff",
				align: "center"
			});

			textIntrosBase1 = game.add.text(323 + introsBase.width, game.world.centerY - 70, 'BONS', {
				font: "20px Calibri",
				//style: "bold",
				fill: "#ffffff",
				align: "center"
			});

			ninjaB = game.add.sprite(310, game.world.centerY - 50, 'ninjab', 0)
			ninjaA = game.add.sprite(360, game.world.centerY - 50, 'ninja', 0)
			ninjaA.scale.setTo(0.5)
			ninjaB.scale.setTo(0.5)
			bo1 = game.add.sprite(410, game.world.centerY - 50, 'bonus', 7)
			bo3 = game.add.sprite(460, game.world.centerY - 50, 'bonus', 5)
			bo5 = game.add.sprite(510, game.world.centerY - 50, 'bonus', 4)
			bo2 = game.add.sprite(560, game.world.centerY - 50, 'health')
			bo2.scale.setTo(0.3)

		}



		createMap(mapas)
		createPaddle()
		fire = game.input.keyboard.addKey(Phaser.Keyboard.L)

		createHUD()

		vidas = game.add.group()
		vidas.enableBody = true
		plotLives()
		createBall()
		game.input.onDown.add(releaseBall, this);

		//-----------------------------------------BONUS

		bonus = game.add.group()
		bonus.enableBody = true
		bonus.physicsBodyType = Phaser.Physics.ARCADE


		//-----------------------------------------NINJA

		bulArt = game.add.group()
		ninja = game.add.group()
		ninja.enableBody = true
		ninja.physicsBodyType = Phaser.Physics.ARCADE

		ninja2 = game.add.group()
		ninja2.enableBody = true
		ninja2.physicsBodyType = Phaser.Physics.ARCADE

		var fullScreenButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
		rest = game.input.keyboard.addKey(Phaser.Keyboard.R)
		fullScreenButton.onDown.add(toggleFullScreen)
		game.sound.setDecodedCallback([ballBounce, jogaShur, shoot, punch], update, this);
		autorText = game.add.text(game.width-7, game.height-9, 'Desenvolvido por João Gris' , {
			font: "18px Calibri",
			//style: "bold",
			fill: "#ffffff",
			align: "center"
		});
		autorText.anchor.setTo(1, 1)

	}


	//---------------------------------------------------------------------------------------------------------------//

	function update() {
		if (!gameOvers) {
			if (ball.y > game.height - 16) {
				ballLost()
			}
			paddle.x = game.input.x;

			if (paddle.x < paddle.width / 2) {
				paddle.x = paddle.width / 2;
			} else if (paddle.x > game.width - paddle.width / 2) {
				paddle.x = game.width - paddle.width / 2;
			}


			if (ballOnPaddle) {
				ball.body.x = paddle.x;
			} else {
				game.physics.arcade.collide(bonus, paddle, getBonus, null, this);
				game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
				game.physics.arcade.collide(ninja2, paddle, ninjaPaddle, null, this);
				game.physics.arcade.collide(ninja, paddle, ninjaPaddle, null, this);
				game.physics.arcade.collide(health, paddle, healthPaddle, null, this);
				game.physics.arcade.collide(coins, paddle, coinsPaddle, null, this);
				game.physics.arcade.overlap(ball, ninja2, ballHitNinja, null, this);
				game.physics.arcade.overlap(ball, ninja, ballHitNinja, null, this);
				game.physics.arcade.overlap(bullets, ninja2, ballHitNinja, null, this);
				game.physics.arcade.overlap(bullets, ninja, ballHitNinja, null, this);
				game.physics.arcade.collide(ball, groupBricks, ballHitBrick, null, this);
				game.physics.arcade.collide(bullets, groupBricks, bulletHitBrick, null, this);
				game.physics.arcade.collide(shurikens, paddle, shurikenPaddle, null, this);
			}
			fireBullet()
			if (bn == 0) {
				paddle.loadTexture('paddle')
				bulText.visible = false
			}
		} else {
			resta()
		}
	}

	//---------------------------------------------------------------------------------------------------------------//


	function createHUD() {
		scoreBase = game.add.sprite(23, 23, 'scor');
		scoreBase.alpha = 0.7
		scoreBase.scale.setTo(3.5, 2.9);
		scoreBase1 = game.add.sprite(770, 20, 'vid');
		scoreBase1.scale.setTo(2.4, 2.2);
		scoreBase1.alpha = 0.7
		faseBase = game.add.sprite(game.world.centerX, 30, 'scor')
		faseBase.scale.setTo(2.4, 2.4);
		faseBase.anchor.setTo(0.5, 0.5)

		faseText = game.add.text(game.world.centerX, 35, 'FASE: ' + fase, {
			font: "28px Calibri",
			//style: "bold",
			fill: "#ffffff",
			align: "center"
		});
		faseText.anchor.setTo(0.5, 0.5)

		scoreText = game.add.text(32, 30, 'SCORE: 0', {
			font: "28px Calibri",
			//style: "bold",
			fill: "#ffffff",
			align: "left"
		});
		livesText = game.add.text(780, 30, 'VIDAS', {
			font: "28px Calibri",
			fill: "#ffffff",
			align: "left"
		});
		introText = game.add.text(game.world.centerX, 350, 'CLIQUE PARA COMEÇAR', {
			font: "45px Calibri",
			fill: "#ffffff",
			align: "center"
		});
		introText.anchor.setTo(0.5, 0.5);

		bulText = game.add.text(10, paddle.body.y + 10, 'TIROS: 30', {
			font: "28px Calibri",
			fill: "#ffffff",
			align: "left"
		});

		bulText.anchor.setTo(0, 0)
		bulText.visible = false
	}


	function createPaddle() {
		paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
		paddle.anchor.setTo(0.5, 0.5);

		game.physics.enable(paddle, Phaser.Physics.ARCADE);

		paddle.body.collideWorldBounds = true;
		paddle.body.bounce.set(1);
		paddle.body.immovable = true;
		paddle.scale.setTo(1.5, 1.5)
	}



	function createBall() {
		ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'ball', 0);
		ball.anchor.setTo(0.5, 0.5);
		ball.checkWorldBounds = true;
		ball.bala = false
		game.physics.enable(ball, Phaser.Physics.ARCADE);

		ball.body.collideWorldBounds = true;
		ball.body.bounce.set(1);

		ball.animations.add('spin', [4, 3, 1, 0, 2], 30, true);

		ball.events.onOutOfBounds.add(ballLost, this);
	}

	function createCoin() {
		var com = (game.width - maiorL * 38) / 2
		console.log(com + "")
		var x = getRandomArbitrary(com, game.width - (game.width - maiorL * 38) / 2)
		coins = game.add.sprite(x, 50, 'coin', 0);
		coins.anchor.setTo(0.5, 0.5);
		coinTador = 0
		game.physics.enable(coins, Phaser.Physics.ARCADE);

		coins.scale.setTo(0.3, 0.3)
		coins.animations.add('spinCoin', [0, 1, 2, 3, 4, 5], 30, true);
		coins.animations.play('spinCoin')
		coins.body.gravity.y = 200;
		coins.lifespan = 9000


	}

	function createHit(x, y) {
		hits = game.add.sprite(x, y, 'hit', 0);
		console.log('pila')
		//hits.anchor.setTo(0.5, 0.5);[]
		punch.play()
		hits.scale.setTo(1)
		hits.animations.add('hits', [2, 1, 0], 30, false);
		hits.animations.play('hits')
		hits.lifespan = 300
	}


	function createBullets() {
		bullets = game.add.group()
		bullets.removeAll()
		bullets.enableBody = true
		bullets.physicsBodyType = Phaser.Physics.ARCADE
		bullets.createMultiple(30, 'shot')
		bullets.setAll('anchor.x', 0.5)
		bullets.setAll('anchor.y', 0.5)
		bn = 30
		bulText.visible = true
		bulText.text = 'TIROS: 30'
		createBulArt()


	}


	function createHealth() {
		health = game.add.sprite(getRandomArbitrary(50, game.width), 50, 'health');
		health.anchor.setTo(0.5, 0.5);

		game.physics.enable(health, Phaser.Physics.ARCADE);


		health.lifespan = 3000
		health.body.immovable = true;
		health.scale.setTo(0.3, 0.3)
		health.body.gravity.y = 250

	}


	function createShurikens() {
		shurikens = game.add.group()
		shurikens.enableBody = true
		shurikens.physicsBodyType = Phaser.Physics.ARCADE
		shurikens.createMultiple(5, 'shuriken')
		shurikens.setAll('anchor.x', 0.5)
		shurikens.setAll('anchor.y', 0.5)

	}



	function createMap(mapa) {
		getMapaElements(mapa)
		mapa.forEach(function(valor, chave) {
			valor.forEach(function(valor2, chave2) {
				if (valor2 < 6) {
					var brick = groupBricks.create((game.width - maiorL * 38) / 2 + (38 * chave2), 70 + (19 * chave), 'bricks', valor2);
					brick.body.bounce.set(1);
					brick.body.immovable = true
				}
			})
		})
	}

	function ninjaCreate() {
		createShurikens()
		var ninja1 = ninja.create(getRandomArbitrary(100,game.width - 100), 50, 'ninjab', 0);
		ninja1.anchor.setTo(0.5, 0.5);
		ninja1.scale.setTo(0.5)
		ninja1.body.bounce.y = 0.8;
		ninja1.branco = true
		ninja1.body.gravity.y = 200;
		ninja1.animations.add('ninjab', [0, 1, 2, 3, 4], 50, true);
		ninja1.animations.play('ninjab')
		ninja1.collidable = true
		game.time.events.add(Phaser.Timer.SECOND * 10, function() {
			if (ninja1.alive) {
				ninja1.timer.destroy()
				ninja1.kill()
			}
		}, this);
		fireShuriken(ninja1.x, ninja1.y)
		ninja1.timer = game.time.create(false);

		//  Set a TimerEvent to occur after 2 seconds
		ninja1.timer.loop(2000, () => fireShuriken(ninja1.x, ninja1.y), this);

		//  Start the timer running - this is important!
		//  It won't start automatically, allowing you to hook it to button events and the like.
		ninja1.timer.start();

		ninja1.tween = game.add.tween(ninja1)
			.to({
				x: game.width - 50,
				y: 50
			}, game.width * 2)
			.to({
				x: 50,
				y: 50
			}, game.width * 4)
			.loop(-1)
			.start()
	}

	function ninjaAmareloCreate() {
		var ninja1 = ninja2.create(getRandomArbitrary((game.width - maiorL * 38) / 2, game.width - (game.width - maiorL * 38) / 2), 50, 'ninja', 0);
		ninja1.anchor.setTo(0.5, 0.5);
		ninja1.scale.setTo(0.5)
		ninja1.branco = false
		ninja1.animations.add('ninja', [0, 1, 2, 3, 4], 50, true);
		ninja1.animations.play('ninja')
		ninja1.collidable = true
		ninja1.body.gravity.y = 150;
		ninja1.lifespan = 9000

	}


	function ballHitNinja(_ball, _ninja) {
		if (!_ninja.collidable) {
			return
		}
		createHit(_ninja.body.x, _ninja.body.y)
		if (_ball.bala) {
			bullets.remove(_ball);
		}
		_ninja.collidable = false

		if (_ninja.branco) {

			_ninja.loadTexture('ninjabrm')
			_ninja.tween.pause()
			_ninja.body.velocity.y = 50
			_ninja.timer.destroy()
		} else {
			_ninja.loadTexture('ninjaMorto')
		}
		//_ninja.kill()
		var jText = game.add.text(_ninja.body.x, _ninja.body.y, "+" + ninjaValue, {
			font: "20px Calibri",
			fill: "#ffffff",
			align: "center"
		});
		game.time.events.add(Phaser.Timer.SECOND, function() {
			jText.destroy()
		}, this);
		score += ninjaValue
		scoreText.text = 'SCORE: ' + score;
	}

	function fireShuriken(lx, ly) {
		var shur = shurikens.getFirstExists(false)
		if (shur) {
			jogaShur.play()
			shur.reset(lx, ly)
			shur.scale.setTo(0.5)
			shur.lifespan = 2000
			shur.rotation = 90 * Math.PI / 180
			game.physics.arcade.velocityFromRotation(
				shur.rotation, 400, shur.body.velocity)
			game.add.tween(shur)
				.to({
					angle: 45
				}, 80)
				.to({
					angle: 0
				}, 80)
				.loop(1)
				.start()
		}
	}


	function resta() {
		if (rest.isDown) {
			gameOvers = false
			ballVelocity = -330
			brickValue = 30
			ninjaValue = 50
			coinValue = 100
			goodRate = 60
			badRate = 80
			vidasRate = 70
			fase = 1


			create()
		}
	}

	function fireBullet() {
		if (game.input.activePointer.leftButton.isDown && bn > 0 && !ballOnPaddle) {
			if (game.time.now > nextFire) {
				nextFire = game.time.now + fireRate;
				var bullet = bullets.getFirstExists(false)
				if (bullet) {
					if (bn % 2) {
						bullet.reset(paddle.x + paddle.width / 2, paddle.y)
					} else {
						bullet.reset(paddle.x - paddle.width / 2, paddle.y)

					}
					var ba = bulArt.getFirstExists(true)
					ba.destroy()
					shoot.play()
					bullet.bala = true
					bullet.rotation = 270 * Math.PI / 180
					game.physics.arcade.velocityFromRotation(
						bullet.rotation, 400, bullet.body.velocity)
					bn--
					bullet.checkWorldBounds = true;
					bullet.events.onOutOfBounds.add(de, this);
					bulText.text = 'TIROS: ' + bn

				}
			}
		}
	}
	var baseTiros
	function createBulArt() {
		bulArt.removeAll()
		bulArt.enableBody = true
		bulArt.physicsBodyType = Phaser.Physics.ARCADE
		bulArt.createMultiple(30, 'shot')
		bulArt.setAll('anchor.x', 0.5)
		bulArt.setAll('anchor.y', 0.5)
		var i = 10

		bulArt.forEach(function(valor2, chave2) {
			valor2.reset(i, paddle.y + 48)
			valor2.rotation = 270 * Math.PI / 180
			console.log(i + '')
			i += 10
		})
	}

	function de() {
		bullets.remove(this)
	}

	function blink() {
		ball.alpha = 0;
		//bullets.alpha = 0;
		bonus.alpha = 0;
		paddle.alpha = 0;
		groupBricks.alpha = 0;
		var b1 = game.add.tween(ball).to({
			alpha: 1
		}, 3000, Phaser.Easing.Linear.None, true, 0, 1, true).loop(1).start();
		var b2 = game.add.tween(paddle).to({
			alpha: 1
		}, 3000, Phaser.Easing.Linear.None, true, 0, 1, true).loop(1).start();
		//game.add.tween(bullets).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true).loop(-1).start();
		var b3 = game.add.tween(groupBricks).to({
			alpha: 1
		}, 3000, Phaser.Easing.Linear.None, true, 0, 1, true).loop(1).start();
		var b4 = game.add.tween(bonus).to({
			alpha: 1
		}, 3000, Phaser.Easing.Linear.None, true, 0, 1, true).loop(1).start();
		game.time.events.add(Phaser.Timer.SECOND * 9, function() {
			b1.pause();
			b2.pause();
			b3.pause();
			b4.pause()
		}, this);

	}

	//---------------------------------------------------------------------------------------------------------------//
	function getMapaElements(mapa) {
		maiorL = 0
		mapa.forEach(function(valor, chave) {
			if (valor.length > maiorL) {
				maiorL = valor.length
			}
		})
	}


	//---------------------------------------------------------------------------------------------------------------//
	function toggleFullScreen() {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
		if (game.scale.isFullScreen) {
			game.scale.stopFullScreen()
			var container = document.getElementById("game-container")
			container.style.cursor = "default"
		} else {
			game.scale.startFullScreen(false)
			var container = document.getElementById("game-container")
			container.style.cursor = "none"
		}
	}



	//---------------------------------------------------------------------------------------------------------------//
	function getBonus(_paddle, _bonus) {

		if (_bonus.frame == 7) {
			blink()
		} else if (_bonus.frame == 4) {
			bolasDefogo(_paddle)
		} else if (_bonus.frame == 5) {
			_paddle.scale.setTo(2, 1.5)
			game.time.events.add(Phaser.Timer.SECOND * 10, function() {
				_paddle.scale.setTo(1.5)
			})
		}
		_bonus.kill();
	}




	function bolasDefogo(_paddle) {
		_paddle.loadTexture('paddleF')
		createBullets()

	}


	//---------------------------------------------------------------------------------------------------------------//

	function releaseBall() {
		if (first) {
			first = false
			
			ninjaB.destroy()
			ninjaA.destroy()
			bo1.destroy()
			bo2.destroy()
			bo3.destroy()
			bo5.destroy()
			textIntrosBase.destroy()
			textIntrosBase1.destroy()
			introsBase.destroy()
			introsBase1.destroy()
		}
		if (ballOnPaddle) {
			ballOnPaddle = false;
			ball.body.velocity.y = ballVelocity
			ball.body.velocity.x = -75;
			introText.visible = false;
		}

	}

	function ninjaPaddle(_paddle, _ninja) {
		if (!_ninja.collidable) {
			_ninja.kill()
			return
		}
		lives--;
		createHit(_ninja.body.x, _ninja.body.y + 20)
		var vi = vidas.getFirstExists(true)
		vidas.remove(vi)
		vidas.remove(0)
		_ninja.kill()
		if (lives == 0) {
			gameOver();
		} else {
			ballOnPaddle = true;

			ball.reset(paddle.body.x + 16, paddle.y - 16);

			ball.animations.stop();
		}

	}

	function healthPaddle(_health, _paddle) {
		_health.kill()
		if (lives < 3) {
			lives++;
		}
		plotLives()
	}

	function coinsPaddle(_coins, _paddle) {
		var jText = game.add.text(_coins.body.x, _coins.body.y, "+" + coinValue, {
			font: "20px Calibri",
			fill: "#ffffff",
			align: "center"
		});
		game.time.events.add(Phaser.Timer.SECOND, function() {
			jText.destroy()
		}, this);
		_coins.kill()
		score += 100
		scoreText.text = 'SCORE: ' + score;
	}

	function shurikenPaddle(_paddle, _shurikens) {

		lives--;
		var vi = vidas.getFirstExists(true)
		console.log(_shurikens.body.x + ' <-x shur y-> ' + _shurikens.body.y)
		createHit(_shurikens.body.x, _shurikens.body.y)
		vidas.remove(vi)
		vidas.remove(0)
		_shurikens.kill()
		if (lives === 0) {
			gameOver();
		} else {
			ballOnPaddle = true;

			ball.reset(paddle.body.x + 16, paddle.y - 16);

			ball.animations.stop();
		}

	}

	function ballLost() {

		lives--;
		var vi = vidas.getFirstExists(true)
		vidas.remove(vi)
		vidas.remove(0)
		if (lives === 0) {
			gameOver();
		} else {
			ballOnPaddle = true;

			ball.reset(paddle.body.x + 16, paddle.y - 16);

			ball.animations.stop();
		}

	}

	function plotLives() {
		vidas.removeAll()
		for (i = 0; i < lives; i++) {
			var v = vidas.create(788 + i * 18 * 1.5, 60, 'vida')
			v.scale.setTo(1.5)
		}
	}

	function gameOver() {

		ball.body.velocity.setTo(0, 0);

		introText.text = 'GAME OVER!\nR pra Reiniciar';
		introText.visible = true;
		gameOvers = true

	}


	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}



	function bulletHitBrick(_bullet, _brick) {

		_brick.kill();
		bullets.remove(_bullet);


		score += brickValue;

		scoreText.text = 'SCORE: ' + score;


		if (groupBricks.countLiving() == 0) {
			recreate()
		}

	}

	function ballHitBrick(_ball, _brick) {
		ballBounce.play()
		var bonus12 = -1
		var x = getRandomArbitrary(0, 100)
		if (_brick.frame == 4) { //fogo
			bonus12 = _brick.frame
		} else if (_brick.frame == 3) { //blink
			bonus12 = 7
		} else if ((_brick.frame == 0) && (getRandomArbitrary(0, 100) > vidasRate) && (lives < 3)) { //vidas
			createHealth()
		} else if (_brick.frame == 5) { //aumenta
			bonus12 = _brick.frame
		} else if (_brick.frame == 1) { //ninjaShuriken
			bonus12 = 1
		} else if (_brick.frame == 2) { //ninjaNormal
			bonus12 = 2
		}

		if (!(bonus12 == -1) && !(bonus12 == 1) && !(bonus12 == 2)) {
			var prob = 0
			if (bonus12 == 5 || bonus12 == 4) {

				prob = goodRate
			} else {
				prob = badRate
			}

			if (x > prob) {
				var bonus1 = bonus.create(_brick.x, _brick.y, 'bonus', bonus12);
				bonus1.body.gravity.y = 200;
			}
		} else if ((bonus12 == 1) && (x > badRate)) {
			ninjaCreate()
		} else if ((bonus12 == 2) && (x > badRate)) {
			ninjaAmareloCreate()
		}
		console.log(x)
		_brick.kill();

		score += brickValue;
		scoreText.text = 'SCORE: ' + score;


		if (groupBricks.countLiving() == 0) {
			recreate()
		}

	}

	function recreate() {
		score += 1000;
		scoreText.text = 'SCORE: ' + score;
		introText.text = 'FASE: ' + ++fase + '\n Velocidade da Bola Aumentada\nValor dos Blocos Aumentado\nDificuldade Aumentada';
		faseText.text = 'FASE: ' + fase
		while (ninja.countLiving() > 0) {
			var valor = ninja.getFirstExists(true)
			valor.timer.destroy()
			valor.destroy()
		}

		ninja.removeAll()
		bonus.removeAll()


		ballOnPaddle = true;
		ball.body.velocity.set(0);
		ball.x = paddle.x + 16;
		ball.y = paddle.y - 16;
		ball.animations.stop();
		ballVelocity = ballVelocity * 1.2
		brickValue = brickValue + 15
		coinValue += 100
		ninjaValue += 20

		if (goodRate <= 80) {
			goodRate += 10
		}
		if (badRate >= 60) {
			badRate -= 10
		}
		if (vidasRate <= 80) {
			vidasRate += 10
		}
		game.time.events.add(Phaser.Timer.SECOND, function() {
			groupBricks.callAll('revive');

		}, this);
		introText.visible = true

	}

	function ballHitPaddle(_ball, _paddle) {
		ballBounce.play()
		var diff = 0;
		if (coinTador++ == 10) {
			createCoin()
		}
		if (_ball.x < _paddle.x) {
			//  Ball is on the left-hand side of the paddle
			diff = _paddle.x - _ball.x;
			_ball.body.velocity.x = (-10 * diff);
		} else if (_ball.x > _paddle.x) {
			//  Ball is on the right-hand side of the paddle
			diff = _ball.x - _paddle.x;
			_ball.body.velocity.x = (10 * diff);
		} else {
			//  Ball is perfectly in the middle
			//  Add a little random X to stop it bouncing straight up!
			_ball.body.velocity.x = 2 + Math.random() * 8;
		}

	}


	function hitBrick(sprite, bullet) {
		if (sprite.alive) {
			sprite.damage(1)
			updateHud()
			createExplosion(bullet.x, bullet.y)
			bullet.kill()
		}
	}


	function render() {
		//game.debug.body(ball, 'red', false);
	}