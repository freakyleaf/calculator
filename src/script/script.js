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

    let calculator = { ...calculatorDefaultValues }; // Clone object for a new session

    function updateDisplayOutputValueText() {
        if (calculator.isFirstNumber) {
            displayOutputText.textContent = calculator.numberFirst;
        } else {
            displayOutputText.textContent = calculator.numberSecond;
        }
    }

    function updateDisplaySumValueText() {
        displaySumText.textContent = calculator.numberFirst + calculator.operator + (calculator.numberSecond === '0' ? '' : ` ${calculator.numberSecond}`);
    }

    function resetAllValues() {
        calculator = { ...calculatorDefaultValues }; // Clone object for a new session
        updateDisplayOutputValueText();
        updateDisplaySumValueText();
    }

    function generateNumber(numberType, newNumber) {
        if (numberType === '0') {
            return newNumber === '0' ? '0' : newNumber;
        }
        return numberType + newNumber;
    }

    function handleNumberButtonClick(newNumber) {
        if (calculator.isFirstNumber) {
            calculator.numberFirst = generateNumber(calculator.numberFirst, newNumber);
            updateDisplayOutputValueText();
            updateDisplaySumValueText();
        } else {
            calculator.numberSecond = generateNumber(calculator.numberSecond, newNumber);
            updateDisplayOutputValueText();
            updateDisplaySumValueText();
        }
    }

    function handleOperatorButtonClick(operator) {
        // As the user has clicked an operator button we're no longer dealing with the first number
        calculator.isFirstNumber = false;

        if (operator === 'divide') {
            calculator.operator = ' ÷';
        }

        if (operator === 'multiply') {
            calculator.operator = ' ×';
        }

        if (operator === 'subtract') {
            calculator.operator = ' -';
        }

        if (operator === 'add') {
            calculator.operator = ' +';
        }
        updateDisplaySumValueText();
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
