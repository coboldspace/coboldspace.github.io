const btn = document.getElementById('theme-toggle');
const greeting = document.getElementById('greeting');

btn.addEventListener('click', () => {
    // Tambah/hapus class dark-mode di body
    document.body.classList.toggle('dark-mode');
    
    // Ubah teks tombol dan ucapan
    if (document.body.classList.contains('dark-mode')) {
        btn.innerText = "Mode Terang";
        greeting.innerText = "Selamat Malam, Cobold! 🌙";
    } else {
        btn.innerText = "Mode Gelap";
        greeting.innerText = "Selamat Siang, Cobold! ☀️";
    }
});
