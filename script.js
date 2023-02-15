let btnRef=document.querySelectorAll('.btn-opt');
let popupRef=document.querySelector(".popup");
let newgame=document.getElementById("new-game");
let restart=document.getElementById("restart");
let msgRef=document.getElementById("message");

let winningPattern=[
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];

//player 'x' plays first

let xTurn="X";
let count=0;

//Disable All Buttons
const disableButtons=()=>{
    btnRef.forEach((element)=>(element.disabled=true));
};

//enable all buttons (for new game and restart)

const enableButtons=()=>{
    btnRef.forEach((element)=>{
        element.innerText="";
        element.disabled=false;
    });
};

//this function is executed when a player wins
const winFunction=(letter)=>{
    disableButtons();
    if(letter=="X"){
        msgRef.innerHTML="&#x1F389; <br> 'X' wins";
    }else{
        msgRef.innerHTML="&#x1F389; <br> 'O' wins";
    }
};

//function for draw

const drawFunction=()=>{
    disableButtons();
    msgRef.innerHTML="&#x1F60E; <br> it's a draw";
};

//new game
newgame.addEventListener("click",()=>{
    count=0;
    enableButtons();
});
restart.addEventListener("click",()=>{
    count=0;
    enableButtons();
});

//win logic
const winChecker=()=>{
    //loop through all win patterns
    for(let i of winningPattern){
        let [element1,element2,element3]=[
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];
        //check if element are filled
        // if 3 empty elements are same and would give win as would
        if(element1 !="" && (element2 !="") & (element3 !="")){
            if(element1==element2 && element2==element3){
                winFunction(element1);
            }
        }
    }
};

//display the X/O in click

btnRef.forEach((element)=>{
    element.addEventListener('click',()=>{
        if(xTurn=="X"){
            xTurn="O";
            //display x
            element.innerText="X"
            element.disabled=true;
            document.getElementsByClassName("info")[0].innerText="Turn for " +xTurn
        }else{
            xTurn="X";
            //display O
            element.innerText="O";
            element.disabled=true;
            document.getElementsByClassName("info")[0].innerText="Turn for " +xTurn
        }
        count+=1;
        if(count==9){
            drawFunction();
        }
        //check for win in every click
        winChecker();
    });
});
//enable buttons and disabling popup on page load
window.onload=enableButtons;