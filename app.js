/* ============================================================================
   ATELIER | Photography Portfolio
   Static HTML + CSS + Vanilla JS + Firebase modular CDN (v12.11.0)
   Image hosting: user-managed ImageKit.io URLs (no Firebase Storage).
   Hosting: GitHub Pages, any HTTPS static host, or local dev server.

   SETUP: Paste the Firebase WEB app config values in firebaseConfig below.
   Firebase configuration keys are public identifiers, NOT secret credentials.
   Security must be enforced by Firestore Security Rules (see firestore.rules).
   ============================================================================ */

const firebaseConfig = {
  apiKey: '',          // Firebase Console > Project settings > Your apps > Web app
  authDomain: '',      // e.g. my-photography-site.firebaseapp.com
  projectId: '',       // e.g. my-photography-site
  appId: ''             // e.g. 1:123456789:web:abcdef
};

// Optional extra UI gate. Leave empty for any Firebase Auth account to see admin UI.
// For real admin-only access, put the same UID in the stricter rules in README.md.
const ADMIN_UID = '';
const FIREBASE_VERSION = '12.11.0';
const FIREBASE_CDN = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

const unsplash = (id, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`;

const DEFAULT_SITE = {
  brandName: 'ATELIER.',
  brandTagline: 'PHOTO STORIES',
  contactEmail: 'hello@example.com',
  instagramUrl: 'https://www.instagram.com/',
  storyEyebrow: 'THE ART OF OBSERVING',
  storyTitle: 'EVERY FRAME\nHAS A STORY',
  storyDescription: 'Sebuah perjalanan tentang cahaya, ruang, manusia, dan momen yang hanya hadir sekali.',
  storyImageUrl: unsplash('photo-1519681393784-d120267933ba', 2200),
  storyThumbOneUrl: unsplash('photo-1528360983277-13d401cdc186', 600),
  storyThumbTwoUrl: unsplash('photo-1500534623283-312aade485b7', 600),
  aboutIntro: "I believe the best photographs don't just show us the world — they make us feel it.",
  highlights: [
    {
      label: 'LANDSCAPES', kicker: 'ART IN EVERY MOMENT',
      headline: 'BEYOND\nTHE FRAME',
      description: 'Menangkap cerita yang tak selalu dapat diungkapkan dengan kata-kata.',
      imageUrl: unsplash('photo-1493976040374-85c8e12f0c0e', 2200),
      cardTitle: 'QUIET JOURNEYS', cardDescription: 'Finding beauty in distant corners.'
    },
    {
      label: 'PORTRAITS', kicker: 'PEOPLE · LIGHT · EMOTION',
      headline: 'HUMAN\nCONNECTIONS',
      description: 'Setiap wajah menyimpan ribuan cerita. Cahaya membantu kita mendengarkannya.',
      imageUrl: unsplash('photo-1534528741775-53994a69daeb', 2200),
      cardTitle: 'HUMAN STORIES', cardDescription: 'Real moments, honest expressions.'
    },
    {
      label: 'AFTER HOURS', kicker: 'NIGHTFALL CHRONICLES',
      headline: 'CHASE\nTHE LIGHT',
      description: 'Di antara senja dan malam, dunia memperlihatkan sisi yang berbeda.',
      imageUrl: unsplash('photo-1519608487953-e999c86e7455', 2200),
      cardTitle: 'AFTER DARK', cardDescription: 'City lights and the in-between.'
    }
  ]
};

const demoPhoto = (id, url, title, description, category, exif = {}) =>
  ({ id, url, title, description, category, exif });

const DEMO_ALBUMS = [
  {
    id: 'demo-quiet-places', title: 'QUIET PLACES', category: 'TRAVEL',
    description: 'Finding stillness in a moving world.', sortOrder: 1,
    coverUrl: unsplash('photo-1493976040374-85c8e12f0c0e', 950),
    photos: [
      demoPhoto('q1', unsplash('photo-1493976040374-85c8e12f0c0e'), 'Morning in Kyoto', 'Sebuah pagi yang tenang di jalanan Kyoto.', 'Travel', { camera:'Sony A7 IV', lens:'35mm f/1.4', focalLength:'35mm', shutter:'1/250s', aperture:'f/2.8', iso:'200' }),
      demoPhoto('q2', unsplash('photo-1528360983277-13d401cdc186'), 'Timeless Japan', 'Sudut arsitektur dan suasana Jepang.', 'Architecture'),
      demoPhoto('q3', unsplash('photo-1492684223066-81342ee5ff30'), 'After the Rain', 'Cahaya dan manusia di sebuah pertemuan.', 'Documentary'),
      demoPhoto('q4', unsplash('photo-1528164344705-47542687000d'), 'Between Seasons', 'Keheningan di antara musim.', 'Travel'),
      demoPhoto('q5', unsplash('photo-1480796927426-f609979314bd'), 'Street Notes', 'Perjalanan melalui detail kecil kota.', 'Street')
    ]
  },
  {
    id: 'demo-human-stories', title: 'HUMAN STORIES', category: 'PORTRAIT',
    description: 'A study of faces and feelings.', sortOrder: 2,
    coverUrl: unsplash('photo-1534528741775-53994a69daeb', 950),
    photos: [
      demoPhoto('h1', unsplash('photo-1534528741775-53994a69daeb'), 'Unspoken', 'Potret candid dengan cahaya alami.', 'Portrait', { camera:'Canon EOS R5', lens:'RF 85mm f/1.2', focalLength:'85mm', shutter:'1/500s', aperture:'f/1.8', iso:'100' }),
      demoPhoto('h2', unsplash('photo-1500648767791-00dcc994a43e'), 'The Storyteller', 'Ekspresi apa adanya.', 'Portrait'),
      demoPhoto('h3', unsplash('photo-1517841905240-472988babdf9'), 'Morning Light', 'Momen tenang yang tak dibuat-buat.', 'Portrait'),
      demoPhoto('h4', unsplash('photo-1524504388940-b1c1722653e1'), 'Soft Focus', 'Cahaya lembut dan sebuah cerita.', 'Portrait'),
      demoPhoto('h5', unsplash('photo-1531123897727-8f129e1688ce'), 'Still Here', 'Ruang dan ekspresi.', 'Portrait')
    ]
  },
  {
    id: 'demo-after-dark', title: 'AFTER DARK', category: 'NIGHT',
    description: 'Where shadows learn to glow.', sortOrder: 3,
    coverUrl: unsplash('photo-1519608487953-e999c86e7455', 950),
    photos: [
      demoPhoto('n1', unsplash('photo-1519608487953-e999c86e7455'), 'Purple Hours', 'Transisi dari langit senja menuju malam.', 'Night', { camera:'Nikon Z7 II', lens:'24-70mm f/2.8', focalLength:'24mm', shutter:'15s', aperture:'f/4', iso:'800' }),
      demoPhoto('n2', unsplash('photo-1519681393784-d120267933ba'), 'Stargazing', 'Bintang dan gunung pada malam yang jernih.', 'Landscape'),
      demoPhoto('n3', unsplash('photo-1477959858617-67f85cf4f1df'), 'City Glows', 'Kota dari sudut yang berbeda.', 'Cityscape'),
      demoPhoto('n4', unsplash('photo-1500534623283-312aade485b7'), 'Last Light', 'Cahaya terakhir di alam terbuka.', 'Landscape')
    ]
  },
  {
    id: 'demo-coastlines', title: 'COASTLINES', category: 'NATURE',
    description: 'The beautiful edges of the earth.', sortOrder: 4,
    coverUrl: unsplash('photo-1507525428034-b723cf961d3e', 950),
    photos: [
      demoPhoto('c1', unsplash('photo-1507525428034-b723cf961d3e'), 'Open Water', 'Warna pantai dan garis horizon.', 'Nature', { camera:'Fujifilm X-T5', lens:'16-55mm f/2.8', focalLength:'23mm', shutter:'1/1000s', aperture:'f/8', iso:'125' }),
      demoPhoto('c2', unsplash('photo-1470252649378-9c29740c9fa8'), 'Golden Hour', 'Cahaya senja di cakrawala.', 'Landscape'),
      demoPhoto('c3', unsplash('photo-1441974231531-c6227db76b6e'), 'Wild Silence', 'Keheningan alam dalam warna hijau.', 'Nature'),
      demoPhoto('c4', unsplash('photo-1500530855697-b586d89ba3ee'), 'Slow Morning', 'Berjalan tanpa tujuan.', 'Travel'),
      demoPhoto('c5', unsplash('photo-1464822759023-fed622ff2c3b'), 'Blue Distance', 'Pegunungan di kejauhan.', 'Landscape')
    ]
  }
];

const state = {
  site: structuredClone(DEFAULT_SITE),
  albums: [], // Empty Firestore collection => visual demo albums (not saved).
  user: null,
  admin: false,
  firebaseReady: false,
  albumsLoaded: false,
  activeSlide: 0,
  activeAlbumId: null,
  activePhotoIndex: 0,
  currentCategory: 'ALL',
  currentQuery: '',
  modalStack: [],
  lastFocus: null,
  backgroundSlot: 0
};
const firebase = { auth: null, db: null, authApi: null, fs: null, unsubscribers: [] };
const el = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[char]));

// HTTPS-only URL guard: blocks javascript:, data:, and insecure image sources.
function safeUrl(raw, fallback = '') {
  try {
    const url = new URL(String(raw ?? '').trim());
    return url.protocol === 'https:' ? url.href : fallback;
  } catch { return fallback; }
}

// Only ImageKit-hosted images receive ImageKit's tr parameter.
// Existing query parameters are preserved; existing tr is replaced for this use.
function imagekitUrl(rawUrl, mode = 'thumb') {
  const urlString = safeUrl(rawUrl);
  if (!urlString) return '';
  const url = new URL(urlString);
  if (url.hostname.toLowerCase() === 'ik.imagekit.io') {
    url.searchParams.set('tr', mode === 'large' ? 'w-1800,q-90' : 'w-600,q-80');
  }
  return url.href;
}

const e = escapeHtml;
const img = (url, mode = 'thumb') => e(imagekitUrl(url, mode));
const albumsToDisplay = () => state.albums.length ? state.albums : DEMO_ALBUMS;
const isDemoAlbum = (album) => album.id.startsWith('demo-') && !state.albums.some((a) => a.id === album.id);
const bySortOrder = (a,b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0) || String(a.title).localeCompare(String(b.title));
const getAlbum = (id) => albumsToDisplay().find((a) => a.id === id);
const normalizedPhotos = (album) => Array.isArray(album?.photos) ? album.photos : [];
const capitalizeId = (index) => String(index + 1).padStart(2, '0');

function toast(message, isError = false) {
  const target = el('toast');
  target.textContent = message;
  target.classList.toggle('is-error', isError);
  target.hidden = false;
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => { target.hidden = true; }, 4400);
}

function setHeadline(id, text) {
  // Only explicit line breaks from admin content become <br> markup.
  const clean = String(text || '').trim().replace(/[.!]+$/, '');
  el(id).innerHTML = clean.split(/\r?\n/).map(e).join('<br>') + '<span class="title-period">.</span>';
}

function renderBrandAndStory() {
  const site = state.site;
  el('brandName').textContent = site.brandName || DEFAULT_SITE.brandName;
  el('brandTagline').textContent = site.brandTagline || 'PHOTO STORIES';
  el('footerBrand').textContent = site.brandName || DEFAULT_SITE.brandName;
  document.title = `${site.brandName || 'ATELIER.'} — Photography Portfolio`;
  el('storyEyebrow').textContent = site.storyEyebrow || '';
  setHeadline('storyTitle', site.storyTitle || DEFAULT_SITE.storyTitle);
  el('storyDescription').textContent = site.storyDescription || '';
  el('aboutIntro').textContent = site.aboutIntro || '';
  el('storyBackground').style.backgroundImage = `url("${imagekitUrl(site.storyImageUrl, 'large') || DEFAULT_SITE.storyImageUrl}")`;
  const thumbs = [site.storyThumbOneUrl, site.storyThumbTwoUrl].filter((url) => safeUrl(url));
  el('storyThumbs').innerHTML = thumbs.map((url, i) =>
    `<div class="showcase-thumb"><img loading="lazy" src="${img(url)}" alt="Preview story ${i + 1}"></div>`
  ).join('');
  const email = String(site.contactEmail || '').trim();
  el('contactEmail').href = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? `mailto:${encodeURIComponent(email)}` : 'mailto:hello@example.com';
  el('instagramLink').href = safeUrl(site.instagramUrl, 'https://www.instagram.com/');
}

function getHighlights() {
  const raw = state.site.highlights;
  return [0,1,2].map((i) => ({ ...DEFAULT_SITE.highlights[i], ...(raw && raw[i] ? raw[i] : {}) }));
}

function changeBackground(url, firstRender = false) {
  const source = imagekitUrl(url, 'large') || DEFAULT_SITE.highlights[0].imageUrl;
  const current = el(state.backgroundSlot === 0 ? 'heroBgA' : 'heroBgB');
  if (firstRender) {
    current.style.backgroundImage = `url("${source}")`;
    current.classList.add('is-visible');
    return;
  }
  const nextSlot = state.backgroundSlot === 0 ? 1 : 0;
  const next = el(nextSlot === 0 ? 'heroBgA' : 'heroBgB');
  next.style.backgroundImage = `url("${source}")`;
  next.classList.remove('is-visible');
  // Allow the new background to cross-fade rather than cutting instantly.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    next.classList.add('is-visible');
    current.classList.remove('is-visible');
  }));
  state.backgroundSlot = nextSlot;
}

function setSlide(index, initial = false) {
  const slides = getHighlights();
  if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
  state.activeSlide = index;
  const slide = slides[index];
  el('heroKicker').textContent = slide.kicker || '';
  setHeadline('heroTitle', slide.headline);
  el('heroDescription').textContent = slide.description || '';
  changeBackground(slide.imageUrl, initial);
  renderHighlights();
}

function renderHighlights() {
  const slides = getHighlights();
  el('highlightList').innerHTML = slides.map((s,i) => `
    <div class="highlight-item ${i === state.activeSlide ? 'is-active' : ''}">
      <button class="highlight-item__select" type="button" data-slide="${i}" aria-pressed="${i === state.activeSlide}">
        <span>${e(s.label)}</span><span class="highlight-item__number">${capitalizeId(i)}</span>
      </button>
      ${state.admin ? `<button type="button" class="highlight-item__edit" data-edit-highlight="${i}" aria-label="Edit highlight ${i+1}">EDIT</button>` : ''}
    </div>`).join('');
  el('heroTeasers').innerHTML = slides.map((s,i) => `
    <button class="hero-teaser ${i === state.activeSlide ? 'is-active' : ''}" type="button" data-slide="${i}" aria-pressed="${i === state.activeSlide}">
      <span class="hero-teaser__number">${capitalizeId(i)} / SELECTED WORK</span>
      <strong class="hero-teaser__title">${e(s.cardTitle)}</strong>
      <span class="hero-teaser__description">${e(s.cardDescription)}</span>
    </button>`).join('');
}

function renderFilters() {
  const available = Array.from(new Set(albumsToDisplay().map((a) => String(a.category || '').trim().toUpperCase()).filter(Boolean))).sort();
  const categories = ['ALL', ...available];
  if (!categories.includes(state.currentCategory)) state.currentCategory = 'ALL';
  el('categoryFilters').innerHTML = categories.map((category) =>
    `<button type="button" class="filter-chip ${state.currentCategory === category ? 'is-selected':''}" data-filter="${e(category)}" aria-pressed="${state.currentCategory === category}">${category === 'ALL' ? 'SEMUA' : e(category)}</button>`
  ).join('');
}

function renderAlbums() {
  const query = state.currentQuery.trim().toLocaleLowerCase('id-ID');
  const selected = albumsToDisplay().slice().sort(bySortOrder).filter((album) => {
    const matchesCategory = state.currentCategory === 'ALL' || String(album.category || '').toUpperCase() === state.currentCategory;
    const text = [album.title, album.description, album.category].join(' ').toLocaleLowerCase('id-ID');
    return matchesCategory && (!query || text.includes(query));
  });
  el('albumGrid').innerHTML = selected.map((album,index) => {
    const demo = isDemoAlbum(album);
    const cover = imagekitUrl(album.coverUrl) || imagekitUrl(normalizedPhotos(album)[0]?.url) || DEFAULT_SITE.highlights[0].imageUrl;
    return `<article class="album-card">
      <button class="album-card__link" type="button" data-open-album="${e(album.id)}" aria-label="Buka album ${e(album.title)}">
        <span class="album-card__image-wrap"><img class="album-card__image" loading="lazy" src="${e(cover)}" alt="Cover album ${e(album.title)}">
          <span class="album-card__type">${e(album.category || 'PORTFOLIO')}</span><span class="album-card__sequence">${capitalizeId(index)}</span></span>
        <span class="album-card__info"><strong class="album-card__title">${e(album.title)}</strong><span class="album-card__description">${e(album.description || '')}</span></span>
      </button>
      ${state.admin ? demo
        ? `<p class="demo-tag">DEMO · klik IMPORT DEMO untuk bisa mengedit</p>`
        : `<div class="album-card__actions"><button class="mini-button" type="button" data-edit-album="${e(album.id)}">EDIT</button><button class="mini-button mini-button--danger" type="button" data-delete-album="${e(album.id)}">HAPUS</button></div>`
        : ''}
    </article>`;
  }).join('');
  el('albumEmpty').hidden = selected.length > 0;
  renderFilters();
  refreshImportButton();
}

function refreshImportButton() {
  const button = el('adminImportDemo');
  button.hidden = !(state.admin && state.firebaseReady && state.albumsLoaded && state.albums.length === 0);
}

function updateAdminUi() {
  document.querySelectorAll('.admin-only').forEach((node) => { node.hidden = !state.admin; });
  el('loginTrigger').hidden = state.admin;
  renderHighlights();
  renderAlbums();
  if (!el('galleryModal').hidden) renderGallery();
  refreshImportButton();
}

function openModal(id) {
  const node = el(id);
  if (!node || !node.hidden) return;
  state.lastFocus = document.activeElement;
  node.hidden = false;
  state.modalStack.push(id);
  document.body.classList.add('modal-open');
  const focused = node.querySelector('input:not([type=hidden]), button:not([disabled])');
  if (focused) requestAnimationFrame(() => focused.focus());
}
function closeModal(id) {
  const node = el(id);
  if (!node || node.hidden) return;
  node.hidden = true;
  state.modalStack = state.modalStack.filter((modalId) => modalId !== id);
  if (!state.modalStack.length) document.body.classList.remove('modal-open');
  if (id === 'galleryModal') state.activeAlbumId = null;
  if (state.lastFocus && typeof state.lastFocus.focus === 'function') state.lastFocus.focus();
}
function closeTopModal() { if (state.modalStack.length) closeModal(state.modalStack[state.modalStack.length - 1]); }

function openAlbum(id) {
  const album = getAlbum(id);
  if (!album) return;
  state.activeAlbumId = id;
  renderGallery();
  openModal('galleryModal');
}
function renderGallery() {
  const album = getAlbum(state.activeAlbumId);
  if (!album) { if (!el('galleryModal').hidden) closeModal('galleryModal'); return; }
  const photos = normalizedPhotos(album);
  const demo = isDemoAlbum(album);
  el('galleryTitle').textContent = album.title || 'PHOTO ALBUM';
  el('galleryCategory').textContent = album.category || 'PORTFOLIO';
  el('galleryDescription').textContent = album.description || '';
  el('galleryCount').textContent = `${photos.length} PHOTO${photos.length === 1 ? '' : 'S'}`;
  el('addPhotoButton').hidden = !state.admin || demo;
  el('galleryEmpty').hidden = photos.length > 0;
  el('galleryMasonry').innerHTML = photos.map((photo,i) => `
    <article class="masonry-item">
      <button type="button" class="masonry-item__view" data-open-photo="${i}" aria-label="Buka foto ${e(photo.title || `Foto ${i+1}`)}">
        <img loading="lazy" src="${img(photo.url)}" alt="${e(photo.title || `Foto ${i+1}`)}">
      </button>
      <span class="masonry-item__label">${e(photo.title || `FRAME ${capitalizeId(i)}`)}</span>
      ${state.admin && !demo ? `<div class="masonry-item__admin"><button type="button" class="mini-button" data-edit-photo="${e(photo.id)}">EDIT</button><button type="button" class="mini-button mini-button--danger" data-delete-photo="${e(photo.id)}">HAPUS</button></div>` : ''}
    </article>`).join('');
}

function openLightbox(index) {
  const album = getAlbum(state.activeAlbumId);
  if (!album || !normalizedPhotos(album)[index]) return;
  state.activePhotoIndex = index;
  renderLightbox();
  openModal('lightboxModal');
}
function renderLightbox() {
  const album = getAlbum(state.activeAlbumId);
  const photos = normalizedPhotos(album);
  const photo = photos[state.activePhotoIndex];
  if (!photo) { if (!el('lightboxModal').hidden) closeModal('lightboxModal'); return; }
  el('lightboxImage').src = imagekitUrl(photo.url, 'large');
  el('lightboxImage').alt = photo.title || 'Foto portofolio';
  el('lightboxCounter').textContent = `${album.title} · ${capitalizeId(state.activePhotoIndex)} / ${String(photos.length).padStart(2,'0')}`;
  el('lightboxTitle').textContent = photo.title || 'UNTITLED FRAME';
  el('lightboxDescription').textContent = photo.description || '';
  const meta = photo.exif || {};
  const fields = [
    ['CAMERA', meta.camera], ['LENS', meta.lens], ['FOCAL LENGTH', meta.focalLength],
    ['SHUTTER', meta.shutter], ['APERTURE', meta.aperture], ['ISO', meta.iso]
  ].filter(([,value]) => value !== '' && value != null);
  el('lightboxExif').innerHTML = fields.length ? fields.map(([key,value]) =>
    `<div><dt>${e(key)}</dt><dd>${e(value)}</dd></div>`).join('')
    : '<span class="exif-grid__missing">Data EXIF tidak tersedia untuk foto ini.</span>';
  el('prevPhoto').hidden = photos.length <= 1;
  el('nextPhoto').hidden = photos.length <= 1;
}
function navigatePhoto(delta) {
  const count = normalizedPhotos(getAlbum(state.activeAlbumId)).length;
  if (!count) return;
  state.activePhotoIndex = (state.activePhotoIndex + delta + count) % count;
  renderLightbox();
}

function isFirebaseConfigured() {
  return ['apiKey','authDomain','projectId','appId'].every((key) =>
    typeof firebaseConfig[key] === 'string' &&
    firebaseConfig[key].trim().length > 0 &&
    !firebaseConfig[key].startsWith('YOUR_'));
}

async function startFirebase() {
  el('firebaseNotice').hidden = isFirebaseConfigured();
  if (!isFirebaseConfigured()) return; // Fully functional visual demo without network requests to Firebase.
  try {
    const [appSdk, authSdk, firestoreSdk] = await Promise.all([
      import(`${FIREBASE_CDN}/firebase-app.js`),
      import(`${FIREBASE_CDN}/firebase-auth.js`),
      import(`${FIREBASE_CDN}/firebase-firestore.js`)
    ]);
    const app = appSdk.initializeApp(firebaseConfig);
    firebase.authApi = authSdk;
    firebase.fs = firestoreSdk;
    firebase.auth = authSdk.getAuth(app);
    firebase.db = firestoreSdk.getFirestore(app);
    state.firebaseReady = true;
    el('firebaseNotice').hidden = true;

    authSdk.onAuthStateChanged(firebase.auth, (user) => {
      state.user = user;
      state.admin = !!user && (!ADMIN_UID || user.uid === ADMIN_UID);
      updateAdminUi();
      if (user && !state.admin) toast('Akun ini tidak termasuk daftar admin.', true);
    }, (error) => toast(`Autentikasi bermasalah: ${friendlyError(error)}`, true));

    const settingsDoc = firestoreSdk.doc(firebase.db, 'site_settings', 'main');
    firebase.unsubscribers.push(firestoreSdk.onSnapshot(settingsDoc, (snapshot) => {
      if (snapshot.exists()) {
        state.site = { ...structuredClone(DEFAULT_SITE), ...snapshot.data() };
      } else {
        state.site = structuredClone(DEFAULT_SITE);
      }
      renderBrandAndStory();
      setSlide(state.activeSlide);
    }, (error) => toast(`Gagal membaca site_settings: ${friendlyError(error)}`, true)));

    const albumsCol = firestoreSdk.collection(firebase.db, 'albums');
    firebase.unsubscribers.push(firestoreSdk.onSnapshot(albumsCol, (snapshot) => {
      state.albums = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(), id: docSnap.id,
        photos: Array.isArray(docSnap.data().photos) ? docSnap.data().photos : []
      }));
      state.albumsLoaded = true;
      renderAlbums();
      if (!el('galleryModal').hidden) renderGallery();
      if (!el('lightboxModal').hidden) renderLightbox();
    }, (error) => toast(`Gagal membaca albums: ${friendlyError(error)}`, true)));
  } catch (error) {
    state.firebaseReady = false;
    el('firebaseNotice').hidden = false;
    toast(`Firebase gagal dimuat. Situs tetap tampil dalam mode demo. ${friendlyError(error)}`, true);
  }
}

function friendlyError(error) {
  const code = error?.code || '';
  const explanations = {
    'auth/invalid-credential':'Email atau password salah.',
    'auth/invalid-email':'Format email tidak valid.',
    'auth/too-many-requests':'Terlalu banyak percobaan login. Coba kembali nanti.',
    'auth/network-request-failed':'Koneksi ke Firebase terputus.',
    'permission-denied':'Akses ditolak oleh Firestore Security Rules.',
    'unavailable':'Layanan Firestore tidak tersedia. Periksa koneksi.'
  };
  return explanations[code] || error?.message || 'Terjadi kesalahan tak dikenal.';
}
function requireAdmin() {
  if (!state.firebaseReady || !firebase.db || !state.admin || !firebase.auth?.currentUser) {
    toast('Silakan login dengan akun admin Firebase yang berwenang.', true);
    return false;
  }
  return true;
}

async function doLogin(event) {
  event.preventDefault();
  const message = el('loginError');
  message.hidden = true;
  if (!firebase.auth) {
    message.textContent = 'Firebase belum dikonfigurasi. Isi firebaseConfig dalam app.js.';
    message.hidden = false;
    return;
  }
  const button = el('loginSubmit');
  button.disabled = true;
  try {
    const credential = await firebase.authApi.signInWithEmailAndPassword(
      firebase.auth, el('loginEmail').value.trim(), el('loginPassword').value
    );
    if (ADMIN_UID && credential.user.uid !== ADMIN_UID) {
      await firebase.authApi.signOut(firebase.auth);
      throw new Error('UID akun ini tidak diizinkan sebagai admin.');
    }
    closeModal('loginModal');
    el('loginForm').reset();
    toast('Login berhasil. Mode admin aktif.');
  } catch (error) {
    message.textContent = friendlyError(error);
    message.hidden = false;
  } finally { button.disabled = false; }
}
async function doLogout() {
  if (!firebase.auth) return;
  try {
    await firebase.authApi.signOut(firebase.auth);
    toast('Anda sudah logout. Tampilan pengunjung aktif.');
  } catch (error) { toast(friendlyError(error), true); }
}

function openSiteEditor() {
  if (!requireAdmin()) return;
  const form = el('siteForm');
  for (const key of ['brandName','brandTagline','contactEmail','storyEyebrow','storyTitle','storyDescription','storyImageUrl','aboutIntro']) {
    if (form.elements.namedItem(key)) form.elements.namedItem(key).value = state.site[key] || '';
  }
  form.elements.namedItem('instagramUrl').value = state.site.instagramUrl || '';
  form.elements.namedItem('storyThumbOneUrl').value = state.site.storyThumbOneUrl || '';
  form.elements.namedItem('storyThumbTwoUrl').value = state.site.storyThumbTwoUrl || '';
  openModal('siteModal');
}
async function saveSite(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  for (const key of ['storyImageUrl','storyThumbOneUrl','storyThumbTwoUrl']) {
    if (data[key] && !safeUrl(data[key])) return toast(`URL HTTPS tidak valid: ${key}`, true);
  }
  if (data.instagramUrl && !safeUrl(data.instagramUrl)) return toast('URL Instagram harus HTTPS.', true);
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await firebase.fs.setDoc(firebase.fs.doc(firebase.db,'site_settings','main'), {
      ...data, updatedAt: firebase.fs.serverTimestamp()
    }, { merge: true });
    closeModal('siteModal');
    toast('Header, kontak, dan story telah disimpan.');
  } catch (error) { toast(friendlyError(error), true); }
  finally { button.disabled = false; }
}

function openHighlightEditor(index) {
  if (!requireAdmin()) return;
  const slide = getHighlights()[index];
  if (!slide) return;
  const form = el('highlightForm');
  el('highlightModalTitle').textContent = `EDIT HIGHLIGHT ${capitalizeId(index)}`;
  for (const [key, value] of Object.entries(slide)) {
    if (form.elements.namedItem(key)) form.elements.namedItem(key).value = value ?? '';
  }
  form.elements.namedItem('highlightIndex').value = index;
  openModal('highlightModal');
}
async function saveHighlight(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const index = Number(data.highlightIndex);
  if (!Number.isInteger(index) || index < 0 || index > 2) return;
  if (!safeUrl(data.imageUrl)) return toast('URL background hero harus HTTPS.', true);
  delete data.highlightIndex;
  const nextHighlights = getHighlights();
  nextHighlights[index] = data;
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await firebase.fs.setDoc(firebase.fs.doc(firebase.db,'site_settings','main'), {
      highlights: nextHighlights, updatedAt: firebase.fs.serverTimestamp()
    }, { merge: true });
    closeModal('highlightModal');
    setSlide(index);
    toast(`Highlight ${capitalizeId(index)} berhasil diperbarui.`);
  } catch (error) { toast(friendlyError(error), true); }
  finally { button.disabled = false; }
}

function openAlbumEditor(id = '') {
  if (!requireAdmin()) return;
  if (id && isDemoAlbum(getAlbum(id))) return toast('Import data demo ke Firestore sebelum mengedit album contoh.', true);
  const album = id ? getAlbum(id) : null;
  el('albumFormTitle').textContent = album ? 'EDIT ALBUM' : 'TAMBAH ALBUM';
  el('albumForm').reset();
  el('albumId').value = album?.id || '';
  const names = ['title','category','description','coverUrl','sortOrder'];
  for (const key of names) el('albumForm').elements.namedItem(key).value = album?.[key] ?? (key === 'sortOrder' ? String(state.albums.length + 1) : '');
  openModal('albumFormModal');
}
async function saveAlbum(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  if (!safeUrl(data.coverUrl)) return toast('Cover album harus menggunakan URL HTTPS.', true);
  const albumId = data.albumId;
  const payload = {
    title: data.title.trim(), category: data.category.trim(), description: data.description.trim(),
    coverUrl: safeUrl(data.coverUrl), sortOrder: Math.max(0, Number(data.sortOrder) || 0),
    updatedAt: firebase.fs.serverTimestamp()
  };
  if (!payload.title || !payload.category) return toast('Judul dan kategori album wajib diisi.', true);
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    if (albumId) {
      await firebase.fs.updateDoc(firebase.fs.doc(firebase.db,'albums',albumId), payload);
    } else {
      await firebase.fs.addDoc(firebase.fs.collection(firebase.db,'albums'), {
        ...payload, photos: [], createdAt: firebase.fs.serverTimestamp()
      });
    }
    closeModal('albumFormModal');
    toast(albumId ? 'Album berhasil diperbarui.' : 'Album berhasil ditambahkan.');
  } catch (error) { toast(friendlyError(error), true); }
  finally { button.disabled = false; }
}
async function deleteAlbum(id) {
  if (!requireAdmin()) return;
  const album = getAlbum(id);
  if (!album || isDemoAlbum(album)) return;
  if (!window.confirm(`Hapus album "${album.title}" beserta seluruh referensi fotonya? URL asli di ImageKit tidak akan terhapus.`)) return;
  try {
    await firebase.fs.deleteDoc(firebase.fs.doc(firebase.db,'albums',id));
    if (state.activeAlbumId === id) closeModal('galleryModal');
    toast('Album dihapus dari Firestore. File ImageKit tidak terpengaruh.');
  } catch (error) { toast(friendlyError(error), true); }
}

function photoKey() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID() : `p_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
function openPhotoEditor(photoId = '') {
  if (!requireAdmin()) return;
  const album = getAlbum(state.activeAlbumId);
  if (!album || isDemoAlbum(album)) return toast('Import demo sebelum menambahkan foto ke album contoh.', true);
  const photo = normalizedPhotos(album).find((p) => p.id === photoId);
  const form = el('photoForm');
  form.reset();
  el('photoFormTitle').textContent = photo ? 'EDIT FOTO' : 'TAMBAH FOTO';
  el('photoAlbumId').value = album.id;
  el('photoId').value = photo?.id || '';
  for (const key of ['url','title','description','category']) form.elements.namedItem(key).value = photo?.[key] ?? '';
  for (const key of ['camera','lens','focalLength','shutter','aperture','iso']) form.elements.namedItem(key).value = photo?.exif?.[key] ?? '';
  openModal('photoFormModal');
}
async function savePhoto(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const album = getAlbum(data.photoAlbumId);
  if (!album || isDemoAlbum(album)) return toast('Album belum disimpan di Firestore.', true);
  if (!safeUrl(data.url)) return toast('URL foto harus HTTPS.', true);
  const payload = {
    id: data.photoId || photoKey(), url: safeUrl(data.url), title: data.title.trim(),
    description: data.description.trim(), category: data.category.trim(),
    exif: Object.fromEntries(['camera','lens','focalLength','shutter','aperture','iso'].map((key) => [key, data[key].trim()]))
  };
  if (!payload.title) return toast('Judul foto wajib diisi.', true);
  const photos = [...normalizedPhotos(album)];
  const existingIndex = photos.findIndex((p) => p.id === payload.id);
  if (existingIndex >= 0) photos[existingIndex] = payload;
  else photos.push(payload);
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await firebase.fs.updateDoc(firebase.fs.doc(firebase.db,'albums',album.id), {
      photos, updatedAt: firebase.fs.serverTimestamp()
    });
    closeModal('photoFormModal');
    toast(existingIndex >= 0 ? 'Foto berhasil diperbarui.' : 'Foto berhasil ditambahkan ke album.');
  } catch (error) { toast(friendlyError(error), true); }
  finally { button.disabled = false; }
}
async function deletePhoto(photoId) {
  if (!requireAdmin()) return;
  const album = getAlbum(state.activeAlbumId);
  if (!album || isDemoAlbum(album)) return;
  const photo = normalizedPhotos(album).find((p) => p.id === photoId);
  if (!photo || !window.confirm(`Hapus referensi foto "${photo.title}" dari album?`)) return;
  const photos = normalizedPhotos(album).filter((p) => p.id !== photoId);
  try {
    await firebase.fs.updateDoc(firebase.fs.doc(firebase.db,'albums',album.id), {
      photos, updatedAt: firebase.fs.serverTimestamp()
    });
    toast('Foto dihapus dari album. File di ImageKit tidak dihapus.');
  } catch (error) { toast(friendlyError(error), true); }
}

async function importDemoContent() {
  if (!requireAdmin()) return;
  if (!state.albumsLoaded || state.albums.length) return toast('Import hanya tersedia saat koleksi albums kosong.', true);
  if (!window.confirm('Publikasikan 4 album demo dan pengaturan halaman awal ke Firestore? Data akan dapat diedit setelah import.')) return;
  const button = el('adminImportDemo');
  button.disabled = true;
  try {
    const batch = firebase.fs.writeBatch(firebase.db);
    const settings = firebase.fs.doc(firebase.db,'site_settings','main');
    batch.set(settings, { ...state.site, updatedAt: firebase.fs.serverTimestamp() }, { merge: true });
    for (const album of DEMO_ALBUMS) {
      const ref = firebase.fs.doc(firebase.fs.collection(firebase.db,'albums'));
      const { id: _demoId, ...payload } = album;
      batch.set(ref, { ...structuredClone(payload), createdAt: firebase.fs.serverTimestamp(), updatedAt: firebase.fs.serverTimestamp() });
    }
    await batch.commit();
    toast('Empat album demo berhasil dipublikasikan ke Firestore.');
  } catch (error) { toast(friendlyError(error), true); }
  finally { button.disabled = false; }
}

function setSearchOpen(open) {
  el('searchPanel').hidden = !open;
  el('searchToggle').setAttribute('aria-expanded', String(open));
  if (open) el('searchInput').focus();
}
function resetSearch() {
  state.currentCategory = 'ALL';
  state.currentQuery = '';
  el('searchInput').value = '';
  renderAlbums();
}
function onScroll() {
  el('siteHeader').classList.toggle('is-scrolled', window.scrollY > 35);
  const links = document.querySelectorAll('.nav__link');
  let selected = 'home';
  for (const id of ['home','albums','about','contact']) {
    const section = el(id);
    if (section && section.getBoundingClientRect().top < window.innerHeight * .38) selected = id;
  }
  links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${selected}`));
}

function attachEvents() {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, [data-close]');
    if (!target) return;
    if (target.dataset.close) return closeModal(target.dataset.close);
    if (target.dataset.slide !== undefined) return setSlide(Number(target.dataset.slide));
    if (target.dataset.openAlbum) return openAlbum(target.dataset.openAlbum);
    if (target.dataset.openPhoto !== undefined) return openLightbox(Number(target.dataset.openPhoto));
    if (target.dataset.editHighlight !== undefined) return openHighlightEditor(Number(target.dataset.editHighlight));
    if (target.dataset.editAlbum) return openAlbumEditor(target.dataset.editAlbum);
    if (target.dataset.deleteAlbum) return deleteAlbum(target.dataset.deleteAlbum);
    if (target.dataset.editPhoto) return openPhotoEditor(target.dataset.editPhoto);
    if (target.dataset.deletePhoto) return deletePhoto(target.dataset.deletePhoto);
    if (target.dataset.filter !== undefined) {
      state.currentCategory = target.dataset.filter;
      renderAlbums();
    }
  });
  el('searchToggle').addEventListener('click', () => setSearchOpen(el('searchPanel').hidden));
  el('searchInput').addEventListener('input', (event) => {
    state.currentQuery = event.currentTarget.value;
    renderAlbums();
  });
  el('resetFilters').addEventListener('click', resetSearch);
  el('mobileToggle').addEventListener('click', () => {
    const open = !el('mainNav').classList.contains('is-open');
    el('mainNav').classList.toggle('is-open', open);
    el('mobileToggle').setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav__link').forEach((link) => link.addEventListener('click', () => {
    el('mainNav').classList.remove('is-open');
    el('mobileToggle').setAttribute('aria-expanded', 'false');
    setSearchOpen(false);
  }));
  el('loginTrigger').addEventListener('click', () => openModal('loginModal'));
  el('loginForm').addEventListener('submit', doLogin);
  el('editSiteButton').addEventListener('click', openSiteEditor);
  el('adminEditSite').addEventListener('click', openSiteEditor);
  el('adminAddAlbum').addEventListener('click', () => openAlbumEditor());
  el('addAlbumButton').addEventListener('click', () => openAlbumEditor());
  el('adminLogout').addEventListener('click', doLogout);
  el('adminImportDemo').addEventListener('click', importDemoContent);
  el('addPhotoButton').addEventListener('click', () => openPhotoEditor());
  el('siteForm').addEventListener('submit', saveSite);
  el('highlightForm').addEventListener('submit', saveHighlight);
  el('albumForm').addEventListener('submit', saveAlbum);
  el('photoForm').addEventListener('submit', savePhoto);
  el('prevPhoto').addEventListener('click', () => navigatePhoto(-1));
  el('nextPhoto').addEventListener('click', () => navigatePhoto(1));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.modalStack.length) closeTopModal();
      else if (!el('searchPanel').hidden) setSearchOpen(false);
      else { el('mainNav').classList.remove('is-open'); el('mobileToggle').setAttribute('aria-expanded','false'); }
      return;
    }
    if (!el('lightboxModal').hidden && event.key === 'ArrowRight') navigatePhoto(1);
    else if (!el('lightboxModal').hidden && event.key === 'ArrowLeft') navigatePhoto(-1);
    else if (event.key === '/' && !state.modalStack.length && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault(); setSearchOpen(true);
    }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
}

function init() {
  const year = String(new Date().getFullYear());
  el('currentYear').textContent = year;
  el('footerYear').textContent = year;
  attachEvents();
  renderBrandAndStory();
  setSlide(0, true);
  renderAlbums();
  onScroll();
  startFirebase();
}
init();

// Export for optional console testing (not used by site code).
export { imagekitUrl, safeUrl, DEFAULT_SITE };
