let invGame, gameScreen, invShip;
let levelW, levelH;  //level borders for game
//buttons
let btnStart, btnPause, btnRedGun, btnBlueGun, btnGreenGun, btnOrangeGun, btnSpreadGun;

let pups = [];
let bads = [];
let syncedBads = [];

//sprites
let sprites2, starBG, imgStarBG;
let sprBadR1, sprBadR2, sprBadG1, sprBadG2, sprBadB1, sprBadB2, sprBadBr1, sprBadBr2;
let sprCrim1, sprCrim2, sprCrim3, eye1, eye2, eyeClosed, baseOpen, baseClosed, sprShip1, sprShipF;
//sound related
let slider, oldVolume, newVolume;
let soundEffects = [];
let sPup,sPhaser,sPhaserB,sPhaserG,sPhaserY,sShipDestr,sEnmSpawn,sEnmAtt,sEnmAtt2,sEnmCrimAtt,sEnmDmg,sEnmDestr,sEnmD2,sBaseSpawn;


function preload(){
	//load sprites and sounds (sounds with user names are from Freesound.org)
	sprites2 = loadImage("invaders/assets/sprites/invSprites2.png");
	starBG = loadImage("invaders/assets/sprites/pexels-photo-176851InstaWalli.jpeg");

	soundEffects = [  //array for changevolume method in sketch file.
		sPup = loadSound("invaders/assets/sounds/UI/171527__leszek-szary__menu-click.wav"), 				//00
		sPhaser = loadSound("invaders/assets/sounds/phasers/phaserPulse.mp3"), 								//01
		sPhaserB = loadSound("invaders/assets/sounds/phasers/337660__five-step__metallic.mp3"),				//02 
		sPhaserG = loadSound("invaders/assets/sounds/phasers/159230__noirenex__deepscan.mp3"), 				//03
		sPhaserY = loadSound("invaders/assets/sounds/phasers/82745__sikoses__stm1-some-bass.mp3"),			//04
		sEnmDmg = loadSound("invaders/assets/sounds/alien/117740__donalfonso__kurzschluss.wav"),			//05
		sEnmD2 = loadSound("invaders/assets/sounds/alien/205753__scorpion67890__surge-leech-1.wav"),		//06
		sEnmSpawn = loadSound("invaders/assets/sounds/alien/ambientIntro.wav"),								//07
		sEnmAtt = loadSound("invaders/assets/sounds/alien/163095__fantozzi__ftz-gc-118-phaserattack1.wav"),	//08
		sEnmCrimAtt = loadSound("invaders/assets/sounds/alien/146732__leszek-szary__creature.wav"),			//09
		sEnmAtt2 = loadSound("invaders/assets/sounds/alien/61818__tim-kahn__hard-kick.wav"),				//10
		sEnmDestr = loadSound("invaders/assets/sounds/dmg/350976__cabled-mess__boom-c-01.wav"),				//11
		sShipDestr = loadSound("invaders/assets/sounds/dmg/397702__mrthenoronha__explosion-8-bit.wav"),		//12
		sBaseSpawn = loadSound("invaders/assets/sounds/alien/442825__qubodup__dark-magic-loop.wav")
	];

}

function setup(){
	let c = createCanvas(450,350);
	c.parent('cParent');
	frameRate(60);
	imageMode(CENTER);
	textFont("dosis");

	//sprites
	sprBadR1 = sprites2.get(50,296,128,85);
	sprBadR2 = sprites2.get(200,296,128,85);
	sprBadG1 = sprites2.get(46,46,139,87); 
	sprBadG2 = sprites2.get(196,46,139,87); 
	sprBadB1 = sprites2.get(56,142,120,111);
	sprBadB2 = sprites2.get(205,142,120,111);
	sprBadBr1 = sprites2.get(380,36,127,162);
	sprBadBr2 = sprites2.get(537,36,127,162);
	sprCrim1 = sprites2.get(337,433,132,110);
	sprCrim2 = sprites2.get(337,560,132,110);
	sprCrim3 = sprites2.get(474,508,132,110);
	eye1 = sprites2.get(366,278,150,98);
	eye2 = sprites2.get(535,278,150,98);
	eyeClosed = sprites2.get(535,367,150,98);
	baseOpen = sprites2.get(26,742,317,146);
	baseClosed = sprites2.get(361,742,317,146);
	sprShip1 = sprites2.get(50,450,102,123);
	sprShipF = sprites2.get(200,450,102,123); 
	
 
	//sounds for gun configs
	startLaser.weaponSound = redLaser.weaponSound = sPhaser; 	//soundEffects[1];
	blueLaser.weaponSound = sPhaserB; 							//soundEffects[2];
	greenPulse.weaponSound = sPhaserG; 							//soundEffects[3];
	orangeLaser.weaponSound = sPhaserY;							//soundEffects[4];
	homingMissile.weaponSound = sEnmAtt;						//soundEffects[8];
	spreader.weaponSound = sEnmCrimAtt;							//soundEffects[9];

	//slider for volume and intial volume adjustment
	slider = createSlider(0, 0.1, 0.05, 0.01)
	oldVolume = slider.value();
	newVolume = slider.value();
	slider.parent('volumeSliderContainer');
	changeVolume();


	//initial setup
	levelW = 850;
	levelH = 350;
	invGame = new Game();
	gameScreen = new GameScreen(); 
	btnStart = new Button(btnStart1);  
	btnPause = new Button(btnPause1);  
}	

//movements = {39:bool,37:bool,38:bool,40:bool}
function keyPressed(){
	try{
		if (invShip.movements.hasOwnProperty(keyCode)){
			invShip.movements[keyCode] = true;  
		};
	}
	catch{console.log("there is no spoon");}
}		
function keyReleased(){
	try{
		if (invShip.movements.hasOwnProperty(keyCode)){
			invShip.movements[keyCode] = false;
		}
	}
	catch{console.log("and no ship either");}	
}


function changeVolume(){
	soundEffects.forEach(sound=> {
		sound.setVolume(slider.value());
	});
	//problem children
	sPhaser.setVolume(1/2*slider.value());
	sBaseSpawn.setVolume(3*slider.value());
}


function draw(){
 
	newVolume = slider.value();

	if(newVolume!==oldVolume){
		changeVolume();
	}
	invGame.manageScenes(invShip, gameScreen);
}
