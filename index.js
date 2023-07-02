
const playerInfo = document.querySelector('.playerInfo');
const boxes = document.querySelectorAll('.box');
const newGame = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winigPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 //initialise the game
 function initGame(){
    currentPlayer = "X";
    gameGrid=["","","","","","","","",""];

     //make update on UI
    boxes.forEach((box,index) => {
        box.innerText="";
        boxes[index].style.pointerEvents = "all";

        box.classList=`box box${index+1}`;

    })
    newGame.classList.remove('active');
    playerInfo.innerText=`Current Player - ${currentPlayer}`;

   
    
 }

 initGame();

 function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();

        checkGameOver();
    }
 }

 function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = '0'
    }
    else{
        currentPlayer = 'X';
    }
    playerInfo.innerText = `Current Player - ${currentPlayer}`;
 }

 function checkGameOver(){
    let ans =""
    winigPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){


            if(gameGrid[position[0]] == "X")
                ans ='X';
            else
                ans ='0';


            boxes.forEach((box) =>{
                box.style.pointerEvents="none";
            })
            
            //bg -green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
    });

    if(ans != ""){
        playerInfo.innerText = `Winner Player - ${ans}`;
        newGame.classList.add('active');
        return;
    }

    let Count = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            Count++;
        }
    });

    if (Count === 9) {
        playerInfo.textContent = "Game Tied !";
        newGame.classList.add("active");
    }
    
 }

 boxes.forEach((box , index) => {
    box.addEventListener('click',() =>{
        handleClick(index);
    })
 });

 

 newGame.addEventListener('click', initGame);

