const BASE_URL = "https://api.fxratesapi.com/convert?from=USD&to=INR&date=2012-06-24&amount=234.12&format=json";

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');


const dropdownoptions = document.querySelectorAll(".dropdown select");
const sumbitBtn = document.querySelector(".sumbit");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdownoptions) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        
        // Create descriptive text (currency code + country name)
        let countryDetails = countryList[currencyCode];
        newOption.innerText = `${currencyCode} - ${countryDetails.country}`; // Display as "USD - United States"
        newOption.value = currencyCode; // Keep the value as currency code (for API compatibility)

        // Pre-select USD for 'from' and INR for 'to'
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }

        // Append the new option to the current select dropdown
        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        flagUpdater(event.target);
    });
};

const flagUpdater = (element) => {
    let currencycode = element.value;
    // console.log(currencycode);
    let countrycode = countryList[currencycode]?.code;
    // console.log(countrycode)

    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

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




