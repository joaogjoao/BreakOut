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

	var ballVelocity = -300
	var brickValue = 30
	var ninjaValue = 50

	var goodRate = 60
	var badRate = 70
	var vidasRate = 70
	var fase = 1


	var pauser
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

	var scoreBase
	var scoreBase1
	var nextFire = 0;
	var fireRate = 200;
	var rest
	var fire
	var scoreText;
	var livesText;
	var introText;
	var bulText;


	function preload() {
		game.load.image('background', 'assets/background.jpeg')
		game.load.image('scor', 'assets/score.png')
		game.load.image('vid', 'assets/vid.png')
		game.load.image('paddle', 'assets/paddle.png')
		game.load.image('paddleF', 'assets/paddleF.png')
		game.load.spritesheet('ball', 'assets/ball.png', 16, 16)
		game.load.spritesheet('bricks', 'assets/bricks.png', 38, 19)
		game.load.spritesheet('bonus', 'assets/bonus.png', 32, 32)
		game.load.spritesheet('coin', 'assets/coin.png', 88, 90)
		game.load.spritesheet('ninja', 'assets/ninja.png', 72, 72)
		game.load.spritesheet('ninjab', 'assets/ninjabranco.png', 72, 72)
		game.load.image('shuriken', 'assets/shuriken.png')
		game.load.image('shot', 'assets/shot.png')
		game.load.image('vida', 'assets/vida.png')
		game.load.image('health', 'assets/health.png')
		game.load.image('ninjaMorto', 'assets/ninjaAmarelo.png')
		

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
		background = game.add.sprite(0, 0, 'background')
		background.scale.x = game.width / background.width
		background.scale.y = game.height / background.height

		//---------------------------------------MAPA-------
		var mapas = [
			//[1, 6, 2, 3, 4, 5, 6, 1, 2, 3, 0, 4, 5, 2, 2, 2, 3],
		//	[1, 2, 3, 4, 5, 6, 1, 2, 3, 0, 0, 4, 5, 2, 2, 2, 3],
			//[1, 2, 3, 4, 5, 6, 1, 2, 3, 0, 0, 4, 5, 2, 2, 2, 3],
			//[1, 3, 2, 2, 3, 4, 5, 6, 1, 2, 3, 0],
			[1, 2, 3, 4, 5, 6, 1, 2, 4],
			[1, 2, 3, 4, 5, 6, 1, 2, 4],
			[0, 0, 0, 0, 0, 2, 2, 5, 4],
			[1, 2, 3, 4, 5, 6, 1, 2, 4],
			[1, 2, 3, 4, 5, 6, 1, 2, 4],
			[1, 2, 3, 4, 5, 6, 1, 2, 4],
			//[1, 2, 3, 4, 5, 6, 1, 2, 3, 0, 0, 4, 5, 2, 2, 2, 3],
			//[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]


		var numero = getMapaElements(mapas)
		groupBricks = game.add.group()
		groupBricks.enableBody = true
		groupBricks.physicsBodyType = Phaser.Physics.ARCADE
		createCoin()

		createMap(mapas)
		createPaddle()
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

		fire = game.input.keyboard.addKey(Phaser.Keyboard.L)
		pauser = game.input.keyboard.addKey(Phaser.Keyboard.P)

		//-----------------------------------------NINJA

		ninja = game.add.group()
		ninja.enableBody = true
		ninja.physicsBodyType = Phaser.Physics.ARCADE

		ninja2 = game.add.group()
		ninja2.enableBody = true
		ninja2.physicsBodyType = Phaser.Physics.ARCADE



		var fullScreenButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
		rest = game.input.keyboard.addKey(Phaser.Keyboard.R)
		fullScreenButton.onDown.add(toggleFullScreen)
	}


	//---------------------------------------------------------------------------------------------------------------//

	function update() {
		if (!gameOvers) {
			paddle.x = game.input.x;
			if (ball.y > game.height - 16) {
				ballLost()
			}

			if (paddle.x < 24) {
				paddle.x = 24;
			} else if (paddle.x > game.width - 24) {
				paddle.x = game.width - 24;
			}

			if (ballOnPaddle) {
				ball.body.x = paddle.x;
			} else {
				game.physics.arcade.collide(bonus, paddle, getBonus, null, this);
				game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
				game.physics.arcade.collide(ninja2, paddle, ninjaPaddle, null, this);
				game.physics.arcade.collide(health, paddle, healthPaddle, null, this);
				game.physics.arcade.collide(coins, paddle, coinsPaddle, null, this);
				game.physics.arcade.overlap(ball, ninja2, ballHitNinja, null, this);
				game.physics.arcade.collide(ball, groupBricks, ballHitBrick, null, this);
				game.physics.arcade.collide(bullets, groupBricks, bulletHitBrick, null, this);
				game.physics.arcade.collide(shurikens, paddle, shurikenPaddle, null, this);
			}
			fireBullet()
			pauserr()
			if (bn == 0) {
				paddle.loadTexture('paddle')
				bulText.visible = false
			}
		} else {
			resta()
		}
	}

	//---------------------------------------------------------------------------------------------------------------//

function pauserr() {
	if (pauser.isDown) {
		game.paused = !game.paused
		console.log(game.paused)
	}
}
	function createHUD() {
		scoreBase = game.add.sprite(23, 23, 'scor');
		scoreBase.alpha = 0.7
		scoreBase.scale.setTo(2.9);
		scoreBase1 = game.add.sprite(770, 20, 'vid');
		scoreBase1.scale.setTo(2.2);
		scoreBase1.alpha = 0.7


		scoreText = game.add.text(32, 30, 'SCORE: 0', {
			font: "28px Calibri",
			fill: "#ffffff",
			align: "left"
		});
		livesText = game.add.text(780, 30, 'VIDAS', {
			font: "28px Calibri",
			fill: "#ffffff",
			align: "left"
		});
		introText = game.add.text(game.world.centerX, 400, 'CLIQUE PARA COMEÇAR', {
			font: "30px Calibri",
			fill: "#ffffff",
			align: "center"
		});
		introText.anchor.setTo(0.5, 0.5);
		
		bulText = game.add.text(game.world.centerX, paddle.body.y + 50, 'TIROS: 30', {
			font: "28px Calibri",
			fill: "#ffffff",
			align: "left"
		});
	
		bulText.anchor.setTo(0.5,0.5)
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

		game.physics.enable(ball, Phaser.Physics.ARCADE);

		ball.body.collideWorldBounds = true;
		ball.body.bounce.set(1);

		ball.animations.add('spin', [4, 3, 1, 0, 2], 30, true);

		ball.events.onOutOfBounds.add(ballLost, this);
	}

	function createCoin() {
		coins = game.add.sprite(300, 50, 'coin', 0);
		coins.anchor.setTo(0.5, 0.5);

		game.physics.enable(coins, Phaser.Physics.ARCADE);

		coins.scale.setTo(0.3, 0.3)
		coins.animations.add('spinCoin', [0, 1, 2, 3, 4, 5], 30, true);
		coins.animations.play('spinCoin')
		coins.body.gravity.y = 200;
		coins.lifespan = 9000


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
		var ninja1 = ninja.create(game.world.centerX, 50, 'ninjab', 0);
		ninja1.anchor.setTo(0.5, 0.5);
		ninja1.scale.setTo(0.5)
		ninja1.body.bounce.y = 0.8;
		ninja1.body.gravity.y = 200;
		ninja1.animations.add('ninjab', [0, 1, 2, 3, 4], 50, true);
		ninja1.animations.play('ninjab')
		ninja1.lifespan = 9000
		fireShuriken(ninja1.x, ninja1.y)
		game.debug.body(ninja1, 'red', false);

		game.time.events.add(Phaser.Timer.SECOND * 2, function() {
			if (ninja1) {
				fireShuriken(ninja1.x, ninja1.y)
			}
		}, this);
		game.time.events.add(Phaser.Timer.SECOND * 4, function() {
			if (ninja1) {
				fireShuriken(ninja1.x, ninja1.y)
			}
		}, this);
		game.time.events.add(Phaser.Timer.SECOND * 6, function() {
			if (ninja1) {
				fireShuriken(ninja1.x, ninja1.y)
			}
		}, this);
		game.time.events.add(Phaser.Timer.SECOND * 8, function() {
			if (ninja1) {
				fireShuriken(ninja1.x, ninja1.y)
			}
		}, this);



		game.add.tween(ninja1)
			.to({
				x: game.width - 50,
				y: 50
			}, game.width * 2)
			.to({
				x: 50,
				y: 50
			}, game.width * 4)
			.to({
				x: game.world.centerX,
				y: 50
			}, game.width * 2)
			.loop(-1)
			.start()
	}

	function ninjaAmareloCreate() {
		var ninja1 = ninja2.create(game.world.centerX, 50, 'ninja', 0);
		ninja1.anchor.setTo(0.5, 0.5);
		ninja1.scale.setTo(0.5)
		ninja1.body.bounce.y = 0.8;
		ninja1.animations.add('ninja', [0, 1, 2, 3, 4], 50, true);
		ninja1.animations.play('ninja')
		ninja1.body.gravity.y = 200;
		ninja1.lifespan = 9000

	}


	function ballHitNinja(_ball, _ninja) {
		//_ninja.body
		//_ninja.loadTexture('ninjaMorto')
		_ninja.kill()
		var jText = game.add.text(_ninja.body.x, _ninja.body.y, "+"+ninjaValue, {
			font: "20px Calibri",
			fill: "#ffffff",
			align: "center"
		});		
		game.time.events.add(Phaser.Timer.SECOND , function() {jText.visible = false}, this);		
		score += ninjaValue
		scoreText.text = 'SCORE: ' + score;
	}

	function fireShuriken(lx, ly) {
		var shur = shurikens.getFirstExists(false)
		if (shur) {
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
			create()
		}
	}

	function fireBullet() {
		if (fire.isDown && bn > 0 && !ballOnPaddle) {
			if (game.time.now > nextFire) {
				nextFire = game.time.now + fireRate;
				var bullet = bullets.getFirstExists(false)
				if (bullet) {
					if (bn % 2) {
						bullet.reset(paddle.x + paddle.width / 2, paddle.y)
					} else {
						bullet.reset(paddle.x - paddle.width / 2, paddle.y)
					}

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
		} else {
			game.scale.startFullScreen(false)
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

		if (ballOnPaddle) {
			ballOnPaddle = false;
			ball.body.velocity.y = ballVelocity
			ball.body.velocity.x = -75;
			ball.animations.play('spin');
			introText.visible = false;
		}

	}

	function ninjaPaddle(_paddle, _ninja) {

		lives--;
		var vi = vidas.getFirstExists(true)
		vidas.remove(vi)
		vidas.remove(0)
		_ninja.kill()
		if (lives === 0) {
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
		var jText = game.add.text(_coins.body.x, _coins.body.y, "+100", {
			font: "20px Calibri",
			fill: "#ffffff",
			align: "center"
		});		
		game.time.events.add(Phaser.Timer.SECOND , function() {jText.visible = false}, this);
		_coins.kill()
		score += 100
		scoreText.text = 'SCORE: ' + score;
	}

	function shurikenPaddle(_paddle, _ninja) {

		lives--;
		var vi = vidas.getFirstExists(true)
		vidas.remove(vi)
		vidas.remove(0)
		_ninja.kill()
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
			var v = vidas.create(780 + i * 18 * 1.5, 60, 'vida')
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

		var bonus12 = -1
		if (_brick.frame == 4) { //fogo
			bonus12 = _brick.frame
		} else if (_brick.frame == 3) { //blink
			bonus12 = 7
		} else if ((_brick.frame == 0) && (getRandomArbitrary(0, 100) > vidasRate) && (lives < 3)) { //vidas
			createHealth()
		} else if (_brick.frame == 5) {//aumenta
			bonus12 = _brick.frame
		} else if (_brick.frame == 1) {//ninjaShuriken
			bonus12 = 1
		} else if (_brick.frame == 2) {//ninjaNormal
			bonus12 = 2
		}
		if (!(bonus12 == -1) && !(bonus12 == 1) && !(bonus12 == 2)) {
			var prob = 0
			if (bonus12 == 5 || bonus12 == 4) {
		
				prob = goodRate
			} else {
				prob = badRate
			}
			if (getRandomArbitrary(0, 100) > prob) {
				var bonus1 = bonus.create(_brick.x, _brick.y, 'bonus', bonus12);
				bonus1.body.gravity.y = 200;
			}		
		} else if ((bonus12 == 1) && (getRandomArbitrary(0, 100) > badRate)) {
			ninjaCreate()
		} else if ((bonus12 == 2) && (getRandomArbitrary(0, 100) > badRate)) {
			ninjaAmareloCreate()
		}
			
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
			introText.text = 'FASE: '+ ++fase+'\n Velocidade da Bola Aumentada\nValor dos Blocos Aumentado\nDificuldade Aumentada';


			ballOnPaddle = true;
			ball.body.velocity.set(0);
			ball.x = paddle.x + 16;
			ball.y = paddle.y - 16;
			ball.animations.stop();
			ballVelocity = ballVelocity * 1.2
			brickValue = brickValue + 15
			
			if(goodRate <= 80) {goodRate += 10}
			if(badRate >= 60) {badRate -= 10}
			if(vidasRate <= 80) {vidasRate += 10}
         
			groupBricks.callAll('revive');
			introText.visible = true
	
	}

	function ballHitPaddle(_ball, _paddle) {

		var diff = 0;

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