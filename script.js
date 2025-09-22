const imagemTextoEl = document.getElementById("imagemTexto");
function tempoJuntos(dataInicio) {
    const inicio = new Date(dataInicio);
    const agora = new Date();

    let diff = agora - inicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= dias * (1000 * 60 * 60 * 24);

    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff -= horas * (1000 * 60 * 60);

    const minutos = Math.floor(diff / (1000 * 60));
    diff -= minutos * (1000 * 60);

    const segundos = Math.floor(diff / 1000);

    return `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

function iniciarContador() {
    const contadorEl = document.getElementById("contador");
    function atualizar() {
        contadorEl.innerText = tempoJuntos("2025-07-21T19:10:00");
    }
    atualizar();
    setInterval(atualizar, 1000);
}
iniciarContador();

const slides = [
    { type: "img", src: "media/foto1.jpg", alt: "Foto 1" },
    { type: "img", src: "media/foto2.jpg", alt: "Foto 2" },
    { type: "img", src: "media/foto3.jpg", alt: "Foto 3" },
    { type: "img", src: "media/foto4.jpg", alt: "Foto 4" },
    { type: "video", src: "media/video.mp4", alt: "Vídeo especial" },
    { type: "pedido" }
];
const textosPorImagem = [
    "Aristóteles dizia: `uma alma em dois corpos`. É assim que me sinto ao seu lado.",
    "Seu sorriso me encanta e não é exagero dize que eu amo cada detalhe em você.",
    "Quero estar com você em todos os dias. Marco Aurélio dizia que a felicidade depende dos pensamentos — e os meus sempre voltam para você.",
    "Platão dizia que amar é reconhecer uma beleza que toca o eterno. Em você, eu encontro algo que vai além do tempo.",
    "Nietzsche dizia: `quem tem um porquê enfrenta qualquer como`. Você é o meu porquê, a cor dos meus dias."
];
let currentSlide = 0;

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.getElementById("carousel-indicators");

function renderSlide(idx) {
    carousel.innerHTML = "";

    if (slides[idx].type === "img") {
        const img = document.createElement("img");
        img.src = slides[idx].src;
        img.alt = slides[idx].alt;
        carousel.appendChild(img);
    } else if (slides[idx].type === "video") {
        const video = document.createElement("video");
        video.src = slides[idx].src;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        video.setAttribute('playsinline', '');
        video.style.background = "#000";
        video.style.maxHeight = "98%";
        video.style.maxWidth = "98%";
        carousel.appendChild(video);
        video.play().catch(() => {});
    } else if (slides[idx].type === "pedido") {
        const pedidoDiv = document.createElement("div");
        pedidoDiv.classList.add("pedido-container");
        pedidoDiv.innerHTML = `
            <div class="pedido-text">
                <span>Quer namorar comigo?</span>
            </div>
            <div class="pedido-buttons">
                <button id="btnSim" class="pedido-btn sim">Sim 💜</button>
                <button id="btnNao" class="pedido-btn nao">Não 😢</button>
            </div>
            <div id="coraArea"></div>
        `;
        carousel.appendChild(pedidoDiv);

        document.getElementById("btnSim").onclick = () => {
            const cora = document.getElementById("coraArea");
            cora.innerHTML = `<span class="cora-animado">💜</span>`;
            document.querySelector(".pedido-buttons").style.display = "none";
        };
        document.getElementById("btnNao").onclick = () => {
            document.getElementById("btnNao").disabled = true;
            document.getElementById("btnNao").innerText = "😢";
        };
    }
    if (slides[idx].type === "img" || slides[idx].type === "video") {
        imagemTextoEl.textContent = textosPorImagem[idx] || "";
    } else {
        imagemTextoEl.textContent = "";
    }
    updateIndicators(idx);
}

function updateIndicators(idx) {
    indicators.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === idx) dot.classList.add("active");
        indicators.appendChild(dot);
    });
}

prevBtn.onclick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    renderSlide(currentSlide);
};
nextBtn.onclick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide(currentSlide);
};

let startX = null;
carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener("touchend", (e) => {
    if (startX === null) return;
    let deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 50) prevBtn.onclick();
    else if (deltaX < -50) nextBtn.onclick();
    startX = null;
});

const audio = document.getElementById("bg-music");
const audioBtn = document.getElementById("audioBtn");
let isPlaying = true;

audioBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        audioBtn.textContent = "🎵";
    } else {
        audio.pause();
        isPlaying = false;
        audioBtn.textContent = "⏸️";
    }
};
audio.onpause = () => { audioBtn.textContent = "⏸️"; };
audio.onplay = () => { audioBtn.textContent = "🎵"; };

document.body.addEventListener("click", () => {
    if (audio.paused && isPlaying) audio.play();
}, { once: true });

renderSlide(currentSlide);
