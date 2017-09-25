$selectCurrency.on("click", function () {
    toggleMenu($dropdownCurrencies, "drop_currencies");
});

$rateDropdown.on("click", function () {
    // disallow click if no country is selected
    if (noCountrySelected()) {
        return;
    }
    toggleMenu($rateInfo, "drop_info");
});

$countriesDropdown.on("click", function () {
    // disallow click if no country is selected
    if (noCountrySelected()) {
        return;
    }
    toggleMenu($flagsContainer, "drop_info");
});

$dropdownCurrencies.on('click', $currency, function (e) {
    const currencyClicked = e.target.innerText;
    countriesAPI(currencyClicked);
});



