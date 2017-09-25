/**
 * Sets size of flags based on how many
 * flags are displayed
 */
function initializeFlagSize() {
    let len = $flagsContainer.children().length;
    if (len >= 6) {
        $flagsContainer.css(
            'grid-template-columns', 'repeat(3, 1fr)'
        );
    } else if (len >= 2 && len < 6) {
        $flagsContainer.css(
            'grid-template-columns', 'repeat(2, 1fr)'
        );
    } else {
        $flagsContainer.css(
            'grid-template-columns', 'repeat(1, 200px)',
            'justify-items', 'auto'
        );
    }
}

/**
 * Change the source attribute of the given element
 * @param {*} element the element to change
 * @param {*} newSrc the new source
 */
function changeSrcAttr(element, newSrc) {
    element.attr('src', newSrc);
}

/**
 * Check if currency is selected
 */
function noCountrySelected() {
    return $selectCurrency.text().trim() === 'Select Currency';
}

/**
 * Currency API call
 * Sets rates and fills into select currency
 * drop down with currency codes
 */
function changeBase() {
    // Every new API call resets the select html to its original state 
    changeHTML($selectCurrency, selectCurrencyHTML);
    fetch(`https://api.fixer.io/latest?base=${baseCurrency}`)
        .then((res) => {
            res.json().then((data) => {
                rates = data.rates;
                getDate(data);
                fillRates(Object.keys(data.rates));
            });
        });
}

/**
 * change HTML content of an element
 * @param {Element} element - the element that changes
 * @param {*} htmlStr - html str value
 */
function changeHTML(element, htmlStr) {
    element.html(htmlStr);
}

function countriesAPI(code) {
    // Slide up menus
    chooseCurrency(code);
    setTimeout(() => {
        fetch(`https://restcountries.eu/rest/v2/currency/${code}`)
            .then((res) => {
                res.json().then((data) => {
                    let title = data[0].currencies[0].name;
                    let symbol = data[0].currencies[0].symbol
                    let flags = [];
                    getRate(code, title, symbol);
                    getFlags(data, flags);
                    specialCases(code, flags);
                    setTimeout(() => {
                        dropDown($rateInfo, 'drop_info');
                    }, 300);
                    setFlags(flags);
                })
            });
    }, 700);
}

/**
 * Sets rate, currency symbol and difference data
 * Uses Numbers.js plug in to round currency values
 * @param {String} clicked - element clicked 
 * @param {String} title - currency name
 * @param {*} sym - currency symbol
 */
function getRate(clicked, title, sym) {
    let clickedRate = numeral(rates[clicked]).format(`0,0.00`);
    let diff = numeral(clickedRate - BASERATE).format('0,0.00');
    $currencyName.text(title);
    $rate.text(clickedRate);
    $symbol.text(sym);
    $diff.text(diff);
}

/**
 * Set flags for currency selected
 * @param {String[]} flagsArr - the array of flags
 */
function setFlags(flagsArr) {
    removeChildren($flagsContainer);
    flagsArr.forEach((flag) => {
        $flagsContainer.append(`
        <figure class="results__flags--flag">
            <img class="results__flags--flag-img" src="${flag.flagSrc}" alt="flag image">
            <figcaption>${flag.name}</figcaption>
        </figure>
        `);
    });
    initializeFlagSize();
}

/**
 * Drops down menu
 * @param {*} element - element being dropped
 * @param {*} className - transition class
 */
function dropDown(element, className) {
    element.addClass(className);
}

/**
 * gets flags from API call and
 * adds it to an array
 * @param {*} items - all indices from the callback
 * @param {*} flagsArr - the array to add flags to
 */
function getFlags(items, flagsArr) {
    items.forEach((item) => {
        flagsArr.push({
            name: item.name,
            flagSrc: item.flag,
            code: item.currencies[0].code
        });
    });
}

// set only one flag for countries with multiple flags
function specialCases(inputCode, flagsList) {
    switch (inputCode) {
        case ('AUD'):
            $rateFlag.attr('src', flagsList[1].flagSrc);
            break;
        case ('CHF'):
            $rateFlag.attr('src', flagsList[1].flagSrc);
            break;
        case ('GBP'):
            $rateFlag.attr('src', flagsList[5].flagSrc);
            break;
        case ('INR'):
            $rateFlag.attr('src', flagsList[1].flagSrc);
            break;
        case ('NZD'):
            $rateFlag.attr('src', flagsList[1].flagSrc);
            break;
        case ('SGD'):
            $rateFlag.attr('src', flagsList[1].flagSrc);
            break;
        case ('ZAR'):
            $rateFlag.attr('src', flagsList[2].flagSrc);
            break;
        case ('EUR'):
            $rateFlag.attr('src', EUFlagSrc);
            break;
        case ('USD'):
            $rateFlag.attr('src', USFlagSrc);
            break;
        default:
            $rateFlag.attr('src', flagsList[0].flagSrc);
    }
}

/**
 * drop down menu functionality
 * @param {Element} element - element to add class to 
 * @param {*} className - transition class name
 */
function toggleMenu(element, className) {
    element.toggleClass(className);
}

/**
 * add/remove classes to display
 * selected currency and info
 * @param {Element} selected - currency element
 */
function chooseCurrency(selected) {
    selectText($selectCurrency, selected);
    dropDownsUp();
}


/**
 * remove classes from all dropdown menus
 * to slide them all up
 */
function dropDownsUp() {
    $menuBtn.removeClass("open");
    $navDropdown.removeClass("show_nav");
    $dropdownCurrencies.removeClass("drop_currencies");
    $rateInfo.removeClass("drop_info");
    $flagsContainer.removeClass("drop_info");
}

/**
 * 
 * @param {Element} element - element that changes text
 * @param {String} elementText - text content
 */
function selectText(element, elementText) {
    element.text(elementText);
    element.addClass('darken');
}

/**
 * Get last updated date
 * @param {String} info - info from API call
 */
function getDate(info) {
    // Sliced to remove year
    $date.text(info.date.slice(5));
}

/**
 * Remove children from parent
 * Then fills in rate data for the select currency
 * dropdown
 * @param {Object} rates - current rates data from API call
 */
function fillRates(rates) {
    removeChildren($dropdownCurrencies);
    rates.forEach((code) => {
        $dropdownCurrencies.append(`
        <li class="dropdown__currencies--currency">${code}</li>
        `)
    });
}
/**
 * Removes all children from the parent container
 * @param {*} parentElement 
 */
function removeChildren(parentElement) {
    parentElement.empty();
}