document.addEventListener('DOMContentLoaded', () => {

    // Grab references to the calc's DOM elements
    const calc = document.getElementsByClassName('calc')[0];
    const displayDiv = calc.getElementsByClassName('display')[0];
    const displaySumText = displayDiv.getElementsByClassName('display__sum-text')[0];
    const displayOutputText = displayDiv.getElementsByClassName('display__output-text')[0];
    const buttonsDiv = calc.getElementsByClassName('buttons')[0];

    const calculatorDefaultValues = {
        displayOutputValue: '0',
        displaySumValue: '0',
        isFirstNumber: true,
        numberFirst: '0',
        numberSecond: '0',
        operator: '',
    };

    let c = { ...calculatorDefaultValues }; // Clone object for a new session

    function updateDisplayOutputValueText() {
        if (c.isFirstNumber) {
            displayOutputText.textContent = c.numberFirst;
        } else {
            displayOutputText.textContent = c.numberSecond;
        }
    }

    function updateDisplaySumValueText() {
        c.displaySumValue = c.numberFirst + c.operator + (c.numberSecond === '0' ? '' : ` ${c.numberSecond}`);
        displaySumText.textContent = c.displaySumValue;
    }

    function resetAllValues() {
        c = { ...calculatorDefaultValues }; // Clone object for a new session
        updateDisplayOutputValueText();
        updateDisplaySumValueText();
    }

    function generateNumberStr(numberType, newNumber) {
        if (newNumber === '.') {
            if (numberType.includes('.')) {
                return numberType;
            }
            if (numberType === '0') {
                return '0.';
            }
            return numberType + newNumber;
        }
        if (numberType === '0') {
            return newNumber === '0' ? '0' : newNumber;
        }
        return numberType + newNumber;
    }

    function handleNumberButtonClick(newNumber) {
        if (c.isFirstNumber) {
            c.numberFirst = generateNumberStr(c.numberFirst, newNumber);
            updateDisplayOutputValueText();
            updateDisplaySumValueText();
        } else {
            c.numberSecond = generateNumberStr(c.numberSecond, newNumber);
            updateDisplayOutputValueText();
            updateDisplaySumValueText();
        }
    }

    function calculateSum() {
        if (c.operator === ' ÷') {
            c.displayOutputValue = parseFloat(c.numberFirst) / parseFloat(c.numberSecond);
        }

        if (c.operator === ' ×') {
            c.displayOutputValue = parseFloat(c.numberFirst) * parseFloat(c.numberSecond);
        }

        if (c.operator === ' -') {
            c.displayOutputValue = parseFloat(c.numberFirst) - parseFloat(c.numberSecond);
        }

        if (c.operator === ' +') {
            c.displayOutputValue = parseFloat(c.numberFirst) + parseFloat(c.numberSecond);
        }

        displayOutputText.textContent = c.displayOutputValue;
    }

    function handleOperatorButtonClick(operator) {
        // No point continuing if first number is 0
        if (c.numberFirst === '0') {
            return;
        }
        // As the user has clicked an operator button we're no longer dealing with the first number
        c.isFirstNumber = false;

        if (operator === 'divide') {
            c.operator = ' ÷';
        }

        if (operator === 'multiply') {
            c.operator = ' ×';
        }

        if (operator === 'subtract') {
            c.operator = ' -';
        }

        if (operator === 'add') {
            c.operator = ' +';
        }

        if (operator === 'equals') {
            calculateSum();
        }
        updateDisplaySumValueText();
    }

    function postSum() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/post/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            value: `${c.displaySumValue} = ${c.displayOutputValue}`,
        }));
    }

    // Set up click handlers
    buttonsDiv.addEventListener('click', (event) => {
        const { target } = event;

        // Only continue if button is clicked - catch any erroneous clicks
        if (target.matches('button')) {

            if (target.dataset.function) {
                if (target.dataset.function === 'all-clear') {
                    resetAllValues();
                }
                if (target.dataset.function === 'save') {
                    postSum();
                }
            }

            if (target.dataset.number) {
                handleNumberButtonClick(target.dataset.number);
            }

            if (target.dataset.operator) {
                handleOperatorButtonClick(target.dataset.operator);
            }

        }

    });

});
