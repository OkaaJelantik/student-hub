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