enchant();
var lock    = false;
var doorsound =false;
var Q1=0,Q2=0,Q3=0,a=0,b=0,re1,re2,re3,score=0;
var aButton = new Array(2);
var quiz1=["日本の国鳥はキジである。○か×か？","日本の国花は桜と菊の２つである。〇か×か？","日本で一番大きな湖は霞ヶ浦である。〇か×か？"];
var answer1=[1,1,2];
var quiz2=["日本で一番長い川は信濃川である。〇か×か？","世界最大の動物は象である。〇か×か？","年齢を重ね目が老化して発症する症状を遠視と呼ぶ。〇か×か？"];
var answer2=[1,2,2];
var quiz3=["海のミルクと呼ぶのは「鯛（タイ）」のことである。〇か×か？","干支の巳（み）の次は未（ひつじ）である。〇か×か？","お寿司屋さんではお茶のことを「あがり」と言う。〇か×か？"];
var answer3=[2,1,1];
var random1 = Math.floor( Math.random() * quiz1.length );
var random2 = Math.floor( Math.random() * quiz2.length );
var random3 = Math.floor( Math.random() * quiz3.length );
var textfiled       = "window.png";
var TEXT            = "text.gif";
var MAP  	    = "map0.gif" ;
var PLAYER          = "player.gif";
var BIGDOOR         = "adaa.gif";
var DOOR            = "自動ドアが開く.mp3";
var ASSETS = [
    DOOR,textfiled,MAP,PLAYER,BIGDOOR,TEXT
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
	
	sign = new Sprite(32, 32);
        sign.x = 96;
        sign.y = 93;
	sign.scaleX = 1;
	sign.scaleY = 1;
	sign.frame=9;
        sign.image = game.assets[MAP];

	sign1 = new Sprite(32, 32);
        sign1.x = 192;
        sign1.y = 93;
	sign1.scaleX = 1;
	sign1.scaleY = 1;
	sign1.frame=10;
        sign1.image = game.assets[MAP];

	buttonyellow = new Sprite(16, 16);
	buttonyellow.x = 128;
        buttonyellow.y = 156;
	buttonyellow.scaleX = 1;
	buttonyellow.scaleY = 1;
	buttonyellow.frame=10;
        buttonyellow.image = game.assets[MAP];

	buttonred = new Sprite(16, 16);
	buttonred.x = 193;
        buttonred.y = 30;
	buttonred.scaleX = 1;
	buttonred.scaleY = 1;
	buttonred.frame=11;
        buttonred.image = game.assets[MAP];
         
	door = new Sprite(32,32);
	door.x = 143;
        door.y = -4;
	door.scaleX = 1.5;
	door.scaleY = 1.2;
	door.frame=6;
        door.image = game.assets[BIGDOOR];
	door.open = [13,6];
        
	var window = new Sprite();
        window.image = game.assets[textfiled];
        window.moveTo(15, -24);
        window.width = 290;
        window.height = 120;
	window.scaleX = 1.1;
	window.scaleY = 0.55; 

	var text    = new Sprite();
	text.image = game.assets[TEXT];
        text.moveTo(205, 185);
        text.width = 160;
        text.height = 160;
	text.scaleX = 0.45;
	text.scaleY = 0.20;
	
	var myLabel = new Label(game.score);
	myLabel.font = "16px";
	myLabel.color = "black";
	myLabel.x = 10; 
	myLabel.y = 5; 
	myLabel.scaleX = 1;
	myLabel.scaleY = 1.5;

	var myLabel1 = new Label(game.score);
	myLabel1.font = "16px";
	myLabel1.color = "black";
	myLabel1.x = 260; 
	myLabel1.y = 260;
        
        player.onenterframe = function() {
            this.frame = this.direction * 3 + this.walk;
            if (this.isMoving) {
                this.moveBy(this.vx, this.vy);
                this.walk = game.frame % 3;
/*
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
*/
                if ((this.vx && this.x % 16 == 0) || (this.vy && (this.y-8) % 16 == 0)) {
                    this.isMoving = false;
                    //this.walk = 1;
                }
            } else {
                this.vx = this.vy = 0;
                //var n = Math.random();
                if (game.input.left) {
                    this.direction = 1;
                    this.vx = -4;
                } else if (game.input.right) {
                    this.direction = 2;
                    this.vx = 4;
                } else if (game.input.up) {
                    this.direction = 3;
                    this.vy = -4;
                } else if (game.input.down) {
                    this.direction = 0;
                    this.vy = 4;
                }
               
                if (this.vx || this.vy) {
                   
                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 8;
                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 8;
                    if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                        this.isMoving = true;
                        
                    }
                }
            }
        };

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


	myLabel.text = "黄色の感圧版を踏んで、問題を見てください";	

        game.rootScene.onenterframe = function(e) {
            var x = Math.min((game.width  - 32) / 2 - player.x, 0);
            var y = Math.min((game.height - 32) / 2 - player.y, 0);
			x = Math.max(game.width,  x + map.width)  - map.width;
			y = Math.max(game.height, y + map.height) - map.height;
          
            stage.x = x;
            stage.y = y;
        };
		player.addEventListener(Event.ENTER_FRAME, function(){
		

			if (player.intersect(sign)){
			if(lock==false){
			myLabel.text = "黄色の感圧版を踏んで、問題を見てください!!!";
			}else if(lock==true){
			myLabel1.text = "〇を選択中";
			myLabel.text = "赤色の感圧版を踏んでください。　　　　　　　　　　　　　　もう一度問題を見る場合黄色の感圧版をもう一度踏んでください。";
				if(b==0){
				Q1=1;
					}else if(b==1){
					Q2=1;
					}else if(b==2){
					Q3=1;
					}	
				}
			}
		if (player.intersect(sign1)){
			if(lock==false){
			myLabel.text = "黄色の感圧版を踏んで、問題を見てください!!!";
			}else if(lock==true){
			myLabel1.text = "×を選択中";
			myLabel.text = "赤色の感圧版を踏んでください。　　　　　　　　　　　　　　もう一度問題を見る場合黄色の感圧版をもう一度踏んでください。";
				if(b==0){
				Q1=2;
					}else if(b==1){
					Q2=2;
					}else if(b==2){
					Q3=2;
					}
				}
			}

		 if (player.intersect(buttonyellow)){
		if(b==0){
		lock=true;
		myLabel.text = quiz1[random1];
			}else if(b==1){
			myLabel.text = quiz2[random2];
			lock=true;
				}else if(b==2){
				myLabel.text = quiz3[random3];
				lock=true;
				}
			}

	door.onenterframe = function(){
		if (player.intersect(buttonred)){
			if((Q1==1||Q1==2)&&a==0){
				this.frame = this.open[0];
				myLabel.text = "次に進もう!!※後戻り不可";
				if(a==0){
				doorsound=true;
				a=1;
				}
			       }
			
			if((Q2==1||Q2==2)&&a==2){
				this.frame = this.open[0];
				myLabel.text = "次に進もう!!※後戻り不可";
				if(a==2){
				doorsound=true;
				a=3;
				}
			       }
			if((Q3==1||Q3==2)&&a==4){
				this.frame = this.open[0];
				myLabel.text = "次に進もう!!※後戻り不可";
				if(a==4){
				doorsound=true;
				a=5;
				}
			       }
			if(a==6){
				this.frame = this.open[0];
				if(a==6){
				doorsound=false;
				a=7;
				}
			       }
		}
		if(doorsound==true){
	game.assets[DOOR].play();
	doorsound=false;
	}
		}






		if (player.intersect(door)){

			if(a==1){
				setupStage(1);
				 player.x = 16*10;
       				 player.y = 12 * 16 + 8;
				myLabel1.text = "";
				myLabel.text = "黄色の感圧版を踏んで、問題を見てください。";
				b=1;
				a=2;
				lock=false;
			door.onenterframe = function(){
				this.frame = this.open[1];
				}	
				if(answer1[random1]==Q1){
				score++;
				re1="正解";
			      	}else{
				re1="不正解";
				}
			      }
					
					if(a==3){
						setupStage(2);
						player.x = 16*10;
      						  player.y = 12 * 16 + 8;
						myLabel1.text = "";
						myLabel.text = "黄色の感圧版を踏んで、問題を見てください。";
						b=2;
						a=4;
						door.onenterframe = function(){
						this.frame = this.open[1];
						}	
						if(answer2[random2]==Q2){
						score++;
						re2="正解";
			      			}else{
						re2="不正解";
						}
				     	      }

							if(a==5){
								setupStage(3);
								player.x = 16*10;
      								  player.y = 12 * 16 + 8;
								myLabel1.text = "";
								myLabel.text = "扉を通り、結果を見よう。";
								b=3;
								a=6;
								stage.removeChild(sign);
								stage.removeChild(sign1);
								stage.removeChild(buttonyellow);
								buttonred.x = 150;
     							        buttonred.y = 210;
								buttonred.scaleX = 0.1;
								buttonred.scaleY = 0.1;
								if(answer3[random3]==Q3){
								score++;
								re3="正解";
			      					}else{
								re3="不正解";
								}
								var result= score.toString();
				     	     		       }
									if(a==7){
									gameOver(re1,re2,re3,score, "クイズ終了!!");		
									}
		}


	});
};
    game.start();
};

var gameOver = function(re1,re2,re3,score, rst) {
    // メッセージ作成
    var msg = "第１問:"+re1+" 第２問:"+re2+ " 第３問:"+re3+" 結果"+score + "point! " + rst;
    game.end();
    alert(msg);
};

var setupStage = function(stageIndex)  //?e?X?e?[?W?2?A?I?}?b?v
{ 
    var stage=stageIndex;
    
	if(stage==0){   //stage1
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

