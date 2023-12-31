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
const add = document.querySelector(".add");
const sub = document.querySelector(".sub");

let password="";
let passwordLength=10;
let checkCount=0;
let symbols='`!@#$%^&*(){}|":?><<,./;][';
handleSlider();
//function to handle slider
function handleSlider(){
    inputSlider.value=passwordLength;
    Datalength.innerText=passwordLength;
}


add.addEventListener("click",()=>{
  passwordLength++;
  if(passwordLength>20){
    passwordLength--;
    alert("cannot exceed 20");
    return
  }
  handleSlider();
});
sub.addEventListener("click",()=>{
  passwordLength--;
  if(passwordLength<0){
    passwordLength++;
    alert("cannot be negative");
    return
  }
  handleSlider();
});

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
      setIndicator("#800");
    }
}


async function copyContent() {
  try {
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText = "copied";
      copyMsg.style.visibility="visible";
  }
  catch(e) {
      copyMsg.innerText = "Failed";
  }
  //to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout( () => {
      copyMsg.innerHTML="";
      copyMsg.style.visibility="hidden";
      // copyMsg.classList.remove("active");
  },600);

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
    

    if(checkCount==0) {
      alert("mark at least on checkbox");
      return;
    }
    if(passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider();
    }

  password="";

  let funarr=[];
  if(uppercaseCheck.checked){
      funarr.push(getRndUppercase);
    }
  if(lowercaseCheck.checked){
    funarr.push(getRndLowercase);
    }
  if(numbersCheck.checked){
    funarr.push(getRndNumber);
    }
  if(symbolsCheck.checked){
    funarr.push(getRndSymbol);
    }
  //cumpulsury addition
  for(let i=0;i<funarr.length;i++){
    password+=funarr[i]();
  }
  //remaining addition
  for(let i=0;i<passwordLength-funarr.length;i++){
    password+=funarr[getRndInteger(0,funarr.length)]();
  }

  // shuffle
  // password=shuffle(password);

  //display
  passwordDisplay.value=password;

  //strength
  calcStrength();
});