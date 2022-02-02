//DOM elements
const d=document;
const board=d.getElementById("board");
const results=d.getElementById("results");
const winner=d.getElementById("winner");
const replay=d.getElementById("replay");
//Status array
let statusSquare=['','','','','','','','',''];
//Auxiliar variables
let turn=1;
let moves=0;
let gameover=0;
let winOrTie=0;
let winOptions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
board.classList.add('board');



board.addEventListener('click',(e)=>{
    if(e.target.tagName=='DIV'){
        //If the game is not over
        if(gameover==0){
            //If the square is empty is a valid move
            if(statusSquare[e.target.classList[1]]==''){
                moves++;
            }
            
            //if it's the first turn
            if(e.target.innerHTML==''&&turn==1){
                statusSquare[e.target.classList[1]]='X';
                
                renderBoard();
                turn=2;
            }else{
                //If it's the second turn
                if(e.target.innerHTML==''&&turn==2){
                    statusSquare[e.target.classList[1]]='O';
                    renderBoard();
                turn=1;
                }
            }
            //If there's more than five moves verify if there's a winner
            if(moves>=5){
                
                //Verify all the posibilities
                for(let i=0;i<8;i++){
                    if(statusSquare[winOptions[i][1]]!=''){
    
                        let op1=statusSquare[winOptions[i][0]];
                        let op2=statusSquare[winOptions[i][1]];
                        let op3=statusSquare[winOptions[i][2]];
                        //If the winner options are equal there's a winner
                        if((op1==op2)&&(op2==op3)){
                           
                            gameover=1;
                            winOrTie=1;
                            results.style.visibility="visible";
                            winner.innerHTML="Winner: "+statusSquare[winOptions[i][0]];
                           
                        }
                    }
                }
                //If there's no more valid move, the game is over and there's no winner so it is a tie
                if(moves==9&&winOrTie==0){
                    console.log(moves)
                    results.style.visibility="visible";
                    winner.innerHTML="Tie";
                }
            }
        }
       
          
    }
 }
)

//Replay Button
replay.addEventListener("click",(e)=>{
    //Restart the auxiliar variables
    statusSquare=['','','','','','','','',''];
    turn=1;
    moves=0;
    gameover=0;
    winOrTie=0;
    results.style.visibility="hidden";
    renderBoard();
})

//Render Board function
function renderBoard(){
    board.innerHTML='';
    let fragement=d.createDocumentFragment();
    for(let i=0;i<9;i++){
        let square=d.createElement('DIV');
        square.innerHTML=statusSquare[i];
        square.classList.add('square');
        square.classList.add(`${i}`);
        fragement.appendChild(square);
        //Agregar color de fondo al recuadro
        if(square.innerHTML=='X'){
            square.style.backgroundColor="#222";
            square.style.color="#FFF"
        }
        if(square.innerHTML=='O'){
            square.style.backgroundColor="#CCC";
            square.style.color="#000"
        }
    }
    board.appendChild(fragement);
    fragement.innerHTML='';
}

renderBoard();