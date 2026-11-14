// ====== EDIT DI SINI ======
const NOMOR_WA = "6281234567890"; // format 62, tanpa 0 / + / spasi
const PERTANYAAN = [
  { q: "Nama Kamu siapa? 🫣", gif: "" },
  { q: "Aku siapa kamu? 🫢", gif: "" },
  { q: "Kamu melihat aku sebagai apa 😋", gif: "" },
  { q: "Bagaimana perasaan kamu ke aku saat ini? 🥹", gif: "" },
  { q: "Adakah kemungkinan kamu suka aku? 🫣", gif: "" },
  { q: "Apakah ada sesuatu yang membuat kamu risih dari aku? 🥹", gif: "" }
];
// gif: isi path/URL gambar (mis. "img/panda.gif"), kosong = pakai emoji
// ==========================

const $ = (id) => document.getElementById(id);
const hasil = [];
let i = 0;
let heartTimer;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Dekorasi hati dan kilau dibuat lewat JavaScript agar HTML tetap sederhana.
function buatDekorasi() {
  const layer = document.createElement("div");
  layer.className = "love-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.prepend(layer);

  const symbols = ["💗", "💕", "💖", "💘", "💞", "♥", "✨"];
  const jumlah = prefersReducedMotion ? 5 : 18;

  for (let n = 0; n < jumlah; n++) {
    const heart = document.createElement("span");
    heart.className = "floating-love";
    heart.textContent = symbols[n % symbols.length];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = (Math.random() * 16) + "s";
    heart.style.animationDuration = (10 + Math.random() * 12) + "s";
    heart.style.setProperty("--drift", (Math.random() * 100 - 50) + "px");
    heart.style.fontSize = (14 + Math.random() * 22) + "px";
    layer.appendChild(heart);
  }
}

function ledakanLove(x, y, banyak = 14) {
  if (prefersReducedMotion) return;
  const symbols = ["💗", "💖", "💕", "💘", "✨", "💞"];

  for (let n = 0; n < banyak; n++) {
    const item = document.createElement("span");
    item.className = "love-burst";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = x + "px";
    item.style.top = y + "px";
    item.style.setProperty("--x", (Math.random() * 240 - 120) + "px");
    item.style.setProperty("--y", (Math.random() * 240 - 120) + "px");
    document.body.appendChild(item);
    item.addEventListener("animationend", () => item.remove(), { once: true });
  }
}

function ledakanDariElemen(element, banyak = 14) {
  const rect = element.getBoundingClientRect();
  ledakanLove(rect.left + rect.width / 2, rect.top + rect.height / 2, banyak);
}

function tampil(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
  ledakanDariElemen($(id), 10);
}

function render() {
  const p = PERTANYAAN[i];
  $("soal").textContent = p.q;
  $("visual").innerHTML = p.gif
    ? `<img class="gif" src="${p.gif}" alt="">`
    : `<div class="emoji question-emoji">🐼</div>`;
  $("jawab").value = "";
  $("progress").style.width = (i / PERTANYAAN.length) * 100 + "%";
  $("btnLanjut").textContent = i === PERTANYAAN.length - 1 ? "Selesai 💖" : "Lanjut 👉";
  $("jawab").focus();
}

function next() {
  const v = $("jawab").value.trim();
  if (!v) {
    $("jawab").style.borderColor = "#ff315f";
    $("jawab").classList.remove("shake");
    void $("jawab").offsetWidth;
    $("jawab").classList.add("shake");
    $("jawab").focus();
    return;
  }

  $("jawab").style.borderColor = "";
  hasil[i] = v;
  ledakanDariElemen($("btnLanjut"), 12);
  i++;

  if (i >= PERTANYAAN.length) {
    $("progress").style.width = "100%";
    tampil("akhir");
    ledakanDariElemen($("akhir"), 34);
    mulaiHujanLove();
  } else {
    render();
  }
}

function mulaiHujanLove() {
  if (prefersReducedMotion || heartTimer) return;
  let tersisa = 0;
  heartTimer = window.setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "love-rain";
    heart.textContent = ["💗", "💖", "💕", "💘"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });

    if (++tersisa >= 45) {
      clearInterval(heartTimer);
      heartTimer = null;
    }
  }, 130);
}

function kirim() {
  let teks = "Jawaban aku 💗\n\n";
  PERTANYAAN.forEach((p, n) => {
    teks += `${n + 1}. ${p.q}\nJawaban aku: ${hasil[n]}\n\n`;
  });
  teks += "I love you 🥰";
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, "_blank");
}

buatDekorasi();

$("btnMulai").addEventListener("click", (event) => {
  ledakanLove(event.clientX, event.clientY, 24);
  i = 0;
  tampil("tanya");
  render();
});

$("btnLanjut").addEventListener("click", next);
$("btnKirim").addEventListener("click", (event) => {
  ledakanLove(event.clientX, event.clientY, 30);
  kirim();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("button, .heart")) {
    const rect = event.target.getBoundingClientRect();
    ledakanLove(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
  }
});
