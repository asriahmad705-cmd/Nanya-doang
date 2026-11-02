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

function tampil(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
}

function render() {
  const p = PERTANYAAN[i];
  $("soal").textContent = p.q;
  $("visual").innerHTML = p.gif
    ? `<img class="gif" src="${p.gif}" alt="">`
    : `<div class="emoji">🐼</div>`;
  $("jawab").value = "";
  $("progress").style.width = (i / PERTANYAAN.length) * 100 + "%";
  $("btnLanjut").textContent = i === PERTANYAAN.length - 1 ? "Selesai ✅" : "Lanjut 👉";
  $("jawab").focus();
}

function next() {
  const v = $("jawab").value.trim();
  if (!v) { $("jawab").style.borderColor = "red"; return; }
  $("jawab").style.borderColor = "";
  hasil[i] = v;
  i++;
  if (i >= PERTANYAAN.length) {
    $("progress").style.width = "100%";
    tampil("akhir");
  } else {
    render();
  }
}

function kirim() {
  let teks = "Jawaban aku 💗\n\n";
  PERTANYAAN.forEach((p, n) => {
    teks += `${n + 1}. ${p.q}\n jawaban aku : ${hasil[n]}\n\n`;
  });
    teks += "I love you 🥰";
  window.open(`https://wa.me/${6287796410817}?text=${encodeURIComponent(teks)}`, "_blank");
}

$("btnMulai").addEventListener("click", () => { i = 0; tampil("tanya"); render(); });
$("btnLanjut").addEventListener("click", next);
$("btnKirim").addEventListener("click", kirim);