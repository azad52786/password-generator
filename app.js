const inputSlider = document.querySelector("[data-lenght-slider]");
const displayLenght = document.querySelector("[data-lenght]");

const passwordDisplay = document.querySelector("[data-password-display]");
const copyBtn = document.querySelector("[data-btn]");
const copyMsg = document.querySelector("[data-copy-massage]");

const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");

const symbolCheck = document.querySelector("#symbol");
const indecator = document.querySelector("[data-indicater]");
const generateBtn = document.querySelector(".generate-button");

const allcheckbox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLen = 15;
let checkCount = 0;
const symbol = "!@#$%^&*()_+{}[]|';:'\",.<>?`~\-="
console.log(symbol.length)
handelSlider();
//set strength circle color to gray

setIndicator("#ccc");

//set password length
function handelSlider(){ 
    inputSlider.value = passwordLen;
    displayLenght.innerText = passwordLen;
    console.log(displayLenght)
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLen - min)*100/(max - min)) + "% 100%"

}

function setIndicator(color){
    indecator.style.backgroundColor = color;
    //shadow
    indecator.style.boxShadow = `0px 0px 12px 1px ${color}`

}

// get random integer

function randomInteger(min , max){
    return Math.floor(Math.random() * (max - min)) + min;
}


function generateRandomNumber(){
    console.log("capital")
    return randomInteger(0 , 9);
}


function generateLowercase(){
    console.log("capital")
    return  String.fromCharCode(randomInteger(97 , 122));
}


function generateUppercase(){
    console.log("capital")
    return  String.fromCharCode(randomInteger(65 , 90));
}

function generateSymbol (){
    console.log("capital")
    const randomNumber = randomInteger(0 , symbol.length);
    return symbol.charAt(randomNumber)
}

function calcStrength(){
    let hashUpper = false;
    let hashLower = false;
    let hashNum = false;
    let hashSymbol = false;

    if(upperCaseCheck.checked) hashUpper = true;
    if(lowerCaseCheck.checked) hashLower = true;
    if(numberCheck.checked) hashNum = true;
    if(symbolCheck.checked) hashSymbol = true;

    if(hashUpper && hashLower && (hashNum || hashSymbol) && passwordLen >= 8){
        setIndicator("#0f0");
    }else if((hashLower || hashUpper) && (hashNum || hashSymbol) && passwordLen >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(error){
        copyMsg.innerText = "failed";
    }
    //copy wala span visiable hoga
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}

function sufflePassword(array){
    //fisher yates method
    for(let i = array.length - 1 ; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

inputSlider.addEventListener("input" , (e) =>{
    passwordLen = e.target.value;
    handelSlider(passwordLen);
});


copyBtn.addEventListener("click" , () => {
    if(passwordDisplay.value){
        copyContent();
    }
});



//generate password


function handleChangeBox() {
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLen < checkCount){
        passwordLen = checkCount;
    };
    handelSlider(passwordLen);
};

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change' , handleChangeBox);
});




generateBtn.addEventListener("click" , () => {
    if(checkCount <= 0) return;

    if(passwordLen < checkCount){
        passwordLen = checkCount;
        // display new password len
        handelSlider();
    }

    //lets start the journey of the new password

    // remove the password 

    let password = "";

    //let put the stuff mentioned by checkboxes

    // if(upperCaseCheck.checked){
    //     password += generateUppercase();
    // }
    // if(lowerCaseCheck.checked){
    //     password += generateLowercase();
    // }
    // if(numberCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password += generateSymbol();
    // }




    let functionArr = [];
    if(upperCaseCheck.checked)
        functionArr.push(generateUppercase);

    if(lowerCaseCheck.checked)
        functionArr.push(generateLowercase);

    if(numberCheck.checked)
        functionArr.push(generateRandomNumber);

    if(symbolCheck.checked)
        functionArr.push(generateSymbol);

        // compulsory addition 
        for(let i = 0 ; i < functionArr.length ; i++){
            password += functionArr[i]();

        }

        for(let i = 0 ; i < passwordLen - functionArr.length; i++){
            let randomInd = randomInteger(0 , functionArr.length);
            password += functionArr[randomInd]();
        }

        //suffele the password
        password = sufflePassword(Array.from(password));

        // display password in input
        passwordDisplay.value = password;

        //tell the strength of the function

        calcStrength();
});