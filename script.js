
let keranjang = [];

// Username Instagram toko
const instagram = "vinciistoreid";

// FORMAT RUPIAH
function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// TAMBAH PRODUK
function tambahKeranjang(nama, harga, idUkuran) {

    let ukuran = document.getElementById(idUkuran).value;

    let produk = keranjang.find(item =>
        item.nama === nama && item.ukuran === ukuran
    );

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            ukuran: ukuran,
            jumlah: 1
        });
    }

    tampilkanKeranjang();

    alert("Produk berhasil ditambahkan!");
}

// TAMPILKAN KERANJANG
function tampilkanKeranjang() {

    let isi = document.getElementById("isiKeranjang");
    let total = 0;
    let jumlah = 0;

    isi.innerHTML = "";

    keranjang.forEach((item, index) => {

        let subtotal = item.harga * item.jumlah;

        total += subtotal;
        jumlah += item.jumlah;

        isi.innerHTML += `
            <div class="item-keranjang">
                <div>
                    <b>${item.nama}</b><br>
                    Ukuran: ${item.ukuran}<br>
                    ${rupiah(item.harga)} x ${item.jumlah}
                </div>

                <div>
                    <button onclick="ubahJumlah(${index},-1)">-</button>
                    <button onclick="ubahJumlah(${index},1)">+</button>
                    <button onclick="hapusProduk(${index})">Hapus</button>
                </div>
            </div>
        `;
    });

    document.getElementById("totalHarga").innerText =
        rupiah(total);

    document.getElementById("jumlahKeranjang").innerText =
        jumlah;
}

// UBAH JUMLAH
function ubahJumlah(index, nilai) {

    keranjang[index].jumlah += nilai;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

// HAPUS PRODUK
function hapusProduk(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();
}

// BUKA KERANJANG
function bukaKeranjang() {

    document.getElementById("keranjang").style.display =
        "flex";
}

// TUTUP KERANJANG
function tutupKeranjang() {

    document.getElementById("keranjang").style.display =
        "none";
}

// CHECKOUT INSTAGRAM
function checkoutInstagram() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let pesan = "Halo VINcii Store, saya ingin memesan:\n\n";
    let total = 0;

    keranjang.forEach(item => {

        let subtotal = item.harga * item.jumlah;

        pesan +=
            item.nama +
            "\nUkuran: " + item.ukuran +
            "\nJumlah: " + item.jumlah +
            "\nHarga: " + rupiah(subtotal) +
            "\n\n";

        total += subtotal;
    });

    pesan += "Total: " + rupiah(total);
    pesan += "\n\nMohon informasi cara pemesanan selanjutnya.";

    // Salin detail pesanan
    navigator.clipboard.writeText(pesan)
        .then(() => {
            alert("Detail pesanan berhasil disalin. Silakan kirim melalui DM Instagram.");
        })
        .catch(() => {
            alert("Silakan salin detail pesanan dari keranjang.");
        })
        .finally(() => {
            window.open(
                "https://www.instagram.com/" + instagram + "/",
                "_blank"
            );
        });
}

// ULASAN PELANGGAN
function kirimUlasan() {

    let nama = document.getElementById("namaUlasan").value.trim();
    let rating = Number(document.getElementById("ratingUlasan").value);
    let isi = document.getElementById("isiUlasan").value.trim();

    if (!nama || !isi) {
        alert("Nama dan ulasan harus diisi!");
        return;
    }

    let ulasan = document.getElementById("daftarUlasan");

    let review = document.createElement("div");
    review.className = "review";

    let judul = document.createElement("h3");
    judul.textContent = nama;

    let bintang = document.createElement("p");
    bintang.textContent = "★".repeat(rating) + "☆".repeat(5-rating);

    let komentar = document.createElement("p");
    komentar.textContent = isi;

    review.append(judul, bintang, komentar);
    ulasan.prepend(review);

    document.getElementById("namaUlasan").value = "";
    document.getElementById("isiUlasan").value = "";

    alert("Terima kasih atas ulasan Anda!");
}