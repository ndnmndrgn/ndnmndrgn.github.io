function appendValue(value) {
    document.getElementById('display').value += value;
    changeBackground();
}

function clearDisplay() {
    document.getElementById('display').value = '';
    changeBackground();
}

function calculateResult() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (e) {
        alert('Invalid Input');
    }
    changeBackground();
}

function changeBackground() {
    const colors = ['#ffb6c1', '#dda0dd', '#ffc0cb', '#db70db'];
    const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`;
}
