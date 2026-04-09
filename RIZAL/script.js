// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};
const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(el => { revealObserver.observe(el); });

// Function to open Modal
function openModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    }
}

// -------------------------
// Interactive Timeline Quiz Logic
// -------------------------

const timelineBaseData = [
    {
        id: 1,
        words: "Isinilang si Rizal sa Calamba, Laguna noong ika-19 ng Hunyo, 1861.".split(" "),
        mutations: [
            { idx: 4, falseWords: ["Biñan,", "Kawit,", "Malolos,"], correct: "Calamba," },
            { idx: 9, falseWords: ["Hulyo,", "Mayo,", "Agosto,"], correct: "Hunyo," },
            { idx: 10, falseWords: ["1862.", "1896.", "1865."], correct: "1861." }
        ]
    },
    {
        id: 2,
        words: "Dinala ng pormal na edukasyon si Rizal sa Ateneo Municipal, kung saan nagtapos siya nang may pinakamataas na karangalan o Sobresaliente.".split(" "),
        mutations: [
            { idx: 8, falseWords: ["Letran", "Espana", "Maynila"], correct: "Ateneo" },
            { idx: 20, falseWords: ["Aprobado.", "Bueno.", "Suspenso."], correct: "Sobresaliente." }
        ]
    },
    {
        id: 3,
        words: "Sa kanyang unang paglalakbay, inilathala niya ang Noli Me Tangere noong 1887 habang siya ay naninirahan sa Berlin.".split(" "),
        mutations: [
            { idx: 11, falseWords: ["1891", "1896", "1882"], correct: "1887" },
            { idx: 17, falseWords: ["Paris.", "Madrid.", "London."], correct: "Berlin." }
        ]
    },
    {
        id: 4,
        words: "Inihandog ni Rizal sa tatlong paring martir na Gomburza ang kanyang ikalawang nobela na El Filibusterismo.".split(" "),
        mutations: [
            { idx: 8, falseWords: ["Katipunan", "Espanya", "Simbahan"], correct: "Gomburza" },
            { idx: 11, falseWords: ["unang", "ikatlong", "huling"], correct: "ikalawang" },
            { idx: 15, falseWords: ["Tangere.", "Katipunan.", "Solidaridad."], correct: "Filibusterismo." }
        ]
    },
    {
        id: 5,
        words: "Inaresto at ipinatapon si Rizal sa bayan ng Dapitan kung saan siya nagtayo ng paaralan at klinika.".split(" "),
        mutations: [
            { idx: 8, falseWords: ["Cavite", "Manila", "Cebu"], correct: "Dapitan" },
            { idx: 14, falseWords: ["simbahan", "kumbento", "palengke"], correct: "paaralan" }
        ]
    },
    {
        id: 6,
        words: "Binaril si Rizal sa Bagumbayan noong ika-30 ng Disyembre, 1896, na lalong nagpasiklab sa Rebolusyong Pilipino.".split(" "),
        mutations: [
            { idx: 4, falseWords: ["Cavite", "Calamba", "Intramuros"], correct: "Bagumbayan" },
            { idx: 8, falseWords: ["Nobyembre,", "Enero,", "Hunyo,"], correct: "Disyembre," },
            { idx: 9, falseWords: ["1898,", "1892,", "1900,"], correct: "1896," }
        ]
    }
];

let timelineContent = [];
const eventStates = {};

document.addEventListener('DOMContentLoaded', () => {
    // Generate the dynamic content
    timelineBaseData.forEach(base => {
        // 50% chance to be false
        const isCurrentlyFalse = Math.random() > 0.5;
        let generatedWords = [...base.words];
        let chosenMutation = null;
        let chosenFalseWord = "";

        if (isCurrentlyFalse) {
            // Pick a random mutation
            chosenMutation = base.mutations[Math.floor(Math.random() * base.mutations.length)];
            // Pick a random false word from that mutation
            chosenFalseWord = chosenMutation.falseWords[Math.floor(Math.random() * chosenMutation.falseWords.length)];
            // Apply it
            generatedWords[chosenMutation.idx] = chosenFalseWord;
        }

        timelineContent.push({
            id: base.id,
            text: generatedWords.join(" "),
            isTrue: !isCurrentlyFalse,
            wrongWordIndex: isCurrentlyFalse ? chosenMutation.idx : -1,
            correctAnswer: isCurrentlyFalse ? chosenMutation.correct : "",
            correctSentence: base.words.join(" ")
        });

        eventStates[base.id] = { state: 'WAIT_TF' };
        renderQuizArea(base.id);
    });
});

function stripPunc(str) {
    return str.replace(/[.,'"]/g, '').trim().toLowerCase();
}

function renderQuizArea(id) {
    const area = document.getElementById(`quiz-area-${id}`);
    if (!area) return;
    const data = timelineContent.find(d => d.id === id);
    const currState = eventStates[id].state;

    if (currState === 'SUCCESS') {
        area.innerHTML = `
            <div class="alert alert-success fs-5 shadow">
                <h4 class="alert-heading text-dark"><i class="fa-solid fa-check-circle"></i> Tumpak!</h4>
                <p class="text-dark">Nasagot mo nang wasto ang pagsusuri sa yugtong ito.</p>
                <hr>
                <p class="text-dark mb-0">Kumpletong Tamang Pangungusap:<br><strong>${data.correctSentence}</strong></p>
            </div>
        `;
        return;
    }

    if (currState === 'FAIL') {
        area.innerHTML = `
            <div class="alert alert-danger fs-5 shadow">
                <h4 class="alert-heading text-dark"><i class="fa-solid fa-times-circle"></i> Mali!</h4>
                <p class="text-dark">Hindi mo nasagot nang wasto ang yugtong ito.</p>
                <hr>
                <p class="text-dark mb-0">Ang Tamang Impormasyon:<br><strong>${data.correctSentence}</strong></p>
            </div>
        `;
        return;
    }

    const words = data.text.split(" ");
    let textHtml = `<div class="fs-4 mb-4 quiz-text ${currState === 'WAIT_WORD' ? 'quiz-mode-select' : ''}" id="qt-${id}">`;
    words.forEach((word, idx) => {
        const onClickAttr = currState === 'WAIT_WORD' ? `onclick="handleWordClick(${id}, ${idx})"` : '';
        textHtml += `<span class="word-span" ${onClickAttr} data-idx="${idx}">${word}</span> `;
    });
    textHtml += `</div>`;

    let contentHtml = `<h4 class="text-primary mb-3"><i class="fa-solid fa-magnifying-glass me-2"></i> Pagsusuri sa Kaganapan</h4>`;
    contentHtml += `<p class="text-muted">Basahin at suriin kung ang pahayag sa ibaba ay TAMA o MALI.</p>`;
    contentHtml += textHtml;

    if (currState === 'WAIT_TF') {
        contentHtml += `
            <div class="d-flex gap-3 mb-3">
                <button class="btn btn-success flex-grow-1 py-3 fs-5" onclick="handleTrueFalse(${id}, true)">
                    <i class="fa-solid fa-check me-2"></i>TAMA
                </button>
                <button class="btn btn-danger flex-grow-1 py-3 fs-5" onclick="handleTrueFalse(${id}, false)">
                    <i class="fa-solid fa-xmark me-2"></i>MALI
                </button>
            </div>
        `;
    } else if (currState === 'WAIT_WORD') {
        contentHtml += `
            <div class="alert alert-warning text-dark border-warning shadow">
                <i class="fa-solid fa-circle-exclamation text-dark"></i> <strong>Piliin ang Mali!</strong> Dahil sinabi mong MALI ang pahayag na ito, paki-click ang eksaktong SALITA sa taas na naging sanhi ng kamalian nito.
            </div>
        `;
    }

    area.innerHTML = contentHtml;
}

function setCardBorder(id, statusColor) {
    const card = document.getElementById(`timeline-card-${id}`);
    if (card) {
        card.classList.remove('neon-green', 'neon-red');
        card.classList.add(`neon-${statusColor}`);
    }
}

function handleTrueFalse(id, userGuessedTrue) {
    const data = timelineContent.find(d => d.id === id);
    if (userGuessedTrue === data.isTrue) {
        if (data.isTrue) {
            // User correctly guessed TRUE
            eventStates[id].state = 'SUCCESS';
            setCardBorder(id, 'green');
            renderQuizArea(id);
        } else {
            // User correctly guessed FALSE, move to phase 2
            eventStates[id].state = 'WAIT_WORD';
            renderQuizArea(id);
        }
    } else {
        // User guessed wrong instantly
        eventStates[id].state = 'FAIL';
        setCardBorder(id, 'red');
        renderQuizArea(id);
    }
}

function handleWordClick(id, clickedIdx) {
    const data = timelineContent.find(d => d.id === id);
    if (clickedIdx === data.wrongWordIndex) {
        const area = document.getElementById(`quiz-area-${id}`);
        const wordText = data.text.split(" ")[data.wrongWordIndex];
        area.innerHTML += `
            <div class="mt-4 p-4 border border-info rounded bg-dark shadow" id="input-correction-box">
                <label class="form-label text-info fw-bold">Pinalitan sana ang salitang "${wordText}". Ano dapat ang tamang sagot?</label>
                <div class="input-group mt-2">
                    <input type="text" id="correction-input" class="form-control bg-dark text-white border-info" placeholder="I-type ang tamang sagot...">
                    <button class="btn btn-info text-dark fw-bold px-4" onclick="submitCorrection(${id})">Ipasa</button>
                </div>
            </div>
        `;
        document.getElementById('correction-input').focus();

        // Disable clicking other words
        eventStates[id].state = 'TYPING_CORRECTION';
        document.querySelectorAll(`#quiz-area-${id} .word-span`).forEach(el => {
            el.onclick = null;
            el.style.cursor = 'default';
        });

    } else {
        // Picked the wrong word to correct
        eventStates[id].state = 'FAIL';
        setCardBorder(id, 'red');
        renderQuizArea(id);
    }
}

function submitCorrection(id) {
    const data = timelineContent.find(d => d.id === id);
    const inputVal = document.getElementById('correction-input').value;

    if (stripPunc(inputVal) === stripPunc(data.correctAnswer)) {
        eventStates[id].state = 'SUCCESS';
        setCardBorder(id, 'green');
    } else {
        eventStates[id].state = 'FAIL';
        setCardBorder(id, 'red');
    }
    renderQuizArea(id);
}
