// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

const DiskonKonsonan = () => {
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleHitung = (e) => {
    e.preventDefault();

    const harga = parseFloat(totalHarga);

    if (isNaN(harga) || harga <= 0 || !namaPelanggan.trim()) {
      alert('Harap isi total harga (lebih dari 0) dan nama pelanggan dengan benar!');
      return;
    }

    // Hitung jumlah huruf konsonan (huruf selain A, E, I, O, U dan spasi)
    const huruf = namaPelanggan.toLowerCase().match(/[a-z]/g) || [];
    const jumlahKonsonan = huruf.filter((h) => !'aeiou'.includes(h)).length;

    // Hitung jumlah kata (dipisahkan spasi)
    const jumlahKata = namaPelanggan.trim().split(/\s+/).length;

    // Diskon: 2% per konsonan, bonus 5% jika lebih dari 2 kata, maksimal 20%
    let persenDiskon = jumlahKonsonan * 2;
    if (jumlahKata > 2) {
      persenDiskon += 5;
    }
    persenDiskon = Math.min(persenDiskon, 20);

    const totalPotongan = harga * (persenDiskon / 100);
    const hargaAkhir = harga - totalPotongan;

    setHasil({
      jumlahKonsonan,
      jumlahKata,
      persenDiskon,
      totalPotongan,
      hargaAkhir,
    });
  };

  return (
    <div className="diskon-container">
      <h2>Program Diskon Huruf Konsonan</h2>

      <form onSubmit={handleHitung} className="diskon-form">
        <label className="diskon-label">
          Total Harga Pembelian (Rp):
          <input
            type="number"
            className="diskon-input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Contoh: 500000"
          />
        </label>

        <label className="diskon-label">
          Nama Pelanggan:
          <input
            type="text"
            className="diskon-input"
            value={namaPelanggan}
            onChange={(e) => setNamaPelanggan(e.target.value)}
            placeholder="Contoh: Budi Santoso"
          />
        </label>

        <button type="submit" className="diskon-button">Hitung Diskon</button>
      </form>

      {hasil && (
        <div className="diskon-result">
          <p><strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan}</p>
          <p><strong>Jumlah Kata:</strong> {hasil.jumlahKata}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persenDiskon}%</p>
          <p><strong>Total Potongan Harga:</strong> {formatRupiah(hasil.totalPotongan)}</p>
          <p><strong>Harga Pembelian Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonKonsonan;