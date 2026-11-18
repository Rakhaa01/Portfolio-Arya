// JavaScript portofolio Arya Nasrullah
// Dipasang di halaman yang membutuhkan dengan defer

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  if (!daftarSkill || !jumlahSkill) return;

  daftarSkill.innerHTML = "<li>Memuat keahlian...</li>";

  try {
    const response = await fetch("data/keahlian.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data keahlian.");
    }

    const skills = await response.json();

    if (!Array.isArray(skills)) {
      throw new Error("Format data keahlian tidak valid.");
    }

    daftarSkill.replaceChildren();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    jumlahSkill.textContent =
      `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
    console.log("Keahlian Arya Nasrullah:");
    console.table(skills);
  } catch (error) {
    console.error(error);
    daftarSkill.innerHTML = "<li>Keahlian gagal dimuat.</li>";
    jumlahSkill.textContent = "Data keahlian tidak dapat ditampilkan.";
  }
}

muatKeahlian();

const hobi = ["Bermain futsal", "Membaca komik", "Mendesain poster"];
for (const item of hobi) {
  console.log(`Hobi saya: ${item}`);
}
console.log(`Jumlah hobi: ${hobi.length}`);

const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    tombolTema.textContent = document.body.classList.contains("gelap")
      ? "Mode Terang"
      : "Mode Gelap";
  });
}

const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

let proyek = [];
let kategoriAktif = "Semua";

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartuProyek(item) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = item.kategori;

  const judul = document.createElement("h3");
  judul.textContent = item.judul;

  const gambar = document.createElement("img");
  gambar.src = item.gambar;
  gambar.alt = item.alt;
  gambar.width = 280;
  gambar.loading = "lazy";

  const deskripsi = document.createElement("p");
  deskripsi.textContent = item.deskripsi;

  kartu.append(label, judul, gambar, deskripsi);

  if (item.tautan) {
    const tautan = document.createElement("a");
    tautan.className = "tombol";
    tautan.href = item.tautan;
    tautan.textContent = item.teksTautan || "Lihat proyek";
    kartu.appendChild(tautan);
  }

  return kartu;
}

function tampilkanProyek() {
  if (!daftarProyek || !jumlahProyek) return;

  const proyekTerpilih =
    kategoriAktif === "Semua"
      ? proyek
      : proyek.filter((item) => item.kategori === kategoriAktif);

  daftarProyek.replaceChildren(
    ...proyekTerpilih.map((item) => buatKartuProyek(item))
  );
  jumlahProyek.textContent =
    `Menampilkan ${proyekTerpilih.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) return;

  tombol.addEventListener("click", () => {
    kategoriAktif = kategori;

    document.querySelectorAll(".tombol-filter").forEach((item) => {
      item.classList.toggle("aktif", item === tombol);
    });

    tampilkanProyek();
  });
}

async function muatProyek() {
  if (!daftarProyek || !jumlahProyek) return;

  jumlahProyek.textContent = "Memuat proyek...";

  try {
    const response = await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data proyek.");
    }

    proyek = await response.json();

    if (!Array.isArray(proyek)) {
      throw new Error("Format data proyek tidak valid.");
    }

    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-javascript", "JavaScript");
    tampilkanProyek();
  } catch (error) {
    console.error(error);
    daftarProyek.replaceChildren();
    jumlahProyek.textContent = "Data proyek gagal dimuat.";
  }
}

muatProyek();

async function ambilRepo() {
  const daftarRepo = document.querySelector("#daftar-repo-github");
  const statusRepo = document.querySelector("#status-repo-github");

  if (!daftarRepo || !statusRepo) return;

  statusRepo.textContent = "Memuat repositori GitHub...";
  daftarRepo.replaceChildren();

  try {
    const response = await fetch(
      "https://api.github.com/users/portofolio-arya/repos?sort=updated&per_page=100"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data repositori GitHub.");
    }

    const repositori = await response.json();

    if (!Array.isArray(repositori)) {
      throw new Error("Format data repositori GitHub tidak valid.");
    }

    if (repositori.length === 0) {
      statusRepo.textContent = "Belum ada repositori publik.";
      return;
    }

    repositori.forEach((repo) => {
      const kartu = document.createElement("article");
      kartu.className = "kartu";

      const label = document.createElement("span");
      label.className = "label";
      label.textContent = repo.language || "Repository";

      const judul = document.createElement("h3");
      judul.textContent = repo.name;

      const deskripsi = document.createElement("p");
      deskripsi.textContent = repo.description || "Belum ada deskripsi.";

      const bintang = document.createElement("p");
      bintang.textContent = `Bintang: ${repo.stargazers_count}`;

      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = "Lihat repositori di GitHub";

      kartu.append(label, judul, deskripsi, bintang, tautan);
      daftarRepo.appendChild(kartu);
    });

    statusRepo.textContent =
      `Berhasil memuat ${repositori.length} repositori GitHub.`;
  } catch (error) {
    console.error(error);
    statusRepo.textContent =
      "Repositori gagal dimuat. Periksa koneksi internet.";
  }
}

ambilRepo();
