document.addEventListener('DOMContentLoaded', () => {

    // Grab references to the calc's DOM elements
    const calc = document.getElementsByClassName('calc')[0];
    const displayDiv = calc.getElementsByClassName('display')[0];
    const displaySumText = displayDiv.getElementsByClassName('display__sum-text')[0];
    const displayOutputText = displayDiv.getElementsByClassName('display__output-text')[0];
    const buttonsDiv = calc.getElementsByClassName('buttons')[0];

    // Set up click handlers
    buttonsDiv.addEventListener('click', (event) => {
        const { target } = event;

        // Only continue if button is clicked - catch any erroneous clicks
        if (target.matches('button')) {

            if (target.dataset.function) {
                console.log(target.dataset.function);
            }

            if (target.dataset.number) {
                console.log(target.dataset.number);
            }

            if (target.dataset.operator) {
                console.log(target.dataset.operator);
            }

        }
    });

});
