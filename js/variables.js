const BASERATE = 1.00;
let rates = {};
let baseCurrency = 'USD';
const EUFlagSrc = 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg';
const USFlagSrc = 'https://restcountries.eu/data/usa.svg';
// Nav
const $menuBtn = $(".nav__bars");
const $navBarTop = $(".nav__bars--bar-top");
const $navBarMid = $(".nav__bars--bar-middle");
const $navBarBot = $(".nav__bars--bar-bottom");
const $navDropdown = $(".nav-dropdown");
const $navItem = $(".nav-dropdown__item");
const $navItemImg = $(".nav-dropdown__item--img");
const $date = $(".nav__base--date");

// Base currency
const $baseCode = $(".base__selected--code");
const $baseImg = $(".base__img-container--img");

// Select
const $selectCurrency = $(".dropdown__select");
const selectCurrencyHTML = $selectCurrency.html();
const $dropdownCurrencies = $(".dropdown__currencies");
const $currency = $(".dropdown__currencies--currency");
const $selectText = $(".dropdown__select--text");

// View Rate
const $currencyName = $(".results__info--title").eq(0);
const $rate = $(".results__info--rate").eq(0);
const $diff = $(".results__info--rate").eq(1);
const $symbol = $(".results__info--currency-symbol");

// View Countries
const $rateDropdown = $(".results__dropdown").eq(0);
const $rateFlag = $(".results__info--img");


const $countriesDropdown = $(".results__dropdown").eq(1);
const $rateInfo = $(".results__info");
const $flagsContainer = $(".results__flags");
const $flagImg = $(".results__flags--flag-img");


