'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

 
const displayMv=(movement)=>{
containerMovements.innerHTML='';
movement.forEach(function(mv,i){
let type=mv>0?'deposit':'withdrawal';

let html=`<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">$${mv}</div>
          </div>`

          containerMovements.insertAdjacentHTML('afterbegin',html);

})
}



const user=(accs)=>{
  accs.forEach(function(acc){
    acc.username=acc.owner.toLowerCase().split(' ').map(name=> name[0]).join('')
  })
}

user(accounts);
console.log(accounts)

const caldeposits=(acc)=>{
  let income=acc.movements
  .filter(mov=>mov>0)
  .reduce((acc,mov)=>acc+mov);
  labelSumIn.textContent=`${income}`
  console.log(income)

movements.filter(mov=> {return mov>0;})}

let calBalance=(acc)=>{
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent= `$${acc.balance}`;
}


let interestRateD=(acc)=>{
  acc.movements.filter(mov=>mov>0).map(deposites=>deposites*acc.interestRate).filter((int,i,arr)=>{
    return int>=1
  })
.reduce((acc,int)=>acc+int,0);
labelSumInterest.textContent(`${interestRateD}`)
}

/*
const calcAverageHumanAge=(ages)=>{
  const humanAge=ages.map(age=> (age <=2?2*age:16+age*4));
  console.log(humanAge)
  const adults=humanAge.filter(age=>age>=18);
  console.log(adults)
  const avg=adults.reduce((acc,i)=>
  acc+i,0)/adults.length;
  return avg;
}
console.log("----AVERAGE----")
let x=calcAverageHumanAge( [16, 6, 10, 5, 6, 1, 4])
 */

/* const eur=1.1;
const totalDep=movements.filter(mov=>mov>0).map(map=>map*eur).reduce((acc,mv)=>acc+mv,0)

 */


let currentAcc;
btnLogin.addEventListener('click',(e)=>{
  e.preventDefault();

  currentAcc=accounts.find(acc=>acc.username===inputLoginUsername.value);
  if(currentAcc?.pin===Number(inputLoginPin.value)){
  console.log(currentAcc);
  containerApp.style.opacity=100; 
  labelWelcome.textContent=`HELLO WELCOME ${currentAcc.owner}`
    inputLoginUsername.value=inputLoginPin.value=''
  displayMv(currentAcc.movements);
  calBalance(currentAcc)
  caldeposits(currentAcc)
  interestRateD(currentAcc)
  }})
