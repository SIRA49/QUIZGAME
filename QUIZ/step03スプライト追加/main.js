enchant();

var textfiled       = "window.png";
var TEXT            = "text.gif";
var MAP  	    = "map0.gif" ;
var PLAYER          = "player.gif";
var BIGDOOR         = "adaa.gif";

//上記の各部品をASSETSにまとめている。
var ASSETS = [
textfiled,MAP,PLAYER,BIGDOOR,TEXT
];
window.onload = function() {
    
    game = new Game(320, 295);
    game.preload(ASSETS);
    game.onload = function() {
        map = new Map(16, 16);
        map.image = game.assets[MAP];
       setupStage(0);

        player = new Sprite(16, 24);
        player.x = 16*10;
        player.y = 10 * 16 + 8;
        player.image = game.assets[PLAYER];
        player.isMoving = false;
        player.direction = 0;
        player.walk = 1;

	//signは○の標識
	sign = new Sprite(32, 32);
        sign.x = 96;
        sign.y = 93;
	sign.scaleX = 1;
	sign.scaleY = 1;
	sign.frame=9;
        sign.image = game.assets[MAP];

	//sign1は×の標識
	sign1 = new Sprite(32, 32);
        sign1.x = 192;
        sign1.y = 93;
	sign1.scaleX = 1;
	sign1.scaleY = 1;
	sign1.frame=10;
        sign1.image = game.assets[MAP];

　　　　//buttonyellowは四角い黄色
	buttonyellow = new Sprite(16, 16);
	buttonyellow.x = 128;
        buttonyellow.y = 156;
	buttonyellow.scaleX = 1;
	buttonyellow.scaleY = 1;
	buttonyellow.frame=10;
        buttonyellow.image = game.assets[MAP];

　　　　//buttonredは四角い赤
	buttonred = new Sprite(16, 16);
	buttonred.x = 193;
        buttonred.y = 30;
	buttonred.scaleX = 1;
	buttonred.scaleY = 1;
	buttonred.frame=11;
        buttonred.image = game.assets[MAP];

        //doorはドア
	door = new Sprite(32,32);
	door.x = 143;
        door.y = -4;
	door.scaleX = 1.5;
	door.scaleY = 1.2;
	door.frame=6;
        door.image = game.assets[BIGDOOR];
	door.open = [13,6];

        //windowは上の青のテキストフィールド
	var window = new Sprite();
        window.image = game.assets[textfiled];
        window.moveTo(15, -24);
        window.width = 290;
        window.height = 120;
	window.scaleX = 1.1;
	window.scaleY = 0.55; 

　　　　//textは右下のテキストフィールド
	var text    = new Sprite();
	text.image = game.assets[TEXT];
        text.moveTo(205, 185);
        text.width = 160;
        text.height = 160;
	text.scaleX = 0.45;
	text.scaleY = 0.20;

	//myLabelは上のテキストフィールドの文字
	var myLabel = new Label(game.score);
	myLabel.font = "16px";
	myLabel.color = "black";
	myLabel.x = 10; 
	myLabel.y = 5; 
	myLabel.scaleX = 1;
	myLabel.scaleY = 1.5;

　　　　//myLabelは右下のテキストフィールドの文字
	var myLabel1 = new Label(game.score);
	myLabel1.font = "16px";
	myLabel1.color = "black";
	myLabel1.x = 260; 
	myLabel1.y = 260;
        
       
	//グループ化を行い、各部品の追加。
        stage = new Group();
        stage.addChild(map);	
        stage.addChild(door);
	stage.addChild(sign);
	stage.addChild(sign1);
	stage.addChild(buttonyellow);
	stage.addChild(buttonred);
	stage.addChild(player);
        game.rootScene.addChild(stage);
        game.rootScene.addChild(window);
	game.rootScene.addChild(text);
	game.rootScene.addChild(myLabel);
	game.rootScene.addChild(myLabel1);



};
    game.start();
};


//マップのデータを４マップ分、格納している
var setupStage = function(stageIndex)  
{ 
    var stage=stageIndex;
    
	if(stage==0){ //stage1
	   //マップの読み込み
	 map.loadData([
	[ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
	[ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ]);
	//collisionDataは、マップの壁を作る。例えば１なら壁だが、０なら壁ではない。
        map.collisionData = [
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
	[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],	 
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

	}else if(stage==1){ //stage2
	map.loadData([
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ]);
        map.collisionData = [
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],	 
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
	}else if(stage==2){ //stage3
	map.loadData([
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ]);
        map.collisionData = [
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],	 
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
	}else if(stage==3){ //stage4
	map.loadData([
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ,0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 9, 9, 9, 9, 9, 9, 9, 3, 0, 0, 3, 9, 9, 9, 9, 9, 9, 9, 3],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ]);
        map.collisionData = [
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],	 
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
	}

};

