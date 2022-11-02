const displayDollar = document.querySelectorAll(".dollar");

// PICK AXE
const pickAxe = document.querySelector(".pickaxe-img");
const buyNewPickaxe = document.querySelector(".buy-new-pickaxe");
let life = 5;

const displayFoundBitcoins = document.getElementById("found");
let foundBitcoins = 0;

// sell btn
const sellOneBtn = document.querySelector("#sell-one");
const sellAllBtn = document.querySelector("#sell-all");
let sellAllBtnValue = document.querySelector(".total-dollars");
let sellOneBtnValue = document.querySelector(".one-dollar");

// Buy Pickaxe
const buyPickAxeBtn = document.getElementById("buy-pickaxe");

// wallet value
const displayWallet = document.getElementById("wallet-value");
let walletValue = 0;

// reset Btn
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
    console.log(walletValue);
    walletValue = 0;
    life = 5;
    pickAxe.style.opacity = "1";
    foundBitcoins = 0;
    sellAllBtnValue = 0;
    sellOneBtnValue = 0;
    displayAllValues();
});

// currency
let dollar = 0;

// Display dollar
const displayValue = async () => {
    const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    const data = await response.json();
    const dollarString = data.bpi.USD.rate;
    dollar = Number(dollarString.replace(/[^0-9.-]+/g, ""));
    dollar = dollar.toFixed(3);
    displayDollar.forEach((item) => {
        item.innerHTML = dollar;
    });
};

// PICK AXE EVENT
pickAxe.addEventListener("click", () => {
    if (life >= 1) {
        life--;
        pickAxe.classList.add("mine");
        setTimeout(function () {
            pickAxe.classList.remove("mine");
        }, 200);

        const randomNumber = Math.floor(Math.random() * 3) + 1;
        const matchRandom = Math.floor(Math.random() * 3) + 1;
        if (randomNumber === matchRandom) {
            foundBitcoins++;
        } else {
        }
    } else {
        pickAxe.style.opacity = "0.2";
        buyNewPickaxe.innerHTML = `Your <span id="minecraft">PICKAXE</span> is broken, <span id="minecraft">BUY</span> a new one.`;
    }

    displayValue();
    displayAllValues();
});

// EVENT LISTNER
sellOneBtn.addEventListener("click", function () {
    if (foundBitcoins >= 1) {
        console.log();
        walletValue += dollar;
        displayWallet.innerHTML = walletValue;
        foundBitcoins--;
        displayAllValues();
    } else return;
});
sellAllBtn.addEventListener("click", function () {
    if (foundBitcoins >= 1) {
        console.log();
        walletValue += dollar * foundBitcoins;
        displayWallet.innerHTML = walletValue;
        foundBitcoins = 0;
        displayAllValues();
    } else return;
});
// Buy Pickaxe event
buyPickAxeBtn.addEventListener("click", function () {
    if (walletValue >= dollar) {
        walletValue -= dollar;
        displayWallet.innerHTML = walletValue;
        life += 5;
        pickAxe.style.opacity = "1";
        displayAllValues();
    } else {
        return 0;
    }
});
//display life
function displayAllValues() {
    // LIFE
    const displayLife = document.getElementById("life");
    displayLife.innerHTML = life;
    //FOUND BITCOINS
    displayFoundBitcoins.innerHTML = foundBitcoins;
    if (foundBitcoins > 0) {
        sellOneBtnValue.innerHTML = dollar;
        sellAllBtnValue.innerHTML = dollar * foundBitcoins;
    } else {
        sellAllBtnValue.innerHTML = 0;
        sellOneBtnValue.innerHTML = dollar * foundBitcoins;
    }
}

displayValue();
displayAllValues();
