# ATELIER — Photography Portfolio

Website portofolio fotografi statis berdesain **dark editorial / cinematic**, terinspirasi dari screenshot referensi: fullscreen hero, tiga highlight di kanan, tiga teaser glassmorphism di bawah, grid empat album vertikal, dan featured story fullscreen.

## Isi proyek

```text
photo_portfolio_github_pages/
├── index.html       # Struktur situs, galeri, lightbox, login, semua form admin
├── style.css        # Tema visual, 4-column grid, animasi, dan mobile
├── app.js           # State UI, Firebase v12 modular CDN, Auth, Firestore CRUD, ImageKit
├── firestore.rules  # Rules publik read / authenticated write
├── .nojekyll        # Kompatibilitas GitHub Pages
└── README.md        # Panduan ini
```

Tidak memakai build tools, npm, server kustom, atau Firebase Storage. Foto di-host di ImageKit atau penyedia HTTPS lain. **Perlu koneksi internet** untuk foto, Google Fonts, serta Firebase setelah dikonfigurasi.

## 1. Membuat proyek Firebase (Spark / no-cost tier)

1. Buka <https://console.firebase.google.com/> dan pilih **Add project**.
2. Masuk ke **Project settings → General → Your apps**, klik ikon **Web (</>)**. Daftarkan web app (Firebase Hosting tidak perlu diaktifkan).
3. Salin konfigurasi web app, lalu buka `app.js` dan isi empat nilai di bagian paling atas:

   ```js
   const firebaseConfig = {
     apiKey: '...nilai dari Firebase...',
     authDomain: '...nilai dari Firebase...',
     projectId: '...nilai dari Firebase...',
     appId: '...nilai dari Firebase...'
   };
   ```

   Nilai-nilai ini memang muncul di kode JavaScript publik. **Firebase Security Rules**, bukan penyembunyian `apiKey`, yang mengendalikan akses database.
4. Masuk ke **Build → Authentication → Sign-in method → Email/Password**, lalu aktifkan Email/Password. Jangan aktifkan metode login lain bila tidak digunakan.
5. Masuk ke **Authentication → Users → Add user** dan buat akun admin dengan email & password yang kuat. **Jangan pernah menaruh password di file website.**
6. Masuk ke **Build → Firestore Database → Create database**. Pilih lokasi database, gunakan mode production, lalu terapkan rules langkah berikutnya. Pilih lokasi dengan mempertimbangkan kedekatan pengunjung, karena lokasi database sulit diubah.

## 2. Firestore Security Rules (wajib)

Buka **Firestore Database → Rules**, tempel seluruh isi `firestore.rules`, lalu klik **Publish**:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /site_settings/{documentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /albums/{albumId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- Pengunjung publik bisa membaca `site_settings/main` dan dokumen dalam `albums`.
- Hanya akun yang **sedang login** lewat Firebase Authentication dapat membuat, mengubah, atau menghapus data.
- Koleksi lain tidak terbuka melalui rules ini.

### Pengamanan yang lebih kuat: hanya satu UID admin

**Penting:** `request.auth != null` menerima **semua akun Firebase yang bisa login ke proyek yang sama**, bukan memverifikasi role admin secara khusus. Bila benar-benar hanya satu orang yang boleh mengedit, sangat dianjurkan mengganti kondisi `allow write` di **kedua collection** menjadi:

```js
allow write: if request.auth != null && request.auth.uid == 'UID_ADMIN_ANDA';
```

UID akun admin dapat dilihat di **Firebase Console → Authentication → Users**. Agar UI juga hanya menampilkan admin toolbar untuk UID tersebut, ubah `const ADMIN_UID = '';` di `app.js` menjadi UID yang sama. UID ini bukan rahasia; otorisasi sesungguhnya tetap pada Firestore Rules.

## 3. Firebase Authentication authorized domains

Buka **Firebase Authentication → Settings → Authorized domains** (nama menu dapat menyesuaikan tampilan Console). Tambahkan host situs GitHub Pages Anda, contohnya:

```text
username.github.io
```

Gunakan host saja (tanpa `https://` dan tanpa `/nama-repo/`). Untuk local development, `localhost` juga perlu terotorisasi bila belum ada. Email/password umumnya lebih sederhana dari OAuth redirect, tetapi konfigurasi domain tetap perlu dicek bila login gagal.

## 4. ImageKit.io dan konten portofolio

1. Buat akun ImageKit pada <https://imagekit.io/>.
2. Upload foto ke Media Library, atur folder per album jika diperlukan.
3. Salin **public HTTPS URL**, misalnya `https://ik.imagekit.io/akun/album/foto.jpg`.
4. Login admin menggunakan ikon kunci pada navbar. Floating admin toolbar akan muncul.
5. Bila koleksi Firestore masih kosong, pilih **IMPORT DEMO** pada admin toolbar untuk mempublikasikan empat album demo (setelah itu semua bisa diedit). Alternatifnya, langsung gunakan **+ ALBUM** untuk mulai dari kosong; begitu Firestore berisi album nyata, album demo tidak ditampilkan.
6. Klik **EDIT SITE** untuk brand, kontak, dan section story; klik **EDIT** pada tiga highlight hero untuk mengubah masing-masing background, headline, dan kartu teaser.
7. Tambahkan album (judul, kategori, deskripsi, cover), buka album, lalu **+ TAMBAH FOTO**. Isi judul, URL, deskripsi, dan EXIF manual jika tersedia.

Foto **tidak diupload langsung** dari situs. Menekan hapus di website hanya menghapus data Firestore, **tidak** menghapus file ImageKit.

### Helper URL gambar

`imagekitUrl(url, 'thumb')` menambah/memperbarui `tr=w-600,q-80` pada URL yang hostnya `ik.imagekit.io`.

`imagekitUrl(url, 'large')` menambah/memperbarui `tr=w-1800,q-90` untuk hero dan lightbox.

Parameter URL lainnya tetap dipertahankan. Bila URL bukan host ImageKit tersebut, URL HTTPS dibiarkan tanpa transformasi. Jangan memakai URL ImageKit private/signed yang parameter transformasinya belum diizinkan.

### EXIF

Data kamera, lensa, focal length, shutter, aperture, dan ISO adalah **opsional dan diisi manual** melalui editor. Situs tidak membaca EXIF dari file JPEG secara otomatis (karena file asli tidak diunggah ke aplikasi, dan metadata bisa hilang setelah optimasi). Lightbox hanya menampilkan field yang tersedia.

## 5. Deploy ke GitHub Pages

1. Buat repository GitHub, misalnya `photo-portfolio`.
2. Upload semua file proyek ke **root** repository (jangan sampai `index.html` berada di dalam subfolder tambahan).
3. Buka **Repository → Settings → Pages**.
4. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
5. Atur **Branch: main** dan **Folder: /(root)**, lalu klik **Save**.
6. URL situs umumnya berbentuk `https://username.github.io/photo-portfolio/`.
7. Di Firebase Authentication, pastikan `username.github.io` telah ditambahkan sebagai authorized domain.

Perubahan konten lewat panel admin langsung tersinkron lewat Firestore listener `onSnapshot`, sehingga tidak perlu commit GitHub setiap kali menambah foto. Perubahan kode HTML/CSS/JS tetap perlu commit/redeploy.

### Cek lokal sebelum deploy

Dari direktori yang berisi tiga file inti, jalankan:

```bash
python -m http.server 8000
```

Buka `http://localhost:8000/`. Bila `firebaseConfig` masih kosong, situs tetap menampilkan empat album contoh dan tiga highlight, tetapi login & CRUD database belum tersedia. Jangan jadikan `file://` sebagai metode uji utama.

## 6. Struktur data Firestore

```text
site_settings/
  main/
    brandName: string
    brandTagline: string
    contactEmail: string
    instagramUrl: string
    storyEyebrow: string
    storyTitle: string
    storyDescription: string
    storyImageUrl: string
    storyThumbOneUrl: string
    storyThumbTwoUrl: string
    aboutIntro: string
    highlights: array[3] of {
      label, kicker, headline, description, imageUrl,
      cardTitle, cardDescription
    }

albums/
  <auto-generated album ID>/
    title: string
    category: string
    description: string
    coverUrl: string
    sortOrder: number
    photos: array of {
      id, url, title, description, category,
      exif: { camera, lens, focalLength, shutter, aperture, iso }
    }
    createdAt: timestamp
    updatedAt: timestamp
```

Dua collection ini dibuat otomatis oleh admin UI pada simpan/import pertama. Situs membacanya secara real-time menggunakan `onSnapshot`.

**Catatan skalabilitas:** Setiap album menggunakan satu dokumen Firestore dengan array `photos`, sesuai kebutuhan awal. Firestore membatasi ukuran dokumen (sekitar 1 MiB). Bila portofolio berkembang menjadi ratusan/banyak ribuan foto per album, migrasikan foto ke subcollection `albums/{id}/photos` untuk menghindari batas dokumen dan biaya pengiriman seluruh array saat satu foto diubah.

## 7. Privasi, biaya, dan batasan

- GitHub Pages dapat meng-host situs statis ini tanpa biaya pada penggunaan yang memenuhi kebijakan layanan. Firebase Spark, ImageKit free tier, dan Google Fonts juga memiliki batas dan ketentuan masing-masing; **gratis tidak berarti kuota tanpa batas**.
- Kredensial admin tidak disimpan di source code atau localStorage oleh aplikasi. Persistence sesi Firebase Auth dikelola SDK Firebase.
- Email kontak demo `hello@example.com` perlu diganti sebelum situs dipublikasikan.
- Foto-foto contoh menggunakan URL publik Unsplash dan hanya untuk demo; gunakan karya serta URL milik Anda untuk portofolio sebenarnya.
- Untuk situs publik, hindari menyimpan data pribadi atau lokasi sensitif di keterangan foto dan metadata EXIF.
- Admin toolbar disembunyikan dari pengunjung, tetapi **menyembunyikan tombol bukan keamanan**; aturan Firestore harus benar-benar diterapkan.

## Fitur tambahan

- Pencarian album dan filter kategori dinamis (ikon kaca pembesar, shortcut `/`).
- Galeri modal masonry per album, lightbox fullscreen, tombol sebelumnya/berikutnya dan navigasi keyboard.
- Hero tiga slide dengan crossfade, kontrol highlight dan teaser terhubung.
- CRUD: site settings, highlight, album, foto, dan EXIF opsional.
- Escape untuk teks dinamis dan validasi dasar URL HTTPS.
- Responsive pada desktop, tablet, dan ponsel; menghormati `prefers-reduced-motion`.

**Sumber resmi:**
- <https://firebase.google.com/docs/web/setup>
- <https://firebase.google.com/docs/firestore/security/rules-conditions>
- <https://firebase.google.com/docs/firestore/security/get-started>
- <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
