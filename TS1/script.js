const resume = document.querySelector('.container');
const colorChangeBtn = document.getElementById('colorChangeBtn');

const colors = ['#89CFF0', '#0000FF', '#0096FF', '#6495ED', '#191970']; // Add more colors if needed
let currentColorIndex = 0;

colorChangeBtn.addEventListener('click', () => {
    resume.style.backgroundColor = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
});