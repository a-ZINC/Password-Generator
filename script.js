let passwordInput = document.getElementById('passwordInput');
let copyBtn = document.getElementById('copybtn');
let copyMsg = document.getElementById('copymsg');
let passwordLenghtText = document.getElementById('passwordLenghtText');
let passwordSlider = document.getElementById('passwordSlider');
let uppercase = document.getElementById('uppercase');
let lowercase = document.getElementById('lowercase');
let number = document.getElementById('number');
let symbol = document.getElementById('symbol');
let strengthCircle = document.getElementById('strengthCircle');
let generateBtn = document.getElementById('Generatebutton');
let allcheckbox = document.querySelectorAll('.check');
let symbolstring = `$&+,:;=?@#|'<>.-^*()%![]`;
let passwordLenght = 10;
let check = 0;
let func=[];


handler();
setIndicator("#909992");

const min=passwordSlider.min;
const max=passwordSlider.max;
function handler(){
    passwordSlider.value=passwordLenght;
    passwordLenghtText.innerText=passwordLenght;
    const val=passwordSlider.value;
    const min=passwordSlider.min;
    const max=passwordSlider.max;
    let percentage = (val - min) * 100 / (max - min);
    passwordSlider.style.backgroundSize = percentage + `% 100%`;
    console.log(passwordSlider.style.backgroundSize);
}
function setIndicator(color){
    strengthCircle.style.backgroundColor=color;
    strengthCircle.style.boxShadow='0 0 25px 3px '+color;
}
function getrndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function getrndNumber(){
    return getrndInteger(0, 10);
}
function getrndUppercase(){
    return String.fromCharCode(getrndInteger(65, 91));
}
function getrndLowercase(){
    return String.fromCharCode(getrndInteger(97, 123));
}
function getrndSymbol(){
    return symbolstring.charAt(getrndInteger(0, symbolstring.length));
}
function calcStrength(){
    if(uppercase.checked && lowercase.checked && (symbol.checked || number.checked) && passwordLenght>=8){
        setIndicator("#0f0");
    }
    else if((uppercase.checked || lowercase.checked) && (symbol.checked || number.checked) && passwordLenght>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}
async function copyPass(){
    try{
        await navigator.clipboard.writeText(passwordInput.value);
        copyMsg.innerText = 'copied';
    }
    catch(e){
        copyMsg.innerText = 'failed';
    }

    copyMsg.classList.add('active');
    setTimeout(() => {
        copyMsg.classList.remove('active');
    },2000);
}


passwordSlider.addEventListener('input', () => {
    passwordLenght=passwordSlider.value;
    handler();
});


function handlecheckbox(){
    check=0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked){
            check++;
        }
    });
    return check;
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckbox);
});

function generatefuncarr(){

    if(uppercase.checked) func.push(getrndUppercase);
    if(lowercase.checked) func.push(getrndLowercase);
    if(number.checked) func.push(getrndNumber);
    if(symbol.checked) func.push(getrndSymbol);
    console.log(func);

    generatePassword();
}
function shufflepass(arr){
    for(let i=arr.length-1;i>=0;i--){
        let rnd = getrndInteger(0, i+1);
        let temp=arr[i];
        console.log
        arr[i]=arr[rnd];
        arr[rnd]=temp;
    }
    let str='';
    arr.forEach((element)=>{
        str+=element;
    });
    return str;
}
function generatePassword(){

    if(check <= 0) return ;

    if(passwordLenght < check){
        passwordLenght = check;
        handler();
    }
    let s='';
    for(let i=0;i<func.length;i++){
        s+=func[i]();
    }
    for(let i=0;i<passwordLenght - func.length;i++){
        let rndNum = getrndInteger(0, func.length);
        s+=func[rndNum]();
    }
    s=shufflepass(Array.from(s));

    func=[];
    passwordInput.value=s;

    calcStrength();

}

generateBtn.addEventListener('click', generatefuncarr);

copyBtn.addEventListener('click', copyPass);

