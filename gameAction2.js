var reload = false;
var playing = false;
var w = window.innerWidth;
var h = window.innerHeight;
var w2 = window.innerWidth;
var h2 = window.innerHeight;
var ships;
var score1;
var liveLeft;
var timeRemaining;

var ending;

// Object wall
function wall (id, id2, postion, headTo, furthest) {
    
    this.wallID = id;
    this.wallID2 = id2;
    this.actionWall = null;
    this.wallPos = postion;
    this.headTo = headTo;
    this.furthest = furthest;
}
var wall1;
var wall2;

// Object tank
function tank (pos) {
    
    this.tankID = "#tank";
    this.tankPos = pos;
}
var tankGo;

// Object bullet
var available = true;
function bullet (id, type, speed, y) {
    this.id = id;
    this.type = type;
    this.speed = speed;
    this.yAxis = y;
    this.actionBullet = null;
}
var bulletGo; 

// Object meterorite
function asteroid(id, id2) {
    this.asID = id;
    this.asID2 = id2;
    this.meteAction = null;
}
var asteroids=[];
var timeout;
var asteroid6;

// Gift
function gift(bulletType, appear) {
    this.giftID = "#levelUp";
    this.bulletNo = bulletType;
    this.appear = appear;
}
var Up;
var giftOut;

// Enemy ship 
function enemyShip(enemyID, enemyID2, number) {
    this.EnemyID = enemyID;
    this.EnemyID2 = enemyID2;
    this.number = number;
    this.EnemyAction = null;
    this.position = 0;
    this.currentSide = "left";
    this.mark = "live";
}
var enemyLeft = [];

var shipDisplay = "left";

// Set the size
function my_code(){
    if( w2/h2 >= 2.1) {
       document.getElementById("enemy").style.display = "none";
       document.getElementById("mainC").style.gridTemplateAreas = '"box2 box3" "box2 box3"';
       document.getElementById("time").style.fontSize = "5.5vh";
       document.getElementById("question").style.fontSize = "5.5vh";
       document.getElementById("StartReset").style.fontSize = "5.5vh";
        
        document.getElementById("lose").style.fontSize = "8.5vh";
        document.getElementById("win").style.fontSize = "6vh";
       document.getElementById("giveUp0").style.fontSize = "8.5vh";
        document.getElementById("giveUp").style.fontSize = "8.5vh";
       
//       document.getElementById("turn").style.height = "80%"; 
//        document.getElementById("turn2").style.height = "80%";
//        document.getElementById("turn3").style.height = "80%";
        document.getElementById("tankSide3").style.height = "45%";
        document.getElementById("tankSide2").style.height = "45%";
        document.getElementById("tankSide1").style.height = "45%";
        document.getElementById("tankSide0").style.height = "45%";
        document.getElementById("tankHead").style.height = "50%";
//        document.getElementById("tankHead").style.width = "10%";
        
    } else {
       document.getElementById("enemy").style.display = "flex";
       document.getElementById("mainC").style.gridTemplateAreas = '"box1 box3" "box2 box3"';
    }
}

function changeEnemySizeW() {
    if (w<h) {
        for (i=1; i<6; i++) {
            document.getElementById("as"+i).style.width = "10%";
        }
        document.getElementById("as6").style.width = "60%";
    }
    
    for (i=1; i< 41; i++) {
        document.getElementById("left"+i).style.width = "5%";
    }
}

window.onload=my_code();


// Start the game
document.getElementById("StartReset").onclick = function() {
    
//    window.alert( $(window).height() );
//    window.alert( $(window).width() );
    
    if (reload == true) {
        // reload page
        location.reload();
    }
    else {
        
        w2 = window.innerWidth;
        h2 = window.innerHeight;
        if (w != w2 || h != h2) {
            $('#StartReset').html("Done Resize");
            w = w2;
            h = h2;
            location.reload();
        }
        
        else {    
            if (w/h < 1.7) {
                changeEnemySizeW();
            }
            
            reload = true;
            playing = true;
            dimension();

            // Hide the F11 page
            $("#press").hide();

            // Show the game content
            $("#animation").show();

            // The number of enemy ships
            ships = 40;
            $("#number").html(ships);

            // Make the scoreboard appear
            score1 = 0;
    //        $("#score").html(score1);

            $('#StartReset').html("Reset"); 

            // show the "Lives box"
            liveLeft = 3;
            addHearts();

            // Add the time inside the game
            timeRemaining = 190;
            $("#seconds").html(timeRemaining);
            startCounting();

            //Play music
            $("#song")[0].play();

            // Start the content
            // The wall content
            wall1 = new wall("#wall1", "wall1", 27*w/100, "right", 80*w/100);
            movingWall1(wall1);

            wall2 = new wall("#wall2", "wall2", 70*w/100, "left", 27*w/100);
            movingWall12(wall2);

            // The tank content
            tankGo = new tank(27*w/100);

            // The bullet original content
            bulletGo = new bullet("#bullet1", 1, 3, 90*h/100);

            // The asteroids original content
            var asteroid1 = new asteroid("#as1", "as1");
            asteroids.push(asteroid1);
            movingAsteroids(asteroids[0]);

            // The second asteroid
            timeout = setTimeout(function(){
                if (playing == true) { // Is the game is still on
                    asteroid1 = new asteroid("#as2", "as2");
                    asteroids.push(asteroid1);
                    movingAsteroids(asteroids[1]);
                }
            }, 2000);

            // The third asteroid
            timeout = setTimeout(function(){
                if (playing == true) {
                    asteroid1 = new asteroid("#as3", "as3");
                    asteroids.push(asteroid1);
                    movingAsteroids(asteroids[2]);
                }
            }, 5000);


            Up = new gift(1, false);

            // The first gift out
            giftOut = setTimeout(function(){
                if (playing == true) {
                    Up = new gift(2, true);
                    sendGift(Up);
                }
            }, 60000);
            // The fourth asteroid
            timeout = setTimeout(function(){
                if (playing == true) {
                    $(Up.giftID).hide(); // Hide the gift
                    Up.appear = false;

                    asteroid1 = new asteroid("#as4", "as4");
                    asteroids.push(asteroid1);
                    movingAsteroids(asteroids[3]);
                }
            }, 70000);

            // The second gift out
            giftOut = setTimeout(function(){
                if (playing == true) {
                    Up = new gift(3, true);
                    sendGift(Up);
                }
            }, 130000);
            // The fifth asteroid
            timeout = setTimeout(function(){
                if (playing == true) {
                    $(Up.giftID).hide(); // Hide the gift
                    Up.appear = false;

                    asteroid1 = new asteroid("#as5", "as5");
                    asteroids.push(asteroid1);
                    movingAsteroids(asteroids[4]);
                }
            }, 140000);

            // The enemy ship 
            for (i=1; i<=40; i++) {
                var enemies = new enemyShip("#left"+i, "left"+i, i);
                enemyLeft.push(enemies);
            }
            enemyMovement();
        }
    }
}

// Get the dimension 
function dimension() {
    w = window.innerWidth;
    h = window.innerHeight;
}

// Give the heart image on the health bar
function addHearts() {
    $("#live").empty();
    for(i=0; i<liveLeft ; i++) {
        $("#live").append('<img src="image/game/heart.gif" class="life">');
    }
} 

// Start the counting clock for the game
function startCounting(){
    actionTime = setInterval(function(){
        timeRemaining -= 1;
        $("#seconds").html(timeRemaining);
        if (timeRemaining <= 0) {
            
            ending = "lose";
            gameOver();
        }
    }, 1000);
}

 // Stop the counting clock when the game is end 
function stopCounting() {
    clearInterval(actionTime);
}
 // When the game is over
function gameOver() {
    
    document.getElementById("song").pause();
    playing = false;
    stopCounting();
    clearInterval(wall1.actionWall);
    clearInterval(wall2.actionWall);
    $('#StartReset').html("Start Over"); 
    
    // Stop the bullet motion
    clearInterval(bulletGo.actionBullet);
    $(bulletGo.id).hide();
    
    // Clear all of the timeout
    clearTimeout(timeout);
    clearTimeout(giftOut);
    
    // Stop all the other asteroids
    for (i=0; i<5; i++) {
        if (asteroids[i] != null) {
            clearInterval(asteroids[i].meteAction);
//            $(asteroids[i].asID).hide();
            document.getElementById(asteroids[i].asID2).style.display = "none";
        }
    }
    
    // Stop all the space ships
    for (i=0; i<40; i++) {
        clearInterval(enemyLeft[i].EnemyAction);
        $(enemyLeft[i].EnemyID).hide();
    }
    
    if (ending=="lose") {
        asteroid6 = new asteroid("#as6");
        annihilate(asteroid6);
    } else if (ending=="win"){
        $("#gameContent").hide();
        $(tankGo.tankID).hide();
        setTimeout(function(){ 
//            $("#giveUp0").show(); 
            document.getElementById("giveUp0").style.visibility="visible";
        }, 2000);
        setTimeout(function(){ 
//            $("#giveUp0").hide(); 
            document.getElementById("giveUp0").style.visibility="hidden";
//            $("#giveUp").show(); 
            document.getElementById("giveUp").style.visibility="visible";
        }, 7000);
        setTimeout(function(){ 
//            $("#giveUp").hide();
            document.getElementById("giveUp").style.visibility="hidden";
//            $("#giveUp").fadeIn();
        }, 12000);
        setTimeout(function(){ $("#continue")[0].play(); }, 15000);
        setTimeout(function(){ 
//            $("#win").show(); 
            document.getElementById("win").style.visibility="visible";
        }, 15000);
    }
} 


// End game and the last asteroid destroy everything
function annihilate(meteorite){
    $(meteorite.asID).show();
    var asX = 30*w/100;
    var asY = -50*h/100;
    $(meteorite.asID).css({'left':asX, 'top':asY});
    
     meteorite.meteAction = setInterval(function(){
        asY += 3;
        $(meteorite.asID).css('top', asY);
        if (asY > 20*h/100) {
            clearInterval(meteorite.meteAction);
            $(meteorite.asID).hide();
            $("#kaboom")[0].play();
            $("#gameContent").hide();
//            $("#lose").show();
            document.getElementById("lose").style.visibility = "visible";
            
        }
    }, 10);
}


// The 2 walls automatic movement
function movingWall1(wall){
    
    wall.actionWall = setInterval(function(){
        dimension();
        if (wall.headTo == "right") {
            if ( (wall.wallPos + 1) > 80*w/100) {
                wall.headTo = "left";
            } else {
                wall.wallPos += 1.5;
//                $(wall.wallID).css('left', wall.wallPos);
                document.getElementById(wall.wallID2).style.left = wall.wallPos+"px";
            }
        }
        if (wall.headTo == "left") {
            if ( (wall.wallPos - 1) < 27*w/100) {
                wall.headTo = "right";
            } else {
                wall.wallPos -= 1.5;
//                $(wall.wallID).css('left', wall.wallPos);
                document.getElementById(wall.wallID2).style.left = wall.wallPos+"px";
            }
        }
    }, 10);
}

function movingWall12(wall){
    
    wall.actionWall = setInterval(function(){
        dimension();
        if (wall.headTo == "right") {
            if ( (wall.wallPos + 1) > 70*w/100) {
                wall.headTo = "left";
            } else {
                wall.wallPos += 1.5;
//                $(wall.wallID).css('left', wall.wallPos);
                document.getElementById(wall.wallID2).style.left = wall.wallPos+"px";
            }
        }
        if (wall.headTo == "left") {
            if ( (wall.wallPos - 1) < 25*w/100) {
                wall.headTo = "right";
            } else {
                wall.wallPos -= 1.5;
//                $(wall.wallID).css('left', wall.wallPos);
                document.getElementById(wall.wallID2).style.left = wall.wallPos+"px";
            }
        }
    }, 10);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The keyboard action listener when moving the tank
window.addEventListener('keydown', function (e) {
    
//    dimension();
    // go to the left
    if (e.keyCode == 37 &&
        playing == true) {
        if ( tankGo.tankPos-6 > 27*w/100) {
            tankGo.tankPos -= 6;
            $(tankGo.tankID).css('left', tankGo.tankPos);
        }
        
        // Check if the tank touch the gift
        if (Up.appear == true) {
            checkGift();   
        }
    }
    // go to the right
    if (e.keyCode == 39 &&
        playing == true) {
        if ( tankGo.tankPos+6 < 90*w/100) {
            tankGo.tankPos += 6;
            $(tankGo.tankID).css('left', tankGo.tankPos);
        }
        
        // Check if the tank touch the gift
        if (Up.appear == true) {
            checkGift();   
        }
    }
    
    // Fire gun by pressing space
    if (e.keyCode == 67 &&
        playing == true) {
        if (available==true) {
            available=false;
            bulletGo.yAxis = 90*h/100;
            fire();    
        }
    }
    
    // Full screen by pressing F11
    if (e.keyCode == 122) {
        $("#press").hide();
    }
});



// The touch action listener when moving the tank
function myFunction(event) {
    // go to the left
    var pos = event.touches[0].clientX;
    
    if ( pos > 27*w/100 && pos < 90*w/100) {
        
        tankGo.tankPos = pos;
        $(tankGo.tankID).css('left', tankGo.tankPos);
    }
        
    // Check if the tank touch the gift
    if (Up.appear == true) {
        checkGift();   
    }
}



// Check if the tank touch the gift
function checkGift() {
    if(recthit(tankGo.tankID, Up.giftID)){
            
        available=true;
        clearInterval(bulletGo.actionBullet);
        $(bulletGo.id).hide();
            
        if (Up.bulletNo == 2) {
            bulletGo = new bullet("#bullet"+Up.bulletNo, Up.bulletNo, 6, 90*h/100);
        } else {
            bulletGo = new bullet("#bullet"+Up.bulletNo, Up.bulletNo, 5, 90*h/100);
        }
        $(Up.giftID).hide();
        Up.appear = false;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var elm1 = document.getElementById('gameContent');
var timeout;
var lastTap = 0;
elm1.addEventListener('touchend', function(event) {
    var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
        if (available==true && playing==true) {
            available=false;
            bulletGo.yAxis = 90*h/100;
            fire();    
        }
    } else {
        
    }
    lastTap = currentTime;
});


// The bullet travel through the screen
function fire() {
    $(bulletGo.id).show();
    $(bulletGo.id).css({'left':tankGo.tankPos+10, 'top':bulletGo.yAxis});
    
     bulletGo.actionBullet = setInterval(function(){
        bulletGo.yAxis -= bulletGo.speed;
        $(bulletGo.id).css('top', bulletGo.yAxis);
         
        // Is the bullet hit the first wall
        if (bulletGo.yAxis > 84*h/100 &&
            bulletGo.yAxis < 89*h/100) {
            
            if(recthit(wall1.wallID, bulletGo.id)){
                
                clearInterval(bulletGo.actionBullet);
                $(bulletGo.id).hide("explode", 100);
                setTimeout(function(){ 
                    available=true;
                }, 200);
            }
        }
         
        // Is the bullet hit the second wall
        if (bulletGo.yAxis > 34*h/100 &&
            bulletGo.yAxis < 39*h/100) {
            
            if(recthit(wall2.wallID, bulletGo.id)){
                
                clearInterval(bulletGo.actionBullet);
                $(bulletGo.id).hide("explode", 100);
                setTimeout(function(){ 
                    available=true;
                }, 200);
            }
        }
         
        // Is the bullet hit the enemy
        // First row of enemy
        if (bulletGo.yAxis > 22.5*h/100 &&
            bulletGo.yAxis < 29.5*h/100) {
            
            for (i=30; i<40; i++) {
                display(i);
            }
        }
         
        // Second row of the enemy
        if (bulletGo.yAxis > 15*h/100 &&
            bulletGo.yAxis < 22*h/100) {
            
            for (i=20; i<30; i++) {
                display(i);
            }
        }
         
        // Third row of the enemy
        if (bulletGo.yAxis > 7.5*h/100 &&
            bulletGo.yAxis < 14.5*h/100) {
            
            for (i=10; i<20; i++) {
                display(i);
            }
        }
         
        // Last row of the enemy
        if (bulletGo.yAxis > 0.5*h/100 &&
            bulletGo.yAxis < 7*h/100) {
            
            for (i=0; i<10; i++) {
                display(i);
            }
        }
         

        //Is the bullet out of bound?
        if (bulletGo.yAxis < -7*h/100) {
            available=true;
            clearInterval(bulletGo.actionBullet);
        }
    }, 10);
}

// Check the way of display eneme ships
function display(i) {
    if (enemyLeft[i].mark == "live") {
        
        if (bulletGo.id == "#bullet1" ||
            bulletGo.id == "#bullet2") {
            
            bulletDestroyer1(i);
        } else {
            bulletDestroyer2(i);
        }
                    
        if (enemyLeft[i].mark == "die") {
            ships--;
            $("#number").html(ships);
            
            // Display diffrent picture
            if (shipDisplay == "left") {
                
                shipDisplay = "right";
                document.getElementById("shipleft").style.display = "none";
                document.getElementById("shipright").style.display = "block";
            } else if (shipDisplay == "right") {
                
                shipDisplay = "left";
                document.getElementById("shipright").style.display = "none";
                document.getElementById("shipleft").style.display = "block";
            }
        }
        
        if (ships==0) {
            ending = "win";
            gameOver();
        }
    }
}

// Function for byullet 1 and 2
function bulletDestroyer1(i) {
    if (recthit(bulletGo.id, enemyLeft[i].EnemyID)) {
         
        
        clearInterval(bulletGo.actionBullet);
        $(bulletGo.id).hide();
        available=true;
                    
        clearInterval(enemyLeft[i].EnemyAction);
        $(enemyLeft[i].EnemyID).hide("explode", 200);
        
        enemyLeft[i].mark = "die";
     }
}

// Function for byullet 1 and 2
function bulletDestroyer2(i) {
    if (recthit(bulletGo.id, enemyLeft[i].EnemyID)) {
                    
        clearInterval(enemyLeft[i].EnemyAction);
        $(enemyLeft[i].EnemyID).hide("explode", 200);
        
        enemyLeft[i].mark = "die";
     }
}

// The action for the asteroids
function movingAsteroids(meteorite) {
    $(meteorite.asID).show();
    var asX = Math.floor((Math.random() * 60*w/100) + 27*w/100);
//    var asX = 70*w/100;
    var asY = -10*h/100;
    $(meteorite.asID).css({'left':asX, 'top':asY});
    
     meteorite.meteAction = setInterval(function(){
        asY += Math.floor((Math.random() * 3) + 1);
//        $(meteorite.asID).css('top', asY);
        document.getElementById(meteorite.asID2).style.top = asY+"px";
         
        //Check if the asteroid hit the wall
        if (asY > 75*h/100) { 
         if(recthit(wall1.wallID, meteorite.asID)){
            clearInterval(meteorite.meteAction);
            $(meteorite.asID).hide("explode", 200);
            setTimeout(function(){ 
                movingAsteroids(meteorite);
            }, 2000);
         }
        }
         
        //Check if the asteroid hit us
        if (asY > 85*h/100) { 
         if(recthit(tankGo.tankID, meteorite.asID)){
            available=false;
            $(tankGo.tankID).hide(); 
            setTimeout(function(){ 
                available=true;
                tankGo = new tank(27*w/100);
                $(tankGo.tankID).css('left', 27*w/100);
                $(tankGo.tankID).show(); 
            }, 2000);
             
             // show the "Lives box"
            $("#tankSide"+liveLeft).hide();
            liveLeft -= 1;
            $("#tankSide"+liveLeft).show();
            if (liveLeft == 0) {
                ending = "lose";
                 gameOver();
            }
            addHearts();
         }
        }
         
        //Is the asteroid out of bound?
        if (asY > 90*h/100) {
            clearInterval(meteorite.meteAction);
            $(meteorite.asID).hide();
            movingAsteroids(meteorite);
        }
    }, 10);
}

// The postioning for the gift
function sendGift(gift) {
    $(gift.giftID).show();
    var asX = Math.floor((Math.random() * 60*w/100) + 27*w/100);
    var asY = 92*h/100;
    $(gift.giftID).css({'left':asX, 'top':asY});
}

function enemyMovement(){
    
    var firstPos = 27*w/100;
    enemyLeft[0].position = firstPos;
    $(enemyLeft[0].EnemyID).show();
    $(enemyLeft[0].EnemyID).css({'left':firstPos, 'top':1.5*h/100});
    movingShip(enemyLeft[0]);
    for (i = 1; i<10; i++) {
        firstPos += 5.86*w/100;
        enemyLeft[i].position = firstPos;
        $(enemyLeft[i].EnemyID).show();
        $(enemyLeft[i].EnemyID).css({'left':firstPos, 'top':1.5*h/100});
        movingShip(enemyLeft[i]);
    }
    
    firstPos = 33*w/100;
    enemyLeft[10].position = firstPos;
    $(enemyLeft[10].EnemyID).show();
    $(enemyLeft[10].EnemyID).css({'left':firstPos, 'top':9*h/100});
    movingShip(enemyLeft[10]);
    for (i = 11; i<20; i++) {
        firstPos += 5.86*w/100;
        enemyLeft[i].position = firstPos;
        $(enemyLeft[i].EnemyID).show();
        $(enemyLeft[i].EnemyID).css({'left':firstPos, 'top':9*h/100});
        movingShip(enemyLeft[i]);
    }
      
    firstPos = 27*w/100;
    enemyLeft[20].position = firstPos;
    $(enemyLeft[20].EnemyID).show();
    $(enemyLeft[20].EnemyID).css({'left':firstPos, 'top':16.5*h/100});
    movingShip(enemyLeft[20]);
    for (i = 21; i<30; i++) {
        firstPos += 5.86*w/100;
        enemyLeft[i].position = firstPos;
        $(enemyLeft[i].EnemyID).show();
        $(enemyLeft[i].EnemyID).css({'left':firstPos, 'top':16.5*h/100});
        movingShip(enemyLeft[i]);
    }
    
    firstPos = 33*w/100;
    enemyLeft[30].position = firstPos;
    $(enemyLeft[30].EnemyID).show();
    $(enemyLeft[30].EnemyID).css({'left':firstPos, 'top':24*h/100});
    movingShip(enemyLeft[30]);
    for (i = 31; i<40; i++) {
        firstPos += 5.86*w/100;
        enemyLeft[i].position = firstPos;
        $(enemyLeft[i].EnemyID).show();
        $(enemyLeft[i].EnemyID).css({'left':firstPos, 'top':24*h/100});
        movingShip(enemyLeft[i]);
    }
}

// The enemy movement
function movingShip(ship){
    ship.EnemyAction = setInterval(function(){
        if (ship.currentSide == "left") {
            if ( (ship.position + 1) > 87*w/100) {
                ship.currentSide = "right";
            } else {
                ship.position += 1;
//                $(ship.EnemyID).css('left', ship.position);
                document.getElementById(ship.EnemyID2).style.left = ship.position+"px";
            }
        }
        if (ship.currentSide == "right") {
            if ( (ship.position - 1) < 27*w/100) {
                ship.currentSide = "left";
            } else {
                ship.position -= 1;
//                $(ship.EnemyID).css('left', ship.position);
                document.getElementById(ship.EnemyID2).style.left = ship.position+"px";
            }
        }
    }, 10);
}
         
// The original code used to check 2 image toch each other
function recthit(rectone, recttwo){
    
    var r1 = $(rectone);
    var r2 = $(recttwo);
    
    var r1x = r1.offset().left;
    var r1w = r1.width();
    var r1y = r1.offset().top;
    var r1h = r1.height();
    
    var r2x = r2.offset().left;
    var r2w = r2.width();
    var r2y = r2.offset().top;
    var r2h = r2.height();
    
    if( r1y+r1h < r2y ||
        r1y > r2y+r2h ||
        r1x > r2x+r2w ||
        r1x+r1w < r2x ){
        return false;
    }else{
        return true;   
    }
    
}//end function
