const formKalkulator = document.querySelector("#form-kalkulator");
const hasilKalkulator = document.querySelector("#hasil-kalkulator");

function hitungRataRata(tugas, uts, uas) {
  return (tugas + uts + uas) / 3;
}

function tentukanPredikat(nilai) {
  if (nilai >= 90) return "A";
  if (nilai >= 80) return "B";
  if (nilai >= 70) return "C";
  return "D";
}

if (formKalkulator && hasilKalkulator) {
  formKalkulator.addEventListener("submit", (event) => {
    event.preventDefault();

    const nilai = ["tugas", "uts", "uas"].map((nama) =>
      Number(formKalkulator.elements[nama].value)
    );

    if (!nilai.every((angka) => Number.isFinite(angka) && angka >= 0 && angka <= 100)) {
      hasilKalkulator.textContent = "Masukkan setiap nilai dari 0 sampai 100.";
      hasilKalkulator.hidden = false;
      return;
    }

    const rataRata = hitungRataRata(...nilai);
    const predikat = tentukanPredikat(rataRata);
    const statusKkm = rataRata >= 75 ? "Lulus KKM" : "Belum mencapai KKM";

    hasilKalkulator.textContent =
      `Rata-rata: ${rataRata.toFixed(2)} | Predikat: ${predikat} | ${statusKkm}`;
    hasilKalkulator.hidden = false;
  });
}
