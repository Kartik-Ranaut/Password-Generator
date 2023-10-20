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
let symbols='`!@#$%^&*(){}|":?><<,./;][';
handleSlider();
//function to handle slider
function handleSlider(){
    inputSlider.value=passwordLength;
    Datalength.innerText=passwordLength;

}

function setIndicator(color){
    indicator.style.backgroundColor=color;
}
function getRndInteger(max,min){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRndNumber(){
    return getRndInteger(0,9);
}

function getRndLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function getRndUppercase(){
    return String.fromCharCode(getRndInteger(67,91));
}
function getRndSymbol(){
    return symbols.charAt(getRndInteger(0,symbols.length));
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

copyContent();
async function copyContent() {
  try {
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText = "copied";
  }
  catch(e) {
      copyMsg.innerText = "Failed";
  }
  //to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout( () => {
      copyMsg.classList.remove("active");
  },2000);

}
inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener('click',()=>{
  if(passwordDisplay.value){
    copyContent();
  }
}
);
function handlecheckbox(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked){
      checkCount++;
    }
  });
  if(passwordLength < checkCount ) {
    passwordLength = checkCount;
    handleSlider();
}
}
allCheckBox.forEach((checkbox)=>{
  checkbox.addEventListener('change',handlecheckbox)
});
genButton.addEventListener("click",()=>{
  if(checkCount==0) return;

  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
  }

  password="";

  if(uppercaseCheck.checked){
    password+=getRndUppercase();
  }
  if(lowercaseCheck.checked){
    password+=getRndLowercase();
  }
  if(numbersCheck.checked){
    password+=getRndNumber();
  }
  if(symbolsCheck.checked){
    password+=getRndSymbol();
  }
});