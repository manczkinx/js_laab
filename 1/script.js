function calculate() {
    const inputFields = document.querySelectorAll('.input-field');
    const values = Array.from(inputFields).map(field => parseFloat(field.value) || 0);

    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    document.getElementById('sum').textContent = sum;
    document.getElementById('average').textContent = average;
    document.getElementById('min').textContent = min;
    document.getElementById('max').textContent = max;
}

function addField() {
    const inputContainer = document.getElementById('input-container');
    const newField = document.createElement('input');
    newField.type = 'number';
    newField.className = 'input-field';
    newField.addEventListener('input', calculate);
    inputContainer.appendChild(newField);
}

document.getElementById('add-field-button').addEventListener('click', addField);
document.querySelectorAll('.input-field').forEach(field => {
    field.addEventListener('input', calculate);
});