const inputSlider = document.querySelector("[data-lengthSlider]");
const Datalength=document.querySelector("[data-length]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const symbolsCheck=document.querySelector("#symbols");
const numbersCheck=document.querySelector("#numbers");
const indicator = document.querySelector("[data-indicator]");
const genButton = document.querySelector(".genButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
let password="";
let passwordLength=10;
let checkCount=1;

handleSlider();
//function to handle slider
function handleSlider(){
    inputSlider.value=passwordLength;
    Datalength.innerText=passwordLength;

}