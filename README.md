# Personal Student-Hub
Project ini merupakan penugasan/demo pembuatan website personal profile/portfolio interaktif bertema cyberpunk/terminal dengan stack React, Vite, dan Tailwind CSS.
Hasil project bisa dilihat pada https://okaajelantik.github.io/student-hub/ atau klik [disini]{https://okaajelantik.github.io/student-hub/}

---

## Pre-requirements
- Node.js LTS
- Node Package Manager (npm)

---

## Langkah-Langkah Setup
Berikut merupakan tahapan singkat yang telah dijalankan.

1. **Buat project vite baru dengan template react**
   ```bash
   npm create vite@latest student-hub -- --template react
   ```

2. **Install dependensi yang dibutuhkan**
   ```bash
   cd student-hub
   npm install
   ```

3. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss @tailwindcss/vite
   ```

Pada titik ini, dilanjutkan ke tahapan prompting yang akan dijelaskan lebih lanjut pada AI PROMPT LOG.
Selanjutnya, karena project ini menggunakan library tambahan untuk animasi **Framer Motion** untuk efek transisi halus, partikel, interaksi tombol, dan scroll reveal. Maka perlu dilakukan instalasi untuk library terkait:

4. **Install Dependensi Tambahan**
   ```bash
   npm install framer-motion
   ```

6. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Hingga titik ini, setup development berhasil dan port localhost untuk melihat preview website akan terbuka.

---

## AI Prompt Log
Adapun runtutan proses prompting dalam project ini dilakukan sebagai berikut:
1. **Persiapan Data**
    Agar efisien di proses oleh model, file "Buku Kurikulum 2026.pdf" pertama dikonversi ke bentuk markdown menggunakan tools [markitdown](https://github.com/microsoft/markitdown)
2. **Brainstorming dan Pembentukan Context File**
    Selanjutnya, untuk mengefisiensi penggunaan token dan mempertahankan kendali penuh di user. Proses brainstroming telah dilakukan bersama model Gemini via web browser.
    Prompt pada tahap ini dimulai dengan
    > "Bantu aku memastikan tiap permintaan disini sudah aku penuhi.
    > Buatkan Web Student Hub Personal Mahasiswa TI Unud:
    > • Header & Navbar Semantik: Nama, NIM, 1 dari 4 Bidang Minat Kurikulum 2026.
    > • Hero Profile: Bio ringkas & Target Profil Lulusan (PL-01/PL-02/PL-03).
    > • Interactive Counter (`useState`): Stat Card 'Project Selesai' yang bisa bertambah
    > nilainya saat tombol diklik.
    > • Showcase 3 Card Project: 3 Card ide proyek impian selama kuliah.
    > Yang perlu kamu lakukan adalah memberi pertanyaan untuk tiap keperluan pemenuhan tugas tersebut. Untuk relevansi, aku melampirkan buku kurikulum dari kampusku
    Dari informasi dasar ini, prompting terus dilakukan hingga penentuan UI. Hal ini membantu memastikan hasil yang akan didapat lebih predictable dan sesuai persona yang dibentuk dari awal.
    Log lebih lengkap dapat dilihat di [sini]{https://share.gemini.google/hcn8H78ySAbl}
3. Pemberian context file ke Agent Coding (Antigravity)
    Karena akan menggunakan model Claude, maka context file disimpan dalam file "CLAUDE.md" (penamaan hanya untuk tujuan semantik).
    Isi dari context file:
    <details>
    <summary> Lihat CLAUDE.md </summary>
    ```
    Bertindaklah sebagai Creative Frontend Engineer. Buat "Web Student Hub Personal" menggunakan React, Vite. Gunakan Tailwind CSS untuk styling dan Framer Motion untuk menangani animasi scroll dan interaksi. Prioritaskan hasil visual yang futuristik dan memukau, namun jaga struktur komponen tetap rapi dan seefisien mungkin.

    # DESIGN SYSTEM: ELEGANT FUTURISTIC TUI
    - Color Palette: Tema dark mode modern. Background sangat gelap (#050505 atau #09090b), teks utama crisp white (#f8fafc), teks sekunder abu-abu redup (#8b949e), dan warna aksen cyan/NixOS Blue (#7ebae4 atau #00f0ff) untuk efek glow dan elemen interaktif.
    - Typography: Wajib menggunakan font monospace modern (seperti JetBrains Mono, Fira Code, atau font-mono bawaan Tailwind) untuk seluruh teks. Atur line-height minimal 1.6.
    - Background & Ornamen TUI:
    1. Beri animated grid background (garis kotak-kotak) dengan opacity sangat tipis (2-5%) di belakang agar tidak sepi.
    2. Letakkan ornamen ASCII (seperti +, //, atau └ ┐) di sudut-sudut section atau layar secara absolut.
    3. Tambahkan efek CSS glitch yang sangat halus pada teks judul utama (Hero) secara periodik atau saat elemen di-hover.
    - Animasi Utama: Gunakan Framer Motion untuk animasi "nyembul" perlahan saat elemen di-scroll (efek fade-in meluncur dari bawah). Boleh gunakan glassmorphism tipis dan efek glow pada border saat card di-hover.

    # KONTEN & STRUKTUR KOMPONEN
    Tulis seluruh kodenya langsung di file src/App.jsx (Single-File Component)
    Wajib memiliki 6 komponen berikut secara berurutan menggunakan tag HTML semantik (<header>, <main>, <section>, <footer>):
    1. Header & Navbar:
    Tampilkan Nama: I Made Oka Jelantik | NIM: 2505551101.
    Menu Utama: [ Bidang IoT dan Jaringan ]
    Terapkan efek sticky dengan backdrop-blur.
    2. Hero Profile:
    Target Lulusan: > Target: PL-01 (Pengembang Sistem Teknologi Informasi)
    Bio Text (buat dengan efek typewriter atau muncul perlahan): "Berkomitmen menjadi engineer yang memahami arsitektur dengan baik dan sistemik. Saat ini fokus mengeksplorasi filosofi NixOS untuk mendalami proses bekerja secara sistemik sembari melawan overhead akibat tingginya abstraksi modern, guna merancang infrastruktur digital yang efisien, lean, dan terukur."
    3. Interactive Counter & System Monitor (Layout 2 Kolom - Kiri 1/3, Kanan 2/3):
    Buat useState mulai dari angka 0.
    Kolom Kiri (Counter Card): Tampilkan >_ DEPLOYED: {state}. Buat tombol futuristik bertuliskan [ EKSEKUSI_PROJECT ] untuk menambah nilai +1.
    Kolom Kanan (System Monitor & Log): Desain kotak terminal yang memuat:
    System Stats: Mockup metrik seperti OS: NixOS, Memory Overhead: Minimal, Status: Optimal.
    Interactive Log: Hubungkan dengan tombol counter. Tiap kali diklik, tambahkan teks ke terminal log: > [SUCCESS] Project_0{state} deployed securely. Pastikan iterasi terminal log memiliki posisi atau height yang menjamin tidak merusak struktur awal ketika masih bersih atau setelah banyak log dibuat.
    Heatmap: Tambahkan grid kotak-kotak kecil menyerupai GitHub contribution graph (acak warna abu-abu gelap dan cyan terang) untuk mengisi kekosongan visual.
    4. Showcase 3 Card Project:
    Buat dalam format grid responsif (1 kolom di HP, 3 kolom di Desktop). Animasikan staggered reveal (muncul satu per satu bergantian saat di-scroll).
    Card 1: [ NATIVE_RTOS_SINK ] - "Pengembangan infrastruktur IoT Wastafel Pintar menggunakan native ESP-IDF dan FreeRTOS. Berfokus pada optimasi resource hardware dan eksekusi real-time dengan menekan overhead abstraksi."
    Card 2: [ REPRODUCIBLE_INFRA ] - "Merancang deployment server berbasis ekosistem Nix yang berjalan secara native, minim layering, dan 100% reproducible."
    Card 3: [ CYBERSEC_FRAMEWORK ] - "Riset sistem pertahanan siber dengan fokus pada analisis kerentanan infrastruktur hasil development berbasis AI."
    5. Tech Stack:
    Buat section bergaya daftar dependensi sistem.
    Tampilkan keahlian menggunakan ornamen kurung siku: [Nix], [Linux], [ESP-IDF], [GNS3], [Git]. Susun dalam grid atau scrolling marquee agar futuristik.
    6. Footer & Contact (Ping Section):
    Buat footer bergaya terminal dengan judul > PING_ME.
    Tampilkan teks koneksi ala command line: echo "hello" > okajelantikstdy@gmail.com dan ssh git@github.com:OkaaJelantik.
    Tambahkan ornamen teks di pojok kanan bawah: System Uptime: 99.9% | Status: Online.
    ## Trace Alur Eksekusi
    Alur pemuatan dan eksekusi aplikasi dari browser hingga komponen ter-render:

    1. `index.html`
    - Berperan sebagai **entry point** halaman web statis yang pertama kali dimuat browser.
    - Memuat elemen container utama `<div id="root"></div>` serta menyertakan script aplikasi via `<script type="module" src="/src/main.jsx"></script>`.
    2. `src/main.jsx`
    - Berperan sebagai **entry point JavaScript/React**.
    - Mengambil elemen DOM ber-ID `root` (`document.getElementById('root')`) dan menginisialisasi React root menggunakan `createRoot`.
    - Mengimpor style global (`index.css`) dan me-render komponen `<App />` di dalam mode pengawasan `<StrictMode>`.
    3. `src/App.jsx`
    - Berperan sebagai **komponen utama (root UI component)** yang berisi seluruh struktur antarmuka, logika state (counter, terminal log, typewriter), dan integrasi animasi.
    ```
    </details>

---
## Trace Alur Eksekusi
1. **index.html**
    ini merupakan file statis yang secara default dibaca dan diharapkan oleh browser pertama kali. Dalam file ini terdapat elemen kontainer untuk seluruh komponen react, yang ditandai dengan blok `<div id="root"></div>`. id ini yang nantinya mengidentifikasi kontainer. setelah mencapai `<script type="module" src="/src/main.jsx"></script>` browser kemudian melakukan request dan me-load script yang dibuat di file 'main.jsx'.
2. **src/main.jsx**
    file ini merupakan entrypoint yang akan merender React ke dalam elemen #root di 'index.html'. Dalam file ini, react mengambil elemen #root dan menginisialisasi react root dengan `createRoot(...)' dilanjutkan dengan rendering styling dan komponen utama '<App />'.
3. **src/App.jsx**
    file ini menjadi komponen induk yang menyusun seluruh UI, mengelola state reaktif (seperti state counter project) dan mengontrol animasi interaktif.
---

## Bedah & HTML5 Semantik
Penggunaan tag semantik HTML5 pada `App.jsx` diterapkan untuk menjaga struktur kode tetap rapi, aksesibilitas (navigasi/screenreader), dan Meningkatkan SEO.
- `<header>`: Membungkus bagian header.
- `<nav>`: Mengelompokkan elemen navigasi untuk mempermudah identifikasi blok navigasi.
- `<main>`: Membungkus konten inti dan fungsionalitas utama aplikasi.
- `<section>`: Membagi blok-blok konten utama ke dalam bagian terpisah.
- `<h1>` & `<h3>`: Menandai hierarki judul.
- `<footer>`: Membungkus informasi penutup.