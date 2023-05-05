// Get references to the DOM elements we'll be working with
const selectDropdown = document.querySelector(".selector"),
    inputTextbox = document.querySelector("#input-text"),
    inputIconContainer = document.querySelector(".field .icon"),
    formElement = document.querySelector("form"),
    convetButton = document.querySelector(".form .btn"),
    buttonLink = document.querySelector(".btn-content"),
    selectPopup = document.querySelector(".popup"),
    cardPopup = document.querySelector(".popup .card .title p"),
    popupButton = document.querySelector(".popup button"),
    choiceRadioType = document.querySelectorAll(".choice-circle"),
    codeTitle = document.querySelector(".code .card-content p"),
    animationSpan = document.querySelector(".code .card-content span");

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
});
// Add an event listener to the dropdown so we can update the UI when the user makes a selection
selectDropdown.addEventListener("change", updateInputBasedOnSelection);


// This function gets called whenever the user changes the dropdown selection
function updateInputBasedOnSelection () {
    let selectedOption = selectDropdown.options[selectDropdown.selectedIndex].value;
    // Update the input placeholder and icon based on the selected option
    updateInputPlaceholder(selectedOption);
    updateInputIcon(selectedOption);
};

function updateInputPlaceholder(selectedOption) {
    inputTextbox.setAttribute("placeholder", `The ${selectedOption}`);
}

// This function updates the input icon based on the selected option
function updateInputIcon (selectedOptionValue) {
    if (selectedOptionValue == "Letters") {
        inputIconContainer.innerHTML= '<i class="fa-solid fa-l input-icon"></i> <i class="fa-solid fa-e"></i>';
    } else if (selectedOptionValue != "Letters") {
        inputIconContainer.innerHTML= `<svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-123" viewBox="0 0 16 16">
        <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
        </svg>`;
    };
};

// Variable to track validation status
let validation = true;

// Add click event listener to convert button
convetButton.addEventListener("click", function(e){
    const inputTextValue = inputTextbox.getAttribute("placeholder");
    // Validate the input
    validateInput(inputTextValue);

    // If validation fails, return false and stop processing
    if (validation == false) {
        return false;
    };
     // Set the href attribute of the button link
    setLinkHref();
    // Convert the input to an integer
    convertInputToInteger();
});

// Function to set the href attribute of the button link
function setLinkHref () {
    buttonLink.setAttribute("href", "#code");
};

// Function to validate the input
function validateInput (inputTextValue){
    if (inputTextValue == "The Letters" ) {
        // Check if the input is a number or empty
        if (!isNaN(parseInt(inputTextbox.value)) || inputTextbox.value == ""){
             // Show error popup if input is a number or empty
            selectPopup.classList.add("open");
            cardPopup.textContent= "You must write letters, not numbers!"
            validation = false;
        } else {
            validation = true;
        }
    } 
    validateInputInteger(inputTextValue);
};

function validateInputInteger(inputTextValue) {
    if (inputTextValue == "The Integer" || inputTextValue == "The Numeral") {
        if (isNaN(parseInt(inputTextbox.value)) || inputTextbox.value == ""){
            selectPopup.classList.add("open");
            cardPopup.textContent= "You must write numbers, not letters!"
            validation = false;
        } else {
            validation = true;
        }
    }
}
// Close the popup when the close button is clicked
popupButton.addEventListener("click", handleClosePopup);

// close popup when click ouside
window.addEventListener("click", closePopup);

// remove the "open" class from the popup when click outside 
function closePopup(el) {
    if (el.target == selectPopup) {
        selectPopup.classList.remove("open");
    }
}

// Remove the "open" class from the selectPopup element to close the popup
function handleClosePopup() {
    selectPopup.classList.remove("open");
}

// Determine the selected option in the selectDropdown element and call checkInteger function
function convertInputToInteger () {
    let selectedOption = selectDropdown.options[selectDropdown.selectedIndex].value;
    checkIteger(selectedOption);
}

// Add a click event listener to each element in choiceRadioType and set its "checked" attribute
choiceRadioType.forEach((e) => {
    e.addEventListener("click", () => {
        for (i = 0; i < choiceRadioType.length; i++) {
            choiceRadioType[i].removeAttribute("checked");
        };
        e.setAttribute("checked", "");
    });
});

// Based on the selected option, call the corresponding conversion function
function checkIteger (selectValue) {
    if (selectValue == "Integer") {
        const selectedType = handleChoiceTypeSystem();
        if (selectedType == "binary") {
            convertInteger(2);
        } else if (selectedType == "hexagonal") {
            convertInteger(16);
        } else if (selectedType == "octal") {
            convertInteger(8);
        }
    } else if (selectValue == "Letters") {
        const selectedType = handleChoiceTypeSystem();
        if (selectedType == "binary") {
            convertfromLetters(2, 8);
        } else if (selectedType == "hexagonal") {
            convertfromLetters(16, 4);
        } else if (selectedType == "octal") {
            convertfromLetters(8, 3);
        }
    } else if (selectValue == "Numeral") {
        const selectedType = handleChoiceTypeSystem();
        if (selectedType == "binary") {
            convertToLetters(2);
        } else if (selectedType == "hexagonal") {
            convertToLetters(16);
        } else if (selectedType == "octal") {
            convertToLetters(8);
        }
    }
}

// Convert the input to numeral system and display the result in the codeTitle element
function convertInteger(convert) {
    let integerValue = inputTextbox.value;
    let integerValueGroup = integerValue.split(" ");
    let numeral = "";
    for (i = 0; i < integerValueGroup.length; i++) {
        if (integerValueGroup[i] == ""){
            continue;
        } else if (isNaN(parseInt(integerValueGroup[i]))) {
            continue;
        };
        numeral += (parseInt(integerValueGroup[i]).toString(convert)) + " ";
    };

    codeTitle.innerHTML= `// ${numeral.toUpperCase()}`;
    handleAddAnimationToParagraph(numeral.length);
}

// Convert the input to letters in the specified numeral system and display the result in the codeTitle element
function convertfromLetters(convert, length) {
    let letterValue = inputTextbox.value;
    let numeralSystem = "";
    for (i = 0; i < letterValue.length; i++) {
        let convertToInt = letterValue.charCodeAt(i);
        let numeral = convertToInt.toString(convert);
        while (numeral.length < length) {
            numeral = "0" + numeral;
        };
        numeralSystem += numeral + " ";
    }
    codeTitle.textContent= `// ${numeralSystem.toUpperCase()}`;
    handleAddAnimationToParagraph(numeralSystem.length);
}

// Convert the input to a numeral system and display the result in the codeTitle element
function convertToLetters(convert) {
    let numeralValue = inputTextbox.value;
    let numeralGroup = numeralValue.split(" ");
    let letters = "";
    for (i = 0; i < numeralGroup.length; i++) {
        let convertToInt = parseInt(numeralGroup[i], convert);
        let converToLett = String.fromCharCode(convertToInt);
        letters += converToLett;
    }
    codeTitle.textContent= `// ${letters}`;
    handleAddAnimationToParagraph(letters.length);
};

// Function that adds typing animation to the code output
function handleAddAnimationToParagraph(length) {
    animationSpan.style.display = "block";
    animationSpan.style.animation= `type 1.5s steps(${length}) 1`;
    // Hide the animation span element after the animation is complete
    setTimeout(()=>{
        animationSpan.style.display = "none";
    }, 1500);
};

// Function that checks which radio button is checked and returns its value
function handleChoiceTypeSystem() {
    for (let i = 0; i < choiceRadioType.length; i++) {
        if (choiceRadioType[i].hasAttribute("checked")) {
            return choiceRadioType[i].value;
        };
    };
};