// Default, Player ,Player Size TODO
let board;
let boardWidth = 800; //TODO ขนาดบอร์ดตามต้องการ
let boardHeight = 300;
let context;
let playerWidth = 100;
let playerHeight = 100;
let playerX = 50;
let playerY = 215;
let playerImg;
let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
};
//TODO แก้รูปภาพตรง src
playerImg = new Image();
playerImg.src = "https://purepng.com/public/uploads/large/purepng.com-ultimate-spidermanspider-manspidermansuperherocomic-bookmarvel-comicscharacterstan-leegamesmovie-1701528656082srmmz.png";

let gameOver = false;
let score = 0;
let time = 0;
let live = 3;

// Object TODO ขนาดของกล่อง

//TODO แก้รูปภาพสิ่งกรีดขวาง
// Load box images
box1Img = new Image();
box1Img.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f551ed82-19db-4ec0-a41f-8134ef2bebd2/dgd7urs-4f33f8cf-d7e7-4f29-bd92-f90f2efc1fdd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NTFlZDgyLTE5ZGItNGVjMC1hNDFmLTgxMzRlZjJiZWJkMlwvZGdkN3Vycy00ZjMzZjhjZi1kN2U3LTRmMjktYmQ5Mi1mOTBmMmVmYzFmZGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.upyDfFpKWo7wl-0FUvLWMfh3zGQwSCOIej2cXUfCekk"; // box1 image

box2Img = new Image();
box2Img.src = "https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/458402272_1233179891034519_6056900996766621564_n.png?stp=dst-png_p228x119&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeF0VnZjqhG68mVxNofyyQsm-JkWqxz7M1r4mRarHPszWsyAuSKdGON1gcqyuQp3GEMR_ANCcL0nKrFiOqv6HreO&_nc_ohc=C_nvxhv2dSIQ7kNvgHXaunJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&_nc_gid=A5i-g0lwwPV8BKwuf_JINFi&oh=03_Q7cD1QGMVjnaxoR4i5UM0CczjzD_jaVbFKxqQUQj05UavjOvjQ&oe=670BBE3D"; // Replace with another box image link

box3Img = new Image();
box3Img.src = "https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/458425775_1661633998022438_2971869994686058703_n.png?stp=dst-png_s240x240&_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHl6YkDAe2aZz1a0h2-z1Qlv7HXth7qtWG_sde2Huq1YfnG6nNp4rAY1Xb8mdIGxuvn-vRfpgoG3Bkkg3X-dC0N&_nc_ohc=xyWoFkONKqoQ7kNvgHCPY8_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&_nc_gid=Alsozyz9pB2-1LMpDCsHepQ&oh=03_Q7cD1QFgqsiQHOkgwOYtM1NsNA9Qs75268FiwQqeNJaHCzsyEw&oe=670BC039";

// Setting Object
let boxesArray = [];
let boxSpeed = -8; //TODO ความเร็วของกล่อง(สิ่งกรีดขวาง)

// Gravity, Velocity
let VelocityY = 0;
let Gravity = 0.25;

let Retry = document.getElementById("RetryButton");
let RetryDelay = false

console.log(player);
window.onload = function () {
    // Display
    board = document.getElementById("Board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Player
    playerImg.onload = function () {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    };

    // Request animation frame
    requestAnimationFrame(update);

    document.addEventListener("keydown", movePlayer);
    Retry.addEventListener("click", ()=>{
        if(RetryDelay){
        
        }else{
            RetryDelay = true
            setTimeout(() => {
                gameReset()
                RetryDelay=false
                }, 1000);
            }
        }   );

    
    createBoxWithRandomInterval();
};

// Function to create a box at a random time interval
function createBoxWithRandomInterval() {

    if (gameOver) {
        return;
    }

    createBox(); // Create a box

    // Generate a random time between 1 and 3 seconds (1000 to 3000 milliseconds)
    let randomTime = rnd(1000, 2500); //TODO Set เวลา 1000 คือ 1 วิ

    // Use setTimeout instead of setInterval to create boxes at random times
    setTimeout(createBoxWithRandomInterval, randomTime);
}

function rnd(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// Update Function
function update() {
    requestAnimationFrame(update); // Always update animation

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);
    VelocityY += Gravity;

    player.y = Math.min(player.y + VelocityY, playerY);
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);

    for (let index = 0; index < boxesArray.length; index++) {
        let box = boxesArray[index];
        box.x += boxSpeed;
        context.drawImage(box.img, box.x, box.y, box.width, box.height);

        if (onCollision(player, box)) {
            gameOver = true;
            live -= 1;

            context.font = "normal bold 40px Arial"; //TODO Set font กรณีอยากเปลี่ยน Font
            context.textAlign = "center";
            context.fillText("GameOver!", boardWidth / 2, boardHeight / 2);
            context.fillText("Your Score : "+score,boardWidth/2 ,(boardHeight/2)+50);


            setTimeout(() => {
                Retry.style.display = "block";
            }, 500);
        }
    }
    score++;
    time += 0.01;
    context.font = "normal bold 40px Arial";
    context.textAlign = "left";
    context.fillText("Score : " + score, 200, 40); //TODO แก้ว่า Score อยู่ตรงไหน
    context.fillText("Time : " + time.toFixed(0), 20, 40);
    context.fillText("Live Remain : " + live, 20, 80);
    if (time == 60) {
        gameOver = true;
        context.font = "normal bold 40px Arial"; //TODO แก้font + ลบComment
        context.textAlign = "center";
        context.fillText("You Won! With Score :" + score, boardWidth / 2, boardHeight / 2);
        
    }
}

function movePlayer(e) {
    if (gameOver) {
        return;
    }

    if (e.code === "Space" && player.y === playerY) {
        VelocityY = -10;
    }
}

function createBox(e) {
    if (gameOver) {
        return;
    }
    let randomType = rnd(1, 3); // Randomly choose between 1 and 2
    let boxImg, boxWidth, boxHeight, boxSpeed,boxX = 1000,boxY;

    if (randomType === 1) {
        boxImg = box1Img;
        boxWidth = 70;
        boxHeight = 100;
        boxSpeed = -3; // Default speed
        boxY = 200;
    } else if (randomType === 2) {
        boxImg = box2Img;
        boxWidth = 100; // Different size for box2
        boxHeight = 100;
        boxSpeed = -4; // Faster speed for box2
        boxY = 215;
    } else {
        boxImg = box3Img;
        boxWidth = 100; // Different size for box2
        boxHeight = 100;
        boxSpeed = -3; // Faster speed for box2
        boxY = 200;
    }

    let box = {
        img: boxImg,
        x: boxX,
        y: boxY,
        width: boxWidth,
        height: boxHeight,
        speed: boxSpeed
    };

    boxesArray.push(box);

    if (boxesArray.length > 5) {
        boxesArray.shift();
    }
}

function onCollision(obj1, obj2) {
    return obj1.x < (obj2.x + obj2.width) && (obj1.x + obj1.width) > obj2.x // Crash in X move
        && obj1.y < (obj2.y + obj2.height) && (obj1.y + obj1.height) > obj2.y; // Crash in Y move
}

function gameReset() {
    if (!gameOver) {
        return;
    }

    
    if (live > 0) {
        setTimeout(() => {
            gameOver = false;
            Retry.style.display = "block"; // Hide the Retry button
            score = 0;
            time = 0;
            boxesArray = [];
            VelocityY = 0; // Reset gravity effect
            player.y = playerY; // Reset player position

            createBoxWithRandomInterval(); // Restart creating boxes
        }, 500);
        
    }
}

function refreshPage() {
    location.reload(); // This reloads the current page
}