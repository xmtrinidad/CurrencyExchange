$menuBtn.on("click", function(){
    toggleMenu($menuBtn, 'open');
    toggleMenu($navDropdown, 'show_nav');
});

$navItem.on("click", function(){
    let clickedItemText = $(this).text().trim();
    let clickedItemFlagSrc = $(this).find($navItemImg).attr('src');
    // Changes the global baseCurrency value
    baseCurrency = clickedItemText;
    // Make API call to get new rates
    changeBase();
    dropDownsUp();
    // Change text of base currency code
    selectText($baseCode, clickedItemText);
    // Change src attr of base flag
    changeSrcAttr($baseImg, clickedItemFlagSrc);
});