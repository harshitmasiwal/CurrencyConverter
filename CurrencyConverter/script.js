const BASE_URL = "https://api.fxratesapi.com/convert?from=USD&to=INR&date=2012-06-24&amount=234.12&format=json";

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
// document.write(utc);
// console.log(utc);

// for (code in countryList){
//     console.log(code,countryList[code]);
// }

const dropdownoptions = document.querySelectorAll(".dropdown select");
const sumbitBtn = document.querySelector(".sumbit");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdownoptions) {
    for (let countrycode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = countrycode; // The currency code
        newoption.value = countrycode; // Value of the option

        if (select.name === "from" && countrycode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && countrycode === "INR") {
            newoption.selected = "selected";
        }
        // Append the new option to the current select dropdown
        select.append(newoption);
    }

    select.addEventListener("change", (event) => {
        flagUpdater(event.target);
    })
}

const flagUpdater = (element) => {
    let currencycode = element.value;
    // console.log(currencycode);
    let countrycode = countryList[currencycode];
    // console.log(countrycode)

    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

sumbitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
    }

    console.log(fromcurr.value);
    console.log(tocurr.value);

    const fromcurrency = document.querySelector(".from select");
    const URL = `https://api.fxratesapi.com/convert?from=${fromcurr.value}&to=${tocurr.value}&date=${utc}&amount=${amtVal}&format=json`;
    let response = await fetch(URL);
    let data = await response.json();
    
    let convertedAmt = data.result;
    
    let messege = msg.innerText = `${amtVal} ${fromcurr.value} = ${convertedAmt} ${tocurr.value}`;
    


});




