/*
 * File Name: game.js
 * 
 * Description:
 * This is a math-based game where the player selects numbers from a grid, and the objective 
 * is to correctly perform an operation (addition or multiplication) to match a target result.
 * 
 * @package MathGame Gridmaster
 * @authors Trevor Cross, John Nealon (jnealon0805@gmail.com)
 * @license 
 * @version 1.0.0
 * @link 
 * @since 
 * 
 * Usage:
 * This file should be placed in the root directory of the application. It can be directly
 * accessed via the URL [Your Application's URL]. No modifications are necessary for basic
 * operation, but customization can be done by editing the configuration settings within.
 * 
 * Modifications:
 * [Date] - [Your Name] - Version [New Version Number] - [Description of Changes]
 * 
 * 
 * Notes:
 * - Additional notes or special instructions can be added here.
 * - Remember to update the version number and modification log with each change.
 * 
 * TODO:
 * - List any pending tasks or improvements that are planned for future updates.

 */

var boardNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];  
var available = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];  
var buttonsClicked = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 
var availableButtons = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var n = [0,0,0,0];  
var correctNum = 0; 
var correctNumSet = 0;
var numButChosen = 0; 
var buttonId = [0,0,0,0,0,0,0,0]; 
var c = 0;  
var sec = 0;  
var highSec = 100000000000; 
var mathType = 0; 
var numUsed = 4;  

setProperty("mathChange", "background-color", "green");

//working
function setBoard() {
  for(var x = 0; x < 16; x++) {
    boardNumbers[x] = randomNumber(1,9);
    console.log("Number " + x + " is " + boardNumbers[x]);
    setText("boardNum" + x, boardNumbers[x]);
  }
  for(var y = 0; y < 16; y++) {
    available[y] = boardNumbers[y];
//  console.log("available[" + i + "] = " + available[i])
  }
  console.log("Math Type = " + mathType);
  questionNum();
}

//working
function questionNum() {
  var q = 0;
  correctNum = correctNumSet;
  c = 0;
  console.log("|| c is equal to " + c);
  for(var t = 0; t < 16; t++) {
    console.log("availableButtons[" + t + "] = " + availableButtons[t]);
    if(availableButtons[t] == 1) {
      available[q] = boardNumbers[t];
      console.log("available[" + q + "] = " + available[q]);
      q++;
      c++;
      console.log("c is equal to " + c);
    }
  }
  console.log("|| c = " + c);
  for(var i = 0; i < numUsed; i++) {
    if(c > 0) {
      var r = randomNumber(0,c-1);
      n[i] = available[r];
      if(mathType == 0) {
        correctNum = correctNum + n[i];
      }
      if(mathType == 1) {
        correctNum = correctNum * n[i];
      }
      console.log("/-/ r = " + r + " | n[" + i + "] = " + n[i] + " | c = " + c);
      c--;
      for(var v = r; v < 16; v++) {
        available[v] = available[v+1];
        console.log("available[" + v +"] = " + available[v]);
      }
    }
  }
  setText("numGet", correctNum);
}

//working
function selectButtons(v) {
  buttonId[numButChosen] = v;
  console.log("Button Id: " + buttonId[numButChosen]);
  console.log("Button Number: " + numButChosen);
  var displayNum = mathType;
  if(mathType == 0) {
    for(var i = 0; i < 8; i++) {
      displayNum = displayNum + buttonId[i];
    }
  }
  if(mathType == 1) {
    for(var i = 0; i < 8; i++) {
      displayNum = displayNum * buttonId[i];
    }
  }
  console.log("Your current Number is " + displayNum);
  numButChosen++;
  testCorrect();
}

//working
function removeButtons() {
  for(var i = 0; i < 8; i++) {
    buttonId[i] = 0;
  }
  for(var x = 0; x < 16; x++) {
    if(availableButtons[x] == 1 && buttonsClicked[x] == 0) {
      setProperty("boardNum" + x, "background-color", rgb(0,0,0,1));
      buttonsClicked[x] = 1;
      numButChosen = 0;
    }
  }
  console.log("Removing");
}

//working
function testCorrect() {
  if(mathType == 0) {
    console.log("Your num is " + (buttonId[0]+buttonId[1]+buttonId[2]+buttonId[3]+buttonId[4]+buttonId[5]+buttonId[6]+buttonId[7]));
    if(buttonId[0]+buttonId[1]+buttonId[2]+buttonId[3]+buttonId[4]+buttonId[5]+buttonId[6]+buttonId[7] == correctNum){
      for(var i=0; i < 8; i++) {
        buttonId[i] = 0;
      }
      for(var x=0; x < 16; x++) {
        console.log("Button" + x + " availability = " + buttonsClicked[x]);
      }
      numButChosen = 0;
      clearNums();
      win();
    }
  }
  if(mathType == 1) {
    var displayNum = 1;
    for(var i = 0; i < numButChosen; i++) {
      displayNum = displayNum * buttonId[i];
    }
    console.log("Your num is " + displayNum);
    if(displayNum == correctNum){
      for(var i=0; i < 8; i++) {
        buttonId[i] = 0;
      }
      for(var x=0; x < 16; x++) {
        console.log("Button" + x + " availability = " + buttonsClicked[x]);
      }
      numButChosen = 0;
      clearNums();
      win();
    }
  }
}

//working
function clearNums() {
  for(var x = 0; x < 16; x++) {
    if(buttonsClicked[x] == 0) {
      hideElement("boardNum" + x);
      availableButtons[x] = 0;
      available[x] = 0;
    }
  }
  console.log("availableButtons = " + availableButtons[0] + ", " + availableButtons[1] + ", " + availableButtons[2] + ", " + availableButtons[3] + ", " + availableButtons[4] + ", " + availableButtons[5] + ", " + availableButtons[6] + ", " + availableButtons[7] + ", " + availableButtons[8] + ", " + availableButtons[9] + ", " + availableButtons[10] + ", " + availableButtons[11] + ", " + availableButtons[12] + ", " + availableButtons[13] + ", " + availableButtons[14] + ", " + availableButtons[15]);
}

//working
function win() {
  var i = 0;
  for(var x = 0; x < 16; x++) {
    i = i + availableButtons[x];
  }
  if(i == 0) {
    setScreen("winScreen");

    console.log("Score is " + sec);
    setText("yourScore", "Your Score: " + sec);
    if(sec < highSec) {
      highSec = sec;
      setText("highScore", "High Score: " + highSec);
    }
  } else {
    questionNum();
  }
}

//working
function time() {
  timedLoop(1000, function() {
    sec++;
    setText("timer", sec);
  });
}

function playAgain() {
  setScreen("playingScreen");
  boardNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];  
  available = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];  
  buttonsClicked = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 
  availableButtons = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 
  n = [0,0,0,0];  
  correctNum = 0; 
  numButChosen = 0; 
  buttonId = [0,0,0,0,0,0,0,0]; 
  c = 0;  
  sec = 0;
  for(var i = 0; i < 16; i++) {
    showElement("boardNum" + i);
    setProperty("boardNum" + i, "background-color", rgb(0,0,0,1));
  }
  setBoard();
}

//all onEvents working
onEvent("boardNum0", "click", function(){
  if(buttonsClicked[0] == 1) {
    console.log("Setting button0 availability to 0");
    buttonsClicked[0] = 0;
    selectButtons(boardNumbers[0]);
    setProperty("boardNum0", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum1", "click", function(){
  if(buttonsClicked[1] == 1) {
    console.log("Setting button1 availability to 0");
    buttonsClicked[1] = 0;
    selectButtons(boardNumbers[1]);
    setProperty("boardNum1", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum2", "click", function(){
  if(buttonsClicked[2] == 1) {
    console.log("Setting button2 availability to 0");
    buttonsClicked[2] = 0;
    selectButtons(boardNumbers[2]);
    setProperty("boardNum2", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum3", "click", function(){
  if(buttonsClicked[3] == 1) {
    console.log("Setting button3 availability to 0");
    buttonsClicked[3] = 0;
    selectButtons(boardNumbers[3]);
    setProperty("boardNum3", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum4", "click", function(){
  if(buttonsClicked[4] == 1) {
    console.log("Setting button4 availability to 0");
    buttonsClicked[4] = 0;
    selectButtons(boardNumbers[4]);
    setProperty("boardNum4", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum5", "click", function(){
  if(buttonsClicked[5] == 1) {
    console.log("Setting button5 availability to 0");
    buttonsClicked[5] = 0;
    selectButtons(boardNumbers[5]);
    setProperty("boardNum5", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum6", "click", function(){
  if(buttonsClicked[6] == 1) {
    console.log("Setting button6 availability to 0");
    buttonsClicked[6] = 0;
    selectButtons(boardNumbers[6]);
    setProperty("boardNum6", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum7", "click", function(){
  if(buttonsClicked[7] == 1) {
    console.log("Setting button7 availability to 0");
    buttonsClicked[7] = 0;
    selectButtons(boardNumbers[7]);
    setProperty("boardNum7", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum8", "click", function(){
  if(buttonsClicked[8] == 1) {
    console.log("Setting button8 availability to 0");
    buttonsClicked[8] = 0;
    selectButtons(boardNumbers[8]);
    setProperty("boardNum8", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum9", "click", function(){
  if(buttonsClicked[9] == 1) {
    console.log("Setting button9 availability to 0");
    buttonsClicked[9] = 0;
    selectButtons(boardNumbers[9]);
    setProperty("boardNum9", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum10", "click", function(){
  if(buttonsClicked[10] == 1) {
    console.log("Setting button10 availability to 0");
    buttonsClicked[10] = 0;
    selectButtons(boardNumbers[10]);
    setProperty("boardNum10", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum11", "click", function(){
  if(buttonsClicked[11] == 1) {
    console.log("Setting button11 availability to 0");
    buttonsClicked[11] = 0;
    selectButtons(boardNumbers[11]);
    setProperty("boardNum11", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum12", "click", function(){
  if(buttonsClicked[12] == 1) {
    console.log("Setting button12 availability to 0");
    buttonsClicked[12] = 0;
    selectButtons(boardNumbers[12]);
    setProperty("boardNum12", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum13", "click", function(){
  if(buttonsClicked[13] == 1) {
    console.log("Setting button13 availability to 0");
    buttonsClicked[13] = 0;
    selectButtons(boardNumbers[13]);
    setProperty("boardNum13", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum14", "click", function(){
  if(buttonsClicked[14] == 1) {
    console.log("Setting button14 availability to 0");
    buttonsClicked[14] = 0;
    selectButtons(boardNumbers[14]);
    setProperty("boardNum14", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("boardNum15", "click", function(){
  if(buttonsClicked[15] == 1) {
    console.log("Setting button15 availability to 0");
    buttonsClicked[15] = 0;
    selectButtons(boardNumbers[15]);
    setProperty("boardNum15", "background-color", rgb(0,0,0,0.5));
  }
});
onEvent("reset", "click", function() {
  removeButtons();
});
onEvent("playAgain", "click", function() {
  playAgain();
});
onEvent("mathChange", "click", function() {
  mathType++;
  setText("mathChange", "X");
  setProperty("mathChange", "background-color", "red");
  setProperty("mathChange", "font-size", 24);
  setText("difficulty", "multiplication (difficult)");
  numUsed = 3;
  correctNumSet = 1;
  if(mathType == 2) {
    setText("mathChange", "+");
    setProperty("mathChange", "background-color", "green");
    setProperty("mathChange", "font-size", 40);
    setText("difficulty", "addition (easy)");
    numUsed = 4;
    mathType = 0;
    correctNumSet = 0;
  }
  console.log(mathType);
});
onEvent("play", "click", function() {
  setBoard();
  time();
  setScreen("playingScreen");
});