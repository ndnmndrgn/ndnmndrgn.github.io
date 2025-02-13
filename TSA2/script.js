const initialColor = "#D3D3D3"; 
const colors = {
    Monday: "#FFDDC1",
    Tuesday: "#FFABAB",
    Wednesday: "#FFC3A0",
    Thursday: "#D5AAFF",
    Friday: "#85E3FF",
    Saturday: "#B9FBC0",
    Sunday: "#FFD6E0"
};

function showBox(day) {
    const box = document.getElementById("box");

    box.style.display = "block";
    box.style.backgroundColor = initialColor;
    box.style.transform = "translateY(-50px)";

    setTimeout(() => {
        box.style.transform = "translateY(50px)";
        box.style.backgroundColor = colors[day];
    }, 100);
}
