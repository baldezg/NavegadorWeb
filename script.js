const Stack = require("./Stack.js");
const prompt = require("prompt-sync")();

const backPages = new Stack();
const nextPages = new Stack();
let currentPage = "Home Page";
let finish = false;
let showBack = false;
let showNext = false;

const showCurrentPage = (action) => {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log("Back page = ", backPages.peek());
  console.log("Next page = ", nextPages.peek());
};
const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage("NEW: ");
};
const backPage = () => {
  nextPages.push(currentPage);
  backPages.pop();
  showCurrentPage("NEW: ");
};
const nextPage = () => {
  backPages.push(currentPage);
  nexPages.pop();
  showCurrentPage("NEW: ");
};

const baseInfo = "\nEnter a url";
const backInfo = "B|b for back page";
const nextInfo = "N|n for next page";
const quitInfo = "Q|q for quit";
const question = "Where would you like to go today? ";


showCurrentPage("DEFAULT: ");
while (!finish) {
  let instructions = baseInfo;
  if(!backPages.isEmpty()){
    instructions + ', ' + backInfo;
    showBack = true;
  } else {
    showBack = false;
  }
  if (!nextPages.isEmpty()) {
    instructions + ', ' + nextInfo;
    showNext = true;
  } else {
    showNext = false;
  }
  instructions += quitInfo;

const answer = prompt(question);
const lowerCaseAnswer = answer.toLowerCase().trim();
if (lowerCaseAnswer.length > 1){
  newPage(answer);
} else if (lowerCaseAnswer === 'q') {
  finish = true;
} else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
    nextPage();
  } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    backPage();
  }   else if ((showBack === false) && lowerCaseAnswer === 'b') {
    console.log('Cannot go back a page. Stack is empty.');
  } else if ((showNext === false) &&lowerCaseAnswer === 'n') {
    console.log('Cannot go to the next page. Stack is empty.');
  }
}
