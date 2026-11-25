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
  apiKey: 'AIzaSyDrQPZ8VKwY7go8sNL366lpzm4Pl75h6kk',
  authDomain: 'givi-cca58.firebaseapp.com',
  projectId: 'givi-cca58',
  storageBucket: 'givi-cca58.firebasestorage.app',
  messagingSenderId: '390668829442',
  appId: '1:390668829442:web:61f4230072315405d7b81b',
  measurementId: 'G-32F8BRRMXC'
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
  defaultLanguage: 'en',
  autoSlideSeconds: 6,
  accentColor: '#E11D48',
  typography: { tySmall:13,tyBody:16,tyNav:13,tyButton:13,tyAlbum:28,tySection:72,tyHero:144,tyStory:112,tyContact:96 },
  uiText: {},
  musicEnabled: false,
  musicUrl: '',
  musicVolume: 25,
  brandTagline: 'PHOTO STORIES',
  profileName: 'YOUR NAME',
  profileRole: 'PHOTOGRAPHER · VISUAL STORYTELLER',
  profileBio: 'Saya mengabadikan manusia, perjalanan, dan cerita melalui cahaya.',
  profilePhotoUrl: '',
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

const LANGUAGES = ['en','id','ja'];
const SITE_TRANSLATABLE = ['brandTagline','profileRole','profileBio','storyEyebrow','storyTitle','storyDescription','aboutIntro'];
const HIGHLIGHT_TRANSLATABLE = ['label','kicker','headline','description','cardTitle','cardDescription'];
const ALBUM_TRANSLATABLE = ['title','description'];
const PHOTO_TRANSLATABLE = ['title','description'];
const TRANSLATIONS = {
  en: {
    navHome:'HOME',navAlbums:'ALBUMS',navAbout:'ABOUT',navContact:'CONTACT',
    explore:'EXPLORE MY WORK', featuredHighlights:'FEATURED HIGHLIGHTS', scrollDiscover:'SCROLL TO DISCOVER',
    behindLens:'BEHIND THE LENS', collection:'A COLLECTION OF MOMENTS', selected:'SELECTED', albums:'ALBUMS',
    albumsSubtitle:'Different perspectives, one language: light.',
    contactEyebrow:'YOUR STORY, THROUGH MY LENS',contactHead1:"LET’S MAKE", contactHead2:'IT TIMELESS.',
    contactBody:'Planning a portrait session, editorial project or collaboration? I would love to hear it.',
    letsTalk:"LET’S TALK", all:'ALL', photo:'PHOTO',photos:'PHOTOS',
    results:'Showing {shown} of {total} albums',loadMore:'LOAD MORE',albumExample:'DEMO · edit to publish',
    addHighlight:'+ ADD HIGHLIGHT', added:'Highlight saved.', removed:'Highlight removed.',
    noExif:'EXIF information is unavailable for this photo.',
    albumEmpty:'No matching albums', albumEmptyText:'Try another search or category.',
    create:'LET’S CREATE SOMETHING', selectedWork:'SELECTED WORK',
    footerDescriptor:'INDEPENDENT PHOTOGRAPHY PORTFOLIO',rights:'ALL RIGHTS RESERVED',noPhotos:'No photos yet in this album.',resetFilter:'RESET FILTER',addAlbum:'+ ADD ALBUM',editProfile:'EDIT PROFILE ↗',editAlbum:'EDIT ALBUM',addPhoto:'+ ADD PHOTO',editSite:'Edit Header / Showcase', viewMoreAlbums:'VIEW MORE ALBUMS',collapseAlbums:'COLLAPSE ALBUMS',albumFootnote:'THE BEAUTY IS IN THE IN-BETWEEN', searchPlaceholder:'Search albums, categories, stories…',instagramLabel:'INSTAGRAM',viewPhoto:'VIEW PHOTO',deleteAlbum:'DELETE',editPhoto:'EDIT',deletePhoto:'DELETE'
  },
  id: {
    navHome:'BERANDA',navAlbums:'ALBUM',navAbout:'TENTANG',navContact:'KONTAK',
    explore:'JELAJAHI KARYA',featuredHighlights:'HIGHLIGHT PILIHAN',scrollDiscover:'GULIR UNTUK MELIHAT',
    behindLens:'DI BALIK LENSA',collection:'KOLEKSI MOMEN',selected:'ALBUM',albums:'PILIHAN',
    albumsSubtitle:'Berbagai sudut pandang, satu bahasa: cahaya.',
    contactEyebrow:'CERITAMU, MELALUI LENSANYA',contactHead1:'ABADIKAN',contactHead2:'MOMEN BERHARGA.',
    contactBody:'Punya ide pemotretan, proyek editorial, atau kolaborasi? Saya ingin mendengarnya.',
    letsTalk:'HUBUNGI SAYA',all:'SEMUA', photo:'FOTO',photos:'FOTO',
    results:'Menampilkan {shown} dari {total} album',loadMore:'LIHAT LAGI',albumExample:'DEMO · edit untuk menerbitkan',
    addHighlight:'+ TAMBAH HIGHLIGHT',added:'Highlight tersimpan.',removed:'Highlight dihapus.',
    noExif:'Data EXIF tidak tersedia untuk foto ini.',
    albumEmpty:'Album tidak ditemukan', albumEmptyText:'Coba pencarian atau kategori lainnya.',
    create:'MARI BERKOLABORASI',selectedWork:'KARYA PILIHAN',
    footerDescriptor:'PORTOFOLIO FOTOGRAFI',rights:'HAK CIPTA DILINDUNGI',noPhotos:'Album ini belum memiliki foto.',resetFilter:'RESET FILTER',addAlbum:'+ TAMBAH ALBUM',editProfile:'EDIT PROFIL ↗',editAlbum:'EDIT ALBUM',addPhoto:'+ TAMBAH FOTO',editSite:'Edit Header / Showcase',viewMoreAlbums:'LIHAT SEMUA ALBUM',collapseAlbums:'CIUTKAN ALBUM',albumFootnote:'KEINDAHAN ADA DI ANTARA MOMEN',searchPlaceholder:'Cari album, kategori, cerita…',instagramLabel:'INSTAGRAM',viewPhoto:'LIHAT FOTO',deleteAlbum:'HAPUS',editPhoto:'EDIT',deletePhoto:'HAPUS'
  },
  ja: {
    navHome:'ホーム',navAlbums:'アルバム',navAbout:'プロフィール',navContact:'お問い合わせ',
    explore:'作品を見る',featuredHighlights:'注目のハイライト',scrollDiscover:'スクロールして見る',
    behindLens:'レンズの向こう',collection:'瞬間のコレクション',selected:'厳選',albums:'アルバム',
    albumsSubtitle:'さまざまな視点をつなぐ、ひとつの光。',
    contactEyebrow:'あなたの物語を、私のレンズで',contactHead1:'大切な瞬間を',contactHead2:'永遠に。',
    contactBody:'撮影やコラボレーションについて、お気軽にご相談ください。',
    letsTalk:'お問い合わせ',all:'すべて',photo:'写真',photos:'写真',
    results:'{total}件中 {shown}件を表示',loadMore:'もっと見る',albumExample:'デモ · 編集して公開',
    addHighlight:'+ ハイライトを追加',added:'ハイライトを保存しました。',removed:'ハイライトを削除しました。',
    noExif:'EXIF情報はありません。',
    albumEmpty:'アルバムが見つかりません', albumEmptyText:'別のキーワードやカテゴリをお試しください。',
    create:'一緒に作品を作りましょう',selectedWork:'注目の作品',
    footerDescriptor:'フォトグラフィーポートフォリオ',rights:'無断転載を禁じます',noPhotos:'このアルバムにはまだ写真がありません。',resetFilter:'絞り込みを解除',addAlbum:'+ アルバムを追加',editProfile:'プロフィールを編集 ↗',editAlbum:'アルバムを編集',addPhoto:'+ 写真を追加',editSite:'サイトを編集',viewMoreAlbums:'すべてのアルバム',collapseAlbums:'閉じる',albumFootnote:'美しさはその合間にある',searchPlaceholder:'アルバムやカテゴリを検索…',instagramLabel:'インスタグラム',viewPhoto:'写真を見る',deleteAlbum:'削除',editPhoto:'編集',deletePhoto:'削除'
  }
};
const UI_TEXT_FIELDS = [
  ['NAVBAR', [['navHome','Home menu'],['navAlbums','Albums menu'],['navAbout','About menu'],['navContact','Contact menu'],['featuredHighlights','Label highlight kanan'],['scrollDiscover','Scroll label']]],
  ['PROFILE & ALBUMS', [['behindLens','Label profil'],['collection','Label di atas Selected Albums'],['selected','Judul album - kata pertama'],['albums','Judul album - kata kedua'],['albumsSubtitle','Subjudul album'],['selectedWork','Label setiap kartu highlight'],['viewMoreAlbums','Tombol buka semua album'],['collapseAlbums','Tombol collapse'],['loadMore','Tombol Load More'],['albumFootnote','Catatan bawah album'],['all','Semua kategori'],['results','Jumlah album (gunakan {shown} dan {total})'],['albumEmpty','Judul album kosong'],['albumEmptyText','Deskripsi album kosong'],['resetFilter','Tombol reset filter'],['searchPlaceholder','Placeholder pencarian']]],
  ['SHOWCASE & CONTACT', [['create','Tombol showcase'],['contactEyebrow','Label contact'],['contactHead1','Judul contact baris pertama'],['contactHead2','Judul contact baris kedua'],['contactBody','Deskripsi contact'],['letsTalk','Tombol email'],['instagramLabel','Label Instagram'],['footerDescriptor','Deskripsi footer'],['rights','Teks copyright']]],
  ['GALERI & TOMBOL', [['photo','Singular foto'],['photos','Plural foto'],['noExif','Keterangan jika tidak ada EXIF'],['noPhotos','Album tanpa foto'],['albumExample','Label album demo'],['editProfile','Tombol edit profil'],['editAlbum','Tombol edit album'],['addAlbum','Tombol tambah album'],['addPhoto','Tombol tambah foto'],['addHighlight','Tombol tambah highlight'],['editSite','Tombol edit site'],['viewPhoto','Teks hover foto'],['deleteAlbum','Tombol hapus album'],['editPhoto','Tombol edit foto'],['deletePhoto','Tombol hapus foto']]]
];
const ALL_UI_TEXT_KEYS = UI_TEXT_FIELDS.flatMap(([,fields]) => fields.map(([key]) => key));
const TYPOGRAPHY_RULES = {
  tySmall:[11,20,13],tyBody:[13,24,16],tyNav:[11,20,13],tyButton:[11,19,13],
  tyAlbum:[20,46,28],tySection:[42,102,72],tyHero:[75,180,144],
  tyStory:[64,156,112],tyContact:[50,136,96]
};
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const clampRange = (value, rule) => Math.min(rule[1], Math.max(rule[0], Number.isFinite(Number(value)) ? Number(value) : rule[2]));
function applyAppearance(accent = state.site.accentColor, typography = state.site.typography) {
  const hex = HEX_COLOR.test(String(accent)) ? String(accent).toUpperCase() : '#E11D48';
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  const rgb = [1,3,5].map(x => parseInt(hex.slice(x,x+2),16));
  root.style.setProperty('--accent-rgb', rgb.join(' '));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content','#0B0E14');
  for (const [key, rule] of Object.entries(TYPOGRAPHY_RULES)) {
    root.style.setProperty('--'+key, `${clampRange(typography?.[key] ?? rule[2],rule)}px`);
  }
}
function renderUiTextFields(language) {
  const container = el('siteUiTextFields');
  const dict = uiTextEditorDraft[language] || {};
  container.innerHTML = UI_TEXT_FIELDS.map(([group,fields]) =>
    `<fieldset><legend>${escapeHtml(group)}</legend><div class="ui-text-fields__grid">${fields.map(([key,label]) => {
      const current = dict[key] ?? TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? '';
      return `<label>${escapeHtml(label)}<textarea rows="1" data-ui-key="${escapeHtml(key)}" spellcheck="true">${escapeHtml(current)}</textarea></label>`;
    }).join('')}</div></fieldset>`
  ).join('');
}
let uiTextEditorDraft = {};
let uiTextEditorLanguage = 'en';
function captureUiTextLocale() {
  const draft = uiTextEditorDraft[uiTextEditorLanguage] || {};
  el('siteUiTextFields').querySelectorAll('[data-ui-key]').forEach(field => {
    draft[field.dataset.uiKey] = field.value;
  });
  uiTextEditorDraft[uiTextEditorLanguage] = draft;
}
function switchUiTextLocale(language) {
  uiTextEditorLanguage = LANGUAGES.includes(language) ? language : 'en';
  el('siteUiTextLanguage').value = uiTextEditorLanguage;
  renderUiTextFields(uiTextEditorLanguage);
}
const t = (key) => state.site?.uiText?.[state.language]?.[key] || TRANSLATIONS[state.language]?.[key] || TRANSLATIONS.en[key] || key;
function translateContent(item, key) {
  const localized = item?.translations?.[state.language]?.[key];
  return typeof localized === 'string' && localized.trim() ? localized : (item?.[key] ?? '');
}
function formatted(key, vars = {}) {
  return t(key).replace(/\{(\w+)\}/g, (_,name) => String(vars[name] ?? ''));
}
function applyLanguage(shouldRender = true) {
  document.documentElement.lang = state.language;
  el('languageSelect').value = state.language;
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  const empty = el('albumEmpty');
  if (empty) {
    const title = empty.querySelector('h3');
    const description = empty.querySelector('p');
    if (title) title.textContent = t('albumEmpty');
    if (description) description.textContent = t('albumEmptyText');
  }
  el('searchInput').placeholder = t('searchPlaceholder');
  el('instagramLink').textContent = t('instagramLabel') + ' ↗';
  document.documentElement.style.setProperty('--view-photo-label', JSON.stringify(t('viewPhoto')));
  if (shouldRender) {
    renderBrandAndStory();
    setSlide(state.activeSlide, false);
    renderAlbums();
    if (!el('galleryModal').hidden) renderGallery();
    if (!el('lightboxModal').hidden) renderLightbox();
  }
}
function setLanguage(value, explicit = true) {
  if (!LANGUAGES.includes(value)) return;
  state.language = value;
  if (explicit) {
    state.languageExplicit = true;
    try { window.localStorage.setItem('givi-shashin-language', value); } catch { /* storage optional */ }
  }
  applyLanguage();
}
const clampSeconds = (value) => Math.max(0, Math.min(120, Number(value) || 0));
let heroAutoTimer = null;
function resetAutoSlide() {
  clearInterval(heroAutoTimer);
  heroAutoTimer = null;
  const seconds = clampSeconds(state.site.autoSlideSeconds ?? 6);
  if (!state.booted || seconds === 0 || getHighlights().length < 2 || document.hidden ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  heroAutoTimer = window.setInterval(() => {
    setSlide((state.activeSlide + 1) % getHighlights().length);
  }, seconds * 1000);
}
function updateHighlightWindow(delta) {
  const count = getHighlights().length;
  const max = Math.max(0, count - 3);
  state.highlightOffset = Math.max(0, Math.min(max, state.highlightOffset + delta));
  // Make a newly revealed highlight active, so navigation provides immediate feedback.
  if (state.activeSlide < state.highlightOffset || state.activeSlide >= state.highlightOffset + 3) {
    setSlide(delta < 0 ? state.highlightOffset : Math.min(count - 1, state.highlightOffset + 2));
  } else renderHighlights();
  resetAutoSlide();
}
function ensureActiveVisible() {
  const total = getHighlights().length;
  const max = Math.max(0,total - 3);
  if (state.activeSlide < state.highlightOffset) state.highlightOffset = state.activeSlide;
  if (state.activeSlide >= state.highlightOffset + 3) state.highlightOffset = state.activeSlide - 2;
  state.highlightOffset = Math.max(0, Math.min(max, state.highlightOffset));
}
let wheelThrottleAt = 0;
function onHighlightWheel(event) {
  if (getHighlights().length <= 3 || Math.abs(event.deltaY) < 2) return;
  const direction = Math.sign(event.deltaY);
  const max = getHighlights().length - 3;
  if ((direction < 0 && state.highlightOffset <= 0) || (direction > 0 && state.highlightOffset >= max)) return;
  event.preventDefault();
  if (performance.now() - wheelThrottleAt < 350) return;
  wheelThrottleAt = performance.now();
  updateHighlightWindow(direction);
}
function finishBoot(warning = '') {
  if (state.booted) return;
  state.booted = true;
  if (warning) console.warn('[Givi Shashin]', warning);
  applyLanguage(false);
  applyAppearance();
  configureAmbientAudio();
  renderBrandAndStory();
  setSlide(Math.min(state.activeSlide, getHighlights().length - 1),true);
  renderAlbums();
  updateAdminUi();
  resetAutoSlide();
  startCarouselAnimation();
  const loader = el('bootScreen');
  document.body.classList.remove('is-booting');
  loader.hidden = true;
  onScroll();
}
function setBootMessage(message) {
  const node = el('bootMessage');
  if (node) node.textContent = message;
}

const ALBUM_PAGE_SIZE = 8;

const state = {
  site: structuredClone(DEFAULT_SITE),
  albums: [], // Empty Firestore collection => visual demo albums (not saved).
  user: null,
  admin: false,
  firebaseReady: false,
  albumsLoaded: false,
  activeSlide: 0,
  highlightOffset: 0,
  language: 'en',
  languageExplicit: false,
  booted: false,
  activeAlbumId: null,
  activePhotoIndex: 0,
  currentCategory: 'ALL',
  currentQuery: '',
  visibleAlbumCount: ALBUM_PAGE_SIZE,
  albumsExpanded: false,
  albumCarouselHover: false,
  albumCarouselDrag: false,
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

// Use the public original first, everywhere. Transformations are a secondary
// candidate only (not forced), because ImageKit can reject transformations of
// high-resolution originals even when its unmodified URL works.
function originalImageUrl(rawUrl) {
  const input = safeUrl(rawUrl);
  if (!input) return '';
  const url = new URL(input);
  if (url.hostname.toLowerCase() !== 'ik.imagekit.io') return url.href;
  url.searchParams.delete('tr');
  // ImageKit also supports path-based transformations: /tr:w-600,q-80/...
  url.pathname = url.pathname.replace(/\/tr:[^/]+(?=\/)/g, '');
  return url.href;
}
function imagekitUrl(rawUrl, mode = 'thumb') {
  const original = originalImageUrl(rawUrl);
  if (!original) return '';
  const url = new URL(original);
  if (url.hostname.toLowerCase() === 'ik.imagekit.io') {
    url.searchParams.set('tr', mode === 'large' ? 'w-1800,q-90' : 'w-600,q-80');
  }
  return url.href;
}
function imageCandidates(rawUrl, mode = 'thumb') {
  const raw = safeUrl(rawUrl);
  if (!raw) return [];
  const original = originalImageUrl(raw);
  const list = [original, raw];
  if (new URL(raw).hostname.toLowerCase() === 'ik.imagekit.io') {
    list.push(imagekitUrl(original, mode));
  }
  return [...new Set(list.filter(Boolean))];
}
// Local placeholder is shown only if *all* provider URLs fail. It is not uploaded
// to Firestore and does not replace the user's saved image URL.
const IMAGE_FALLBACK = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" fill="#182131"/><path d="M120 348l114-120 75 81 99-111 112 150" fill="none" stroke="#526074" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="208" cy="139" r="29" fill="#526074"/><text x="320" y="408" fill="#94A3B8" font-family="Arial,sans-serif" text-anchor="middle" font-size="24" letter-spacing="3">IMAGE UNAVAILABLE</text></svg>'
);

function setResilientImage(element, rawUrl, mode = 'thumb') {
  const raw = safeUrl(rawUrl);
  const candidates = imageCandidates(raw, mode);
  element.dataset.imageSource = raw;
  element.dataset.imageMode = mode;
  element.dataset.imageAttempt = '0';
  element.src = candidates[0] || IMAGE_FALLBACK;
}
function resilientImageAttrs(rawUrl, mode = 'thumb') {
  const source = safeUrl(rawUrl);
  const first = imageCandidates(source, mode)[0] || IMAGE_FALLBACK;
  return `src="${escapeHtml(first)}" data-image-source="${escapeHtml(source)}" data-image-mode="${mode}" data-image-attempt="0"`;
}
// Capturing error events also handles images inserted later by renderAlbums /
// renderGallery. A source is never retried twice, so broken links cannot loop.
function onImageError(event) {
  const node = event.target;
  if (!(node instanceof HTMLImageElement) || !node.hasAttribute('data-image-source')) return;
  const candidates = imageCandidates(node.dataset.imageSource, node.dataset.imageMode || 'thumb');
  const nextIndex = Number(node.dataset.imageAttempt || 0) + 1;
  if (nextIndex < candidates.length) {
    node.dataset.imageAttempt = String(nextIndex);
    node.src = candidates[nextIndex];
    return;
  }
  console.warn('[Givi Shashin] URL gambar tidak tersedia:', node.dataset.imageSource);
  node.removeAttribute('data-image-source');
  node.src = IMAGE_FALLBACK;
}

function loadImageUrl(rawUrl, mode = 'large', fallbackUrl = '') {
  const candidates = [...new Set([...imageCandidates(rawUrl, mode), ...imageCandidates(fallbackUrl, mode)])];
  return new Promise(resolve => {
    let index = 0;
    const attempt = () => {
      if (index >= candidates.length) { resolve(''); return; }
      const candidate = candidates[index++];
      const image = new Image();
      image.onload = () => resolve(candidate);
      image.onerror = attempt;
      image.src = candidate;
    };
    attempt();
  });
}

const e = escapeHtml;
const albumsToDisplay = () => state.albums.length ? state.albums : (state.site.albumsInitialized ? [] : DEMO_ALBUMS);
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

// Profile uses the same robust original-first loader as every other image.
// The initials appear only when neither the original nor the optional fallback works.
let avatarLoadVersion = 0;
function renderProfile() {
  const site = state.site;
  const name = String(site.profileName || DEFAULT_SITE.profileName).trim();
  el('profileName').textContent = name;
  el('profileRole').textContent = translateContent(site, 'profileRole') || DEFAULT_SITE.profileRole;
  el('profileBio').textContent = translateContent(site, 'profileBio') || DEFAULT_SITE.profileBio;
  const initials = name.split(/\s+/).filter(Boolean).slice(0,2)
    .map(part => part[0]).join('').toUpperCase() || 'ME';
  const placeholder = el('profileAvatarPlaceholder');
  const avatar = el('profileAvatar');
  placeholder.textContent = initials;
  avatar.alt = `Foto profil ${name}`;
  const inputUrl = safeUrl(site.profilePhotoUrl);
  if (avatar.dataset.profileSource === inputUrl) return;
  avatar.dataset.profileSource = inputUrl;
  const version = ++avatarLoadVersion;
  avatar.hidden = true;
  placeholder.hidden = false;
  avatar.removeAttribute('src');
  if (!inputUrl) return;
  loadImageUrl(inputUrl, 'thumb').then(url => {
    if (version !== avatarLoadVersion) return;
    if (!url) {
      console.warn('[Givi Shashin] Foto profil tidak bisa dimuat:', inputUrl);
      return;
    }
    avatar.src = url;
    avatar.hidden = false;
    placeholder.hidden = true;
  });
}

let profilePreviewCounter = 0;
let profilePreviewDebounce;
// Show a real image loading test inside the admin form. Does not use Firebase
// or ImageKit's SDK and therefore works with normal HTTPS public images too.
function checkProfilePhotoUrl() {
  const input = el('siteProfilePhoto');
  const preview = el('profileUrlPreview');
  const fallback = el('profileUrlPreviewFallback');
  const status = el('profileUrlStatus');
  const openLink = el('profileUrlOpen');
  const current = ++profilePreviewCounter;
  const raw = input.value.trim();
  const url = safeUrl(raw);
  preview.hidden = true;
  fallback.hidden = false;
  openLink.hidden = !url;
  if (url) openLink.href = url;
  else openLink.removeAttribute('href');

  if (!raw) {
    status.textContent = 'Belum ada URL foto. Inisial nama akan ditampilkan.';
    status.dataset.status = 'idle';
    return;
  }
  if (!url) {
    status.textContent = 'URL tidak valid. Gunakan URL publik HTTPS dari ImageKit.';
    status.dataset.status = 'error';
    return;
  }
  status.textContent = 'Sedang memeriksa apakah foto bisa dibuka...';
  status.dataset.status = 'loading';
  loadImageUrl(url, 'thumb').then(usable => {
    if (current !== profilePreviewCounter) return;
    if (!usable) {
      status.textContent = 'URL tidak berhasil dimuat. Periksa Copy URL, status publik, dan batas ukuran gambar di ImageKit.';
      status.dataset.status = 'error';
      return;
    }
    preview.src = usable;
    preview.hidden = false;
    fallback.hidden = true;
    status.textContent = usable === originalImageUrl(url)
      ? 'Foto asli berhasil dimuat. Klik SIMPAN PERUBAHAN untuk menerapkannya.'
      : 'Foto berhasil dimuat memakai URL alternatif. Klik SIMPAN PERUBAHAN.';
    status.dataset.status = 'ok';
  });
}

function renderBrandAndStory() {
  const site = state.site;
  renderProfile();
  el('brandName').textContent = site.brandName || DEFAULT_SITE.brandName;
  el('brandTagline').textContent = translateContent(site, 'brandTagline') || 'PHOTO STORIES';
  el('footerBrand').textContent = site.brandName || DEFAULT_SITE.brandName;
  document.title = `${site.brandName || 'ATELIER.'} — Photography Portfolio`;
  el('storyEyebrow').textContent = translateContent(site, 'storyEyebrow') || '';
  setHeadline('storyTitle', translateContent(site, 'storyTitle') || DEFAULT_SITE.storyTitle);
  el('storyDescription').textContent = translateContent(site, 'storyDescription') || '';
  el('aboutIntro').textContent = translateContent(site, 'aboutIntro') || '';
  renderStoryBackground(site.storyImageUrl);
  const thumbs = [site.storyThumbOneUrl, site.storyThumbTwoUrl].filter((url) => safeUrl(url));
  el('storyThumbs').innerHTML = thumbs.map((url, i) =>
    `<div class="showcase-thumb"><img loading="lazy" ${resilientImageAttrs(url)} alt="Preview story ${i + 1}"></div>`
  ).join('');
  const email = String(site.contactEmail || '').trim();
  el('contactEmail').href = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? `mailto:${encodeURIComponent(email)}` : 'mailto:hello@example.com';
  el('instagramLink').href = safeUrl(site.instagramUrl, 'https://www.instagram.com/');
}

function getHighlights() {
  const raw = state.site.highlights;
  if (Array.isArray(raw) && raw.length) {
    return raw.map((item,i) => ({...DEFAULT_SITE.highlights[i % DEFAULT_SITE.highlights.length], ...item}));
  }
  return structuredClone(DEFAULT_SITE.highlights);
}

let storyBackgroundVersion = 0;
function renderStoryBackground(rawUrl) {
  const version = ++storyBackgroundVersion;
  loadImageUrl(rawUrl, 'large', DEFAULT_SITE.storyImageUrl).then(source => {
    if (version !== storyBackgroundVersion) return;
    el('storyBackground').style.backgroundImage = source ? `url("${source}")` : 'none';
  });
}

let heroBackgroundVersion = 0;
let lastHeroImageUrl = null;
function changeBackground(url, firstRender = false) {
  const version = ++heroBackgroundVersion;
  loadImageUrl(url, 'large', DEFAULT_SITE.highlights[0].imageUrl).then(source => {
    if (version !== heroBackgroundVersion) return;
    const current = el(state.backgroundSlot === 0 ? 'heroBgA' : 'heroBgB');
    if (firstRender) {
      current.style.backgroundImage = source ? `url("${source}")` : 'none';
      current.classList.add('is-visible');
      return;
    }
    const nextSlot = state.backgroundSlot === 0 ? 1 : 0;
    const next = el(nextSlot === 0 ? 'heroBgA' : 'heroBgB');
    next.style.backgroundImage = source ? `url("${source}")` : 'none';
    next.classList.remove('is-visible');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (version !== heroBackgroundVersion) return;
      next.classList.add('is-visible');
      current.classList.remove('is-visible');
    }));
    state.backgroundSlot = nextSlot;
  });
}

function setSlide(index, initial = false) {
  const slides = getHighlights();
  if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
  const changed = index !== state.activeSlide;
  state.activeSlide = index;
  ensureActiveVisible();
  const slide = slides[index];
  el('heroKicker').textContent = translateContent(slide, 'kicker') || '';
  setHeadline('heroTitle', translateContent(slide,'headline'));
  el('heroDescription').textContent = translateContent(slide,'description') || '';
  // Keep existing hero image on language-only changes; avoid an unwanted flash.
  if (initial || changed || lastHeroImageUrl !== slide.imageUrl || !el('heroBgA').style.backgroundImage) {
    lastHeroImageUrl = slide.imageUrl;
    changeBackground(slide.imageUrl, initial);
  }
  renderHighlights();
}
function renderHighlights() {
  const slides = getHighlights();
  const visible = slides.slice(state.highlightOffset, state.highlightOffset + 3);
  const items = visible.map((slide,index) => ({slide, index:state.highlightOffset + index}));
  el('highlightList').innerHTML = items.map(({slide,index:i}) => `
    <div class="highlight-item ${i === state.activeSlide ? 'is-active' : ''}">
      <button class="highlight-item__select" type="button" data-slide="${i}" aria-pressed="${i === state.activeSlide}">
        <span>${e(translateContent(slide,'label'))}</span><span class="highlight-item__number">${capitalizeId(i)}</span>
      </button>
      ${state.admin ? `<button type="button" class="highlight-item__edit" data-edit-highlight="${i}" aria-label="Edit highlight ${i+1}">EDIT</button>` : ''}
    </div>`).join('');
  el('heroTeasers').innerHTML = items.map(({slide,index:i}) => `
    <button class="hero-teaser ${i === state.activeSlide ? 'is-active' : ''}" type="button" data-slide="${i}" aria-pressed="${i === state.activeSlide}">
      <span class="hero-teaser__number">${capitalizeId(i)} / ${e(t('selectedWork'))}</span>
      <strong class="hero-teaser__title">${e(translateContent(slide,'cardTitle'))}</strong>
      <span class="hero-teaser__description">${e(translateContent(slide,'cardDescription'))}</span>
    </button>`).join('');
  const total = slides.length;
  const status = el('highlightWindowStatus');
  status.textContent = `${capitalizeId(state.highlightOffset)}–${String(Math.min(total, state.highlightOffset+3)).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
  document.querySelectorAll('[data-highlight-nav]').forEach(button => {
    button.disabled = total <= 3 || (Number(button.dataset.highlightNav) < 0 ? state.highlightOffset === 0 : state.highlightOffset >= total - 3);
  });
  el('addHighlightButton').textContent = t('addHighlight');
}

function renderFilters() {
  const available = Array.from(new Set(albumsToDisplay().map((a) => String(a.category || '').trim().toUpperCase()).filter(Boolean))).sort();
  const categories = ['ALL', ...available];
  if (!categories.includes(state.currentCategory)) state.currentCategory = 'ALL';
  el('categoryFilters').innerHTML = categories.map((category) =>
    `<button type="button" class="filter-chip ${state.currentCategory === category ? 'is-selected':''}" data-filter="${e(category)}" aria-pressed="${state.currentCategory === category}">${category === 'ALL' ? e(t('all')) : e(category)}</button>`
  ).join('');
}

// Album carousel is the default view. Expanded view remains paginated by 8.
// Three repeated segments allow seamless wrapping without cloning Firestore data.
let carouselRaf = 0;
let carouselLastFrame = 0;
let carouselAutoFraction = 0;
let carouselIdleUntil = 0;
let carouselSegment = 0;
let carouselDragState = null;
const CAROUSEL_IDLE_MS = 5000;
const CAROUSEL_SPEED_PX = 15;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function postponeCarouselAuto(ms = CAROUSEL_IDLE_MS) {
  carouselIdleUntil = performance.now() + ms;
}
function normalizeCarouselPosition() {
  if (state.albumsExpanded || !carouselSegment) return;
  const vp = el('albumCarouselViewport');
  if (vp.scrollLeft < carouselSegment * .5) vp.scrollLeft += carouselSegment;
  else if (vp.scrollLeft >= carouselSegment * 1.5) vp.scrollLeft -= carouselSegment;
}
function resetCarouselPosition() {
  if (state.albumsExpanded) return;
  const vp = el('albumCarouselViewport');
  const first = el('albumGrid').querySelector('.album-card');
  if (!first) {carouselSegment = 0;return;}
  const gap = parseFloat(getComputedStyle(el('albumGrid')).gap) || 0;
  const count = Number(el('albumGrid').dataset.albumCount || 0);
  carouselSegment = (first.getBoundingClientRect().width + gap) * count;
  vp.scrollLeft = carouselSegment;
  postponeCarouselAuto();
}
function renderAlbumCard(album, index, duplicate = false) {
  const demo = isDemoAlbum(album);
  const cover = safeUrl(album.coverUrl) || safeUrl(normalizedPhotos(album)[0]?.url) || DEFAULT_SITE.highlights[0].imageUrl;
  const title = translateContent(album,'title');
  return `<article class="album-card" ${duplicate ? 'aria-hidden="true"' : ''}>
    <button class="album-card__link" type="button" data-open-album="${e(album.id)}" aria-label="Open album ${e(title)}" ${duplicate ? 'tabindex="-1"' : ''}>
      <span class="album-card__image-wrap"><img class="album-card__image" loading="lazy" ${resilientImageAttrs(cover)} alt="Cover album ${e(title)}">
        <span class="album-card__type">${e(album.category || 'PORTFOLIO')}</span><span class="album-card__sequence">${capitalizeId(index)}</span></span>
      <span class="album-card__info"><strong class="album-card__title">${e(title)}</strong><span class="album-card__description">${e(translateContent(album,'description'))}</span></span>
    </button>
    ${state.admin ? `<div class="album-card__actions"><button class="mini-button" type="button" data-edit-album="${e(album.id)}" ${duplicate ? 'tabindex="-1"' : ''}>${e(t('editAlbum'))}</button><button class="mini-button mini-button--danger" type="button" data-delete-album="${e(album.id)}" ${duplicate ? 'tabindex="-1"' : ''}>${e(t('deleteAlbum'))}</button></div>${demo ? `<p class="demo-tag">${e(t('albumExample'))}</p>` : ''}` : ''}
  </article>`;
}
function getFilteredAlbums() {
  const query = state.currentQuery.trim().toLocaleLowerCase('id-ID');
  return albumsToDisplay().slice().sort(bySortOrder).filter(album => {
    const matchesCategory = state.currentCategory === 'ALL' || String(album.category || '').toUpperCase() === state.currentCategory;
    const text = [album.title,album.description,album.category,translateContent(album,'title'),translateContent(album,'description')].join(' ').toLocaleLowerCase();
    return matchesCategory && (!query || text.includes(query));
  });
}
function renderAlbums() {
  const selected = getFilteredAlbums();
  // Search and category filters need the whole current result set, not auto-moving covers.
  const expanded = state.albumsExpanded || state.currentQuery.trim() !== '' || state.currentCategory !== 'ALL';
  const grid = el('albumGrid');
  const carousel = el('albumCarousel');
  carousel.classList.toggle('is-expanded',expanded);
  grid.classList.toggle('is-carousel',!expanded);
  grid.dataset.albumCount = String(selected.length);
  if (expanded) {
    const visible = selected.slice(0,state.visibleAlbumCount);
    grid.innerHTML = visible.map((album,i) => renderAlbumCard(album,i)).join('');
    el('albumExpand').hidden = true;
    el('albumCollapse').hidden = !state.albumsExpanded;
    const remaining = Math.max(0,selected.length-visible.length);
    el('albumLoadMore').hidden = remaining === 0;
    if (remaining) el('albumLoadMoreCount').textContent = String(Math.min(ALBUM_PAGE_SIZE,remaining));
    el('albumPagerStatus').hidden = selected.length <= ALBUM_PAGE_SIZE;
    el('albumPagerStatus').textContent = formatted('results',{shown:visible.length,total:selected.length});
  } else {
    // When only one album exists, no repeated DOM is necessary.
    const duplicate = selected.length > 1;
    const base = selected.map((a,i) => renderAlbumCard(a,i));
    const clones = duplicate ? selected.map((a,i) => renderAlbumCard(a,i,true)) : [];
    grid.innerHTML = [...clones,...base,...clones].join('');
    el('albumExpand').hidden = selected.length <= 4;
    el('albumCollapse').hidden = true;
    el('albumLoadMore').hidden = true;
    el('albumPagerStatus').hidden = true;
    requestAnimationFrame(resetCarouselPosition);
  }
  carousel.classList.toggle('is-single',selected.length <= 1);
  el('albumEmpty').hidden = selected.length > 0;
  renderFilters();
  refreshImportButton();
}
function expandAlbums() {
  state.albumsExpanded = true;
  state.visibleAlbumCount = ALBUM_PAGE_SIZE;
  renderAlbums();
}
function collapseAlbums() {
  state.albumsExpanded = false;
  state.visibleAlbumCount = ALBUM_PAGE_SIZE;
  state.currentCategory = 'ALL';
  state.currentQuery = '';
  el('searchInput').value = '';
  renderAlbums();
  el('albums').scrollIntoView({behavior: reducedMotion() ? 'auto':'smooth',block:'start'});
}
function scrollAlbumCarousel(direction) {
  if (state.albumsExpanded || carouselSegment === 0) return;
  postponeCarouselAuto(5500);
  const vp = el('albumCarouselViewport');
  const card = el('albumGrid').querySelector('.album-card');
  const gap = parseFloat(getComputedStyle(el('albumGrid')).gap) || 0;
  if (!card) return;
  vp.scrollBy({left:(card.getBoundingClientRect().width+gap)*direction,behavior:reducedMotion()?'auto':'smooth'});
}
function startCarouselAnimation() {
  if (carouselRaf) return;
  postponeCarouselAuto();
  function tick(now) {
    const dt = carouselLastFrame ? Math.min(60,now-carouselLastFrame) : 16;
    carouselLastFrame = now;
    const vp = el('albumCarouselViewport');
    const box = vp.getBoundingClientRect();
    const visible = box.bottom > 0 && box.top < window.innerHeight;
    if (state.booted && !state.albumsExpanded && !state.albumCarouselHover &&
        !state.albumCarouselDrag && !document.hidden && visible &&
        now >= carouselIdleUntil && carouselSegment > 0 && !reducedMotion() &&
        !state.modalStack.length && getFilteredAlbums().length > 1) {
      // Preserve fractional pixels: some browsers round scrollLeft to integers.
      carouselAutoFraction += CAROUSEL_SPEED_PX * dt / 1000;
      const wholePixels = Math.floor(carouselAutoFraction);
      if (wholePixels > 0) {
        vp.scrollLeft += wholePixels;
        carouselAutoFraction -= wholePixels;
        normalizeCarouselPosition();
      }
    }
    carouselRaf = requestAnimationFrame(tick);
  }
  carouselRaf = requestAnimationFrame(tick);
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
  if (id === 'siteModal') applyAppearance();
  const node = el(id);
  if (!node || node.hidden) return;
  node.hidden = true;
  state.modalStack = state.modalStack.filter((modalId) => modalId !== id);
  if (!state.modalStack.length) document.body.classList.remove('modal-open');
  if (id === 'galleryModal') state.activeAlbumId = null;
  if (id === 'lightboxModal') {
    lightboxZoom.photoKey = '';
    lightboxZoom.pointers.clear();
    el('lightboxViewport').classList.remove('is-dragging');
  }
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
  el('galleryTitle').textContent = translateContent(album,'title') || 'PHOTO ALBUM';
  el('galleryCategory').textContent = album.category || 'PORTFOLIO';
  el('galleryDescription').textContent = translateContent(album,'description') || '';
  el('galleryCount').textContent = `${photos.length} ${t(photos.length === 1 ? 'photo' : 'photos')}`;
  el('addPhotoButton').hidden = !state.admin;
  el('editGalleryAlbum').hidden = !state.admin;
  el('galleryEmpty').hidden = photos.length > 0;
  el('galleryMasonry').innerHTML = photos.map((photo,i) => `
    <article class="masonry-item">
      <button type="button" class="masonry-item__view" data-open-photo="${i}" aria-label="Open photo ${e(translateContent(photo,'title') || `Foto ${i+1}`)}">
        <img loading="lazy" ${resilientImageAttrs(photo.url)} alt="${e(translateContent(photo,'title') || `Foto ${i+1}`)}">
      </button>
      <span class="masonry-item__label">${e(translateContent(photo,'title') || `FRAME ${capitalizeId(i)}`)}</span>
      ${state.admin ? `<div class="masonry-item__admin"><button type="button" class="mini-button" data-edit-photo="${e(photo.id)}">${e(t('editPhoto'))}</button><button type="button" class="mini-button mini-button--danger" data-delete-photo="${e(photo.id)}">${e(t('deletePhoto'))}</button></div>` : ''}
    </article>`).join('');
}

function openLightbox(index) {
  const album = getAlbum(state.activeAlbumId);
  if (!album || !normalizedPhotos(album)[index]) return;
  state.activePhotoIndex = index;
  renderLightbox();
  openModal('lightboxModal');
  requestAnimationFrame(fitLightboxImage);
}
function renderLightbox() {
  const album = getAlbum(state.activeAlbumId);
  const photos = normalizedPhotos(album);
  const photo = photos[state.activePhotoIndex];
  if (!photo) { if (!el('lightboxModal').hidden) closeModal('lightboxModal'); return; }
  const photoKey = `${state.activeAlbumId}::${state.activePhotoIndex}::${photo.url}`;
  if (lightboxZoom.photoKey !== photoKey) {
    lightboxZoom.photoKey = photoKey;
    lightboxZoom.ready = false;
    el('lightboxImage').classList.remove('is-ready');
    setResilientImage(el('lightboxImage'), photo.url, 'large');
  }
  el('lightboxImage').alt = translateContent(photo,'title') || 'Foto portofolio';
  el('lightboxCounter').textContent = `${album.title} · ${capitalizeId(state.activePhotoIndex)} / ${String(photos.length).padStart(2,'0')}`;
  el('lightboxTitle').textContent = translateContent(photo,'title') || 'UNTITLED FRAME';
  el('lightboxDescription').textContent = translateContent(photo,'description') || '';
  const meta = photo.exif || {};
  const fields = [
    ['CAMERA', meta.camera], ['LENS', meta.lens], ['FOCAL LENGTH', meta.focalLength],
    ['SHUTTER', meta.shutter], ['APERTURE', meta.aperture], ['ISO', meta.iso]
  ].filter(([,value]) => value !== '' && value != null);
  el('lightboxExif').innerHTML = fields.length ? fields.map(([key,value]) =>
    `<div><dt>${e(key)}</dt><dd>${e(value)}</dd></div>`).join('')
    : `<span class="exif-grid__missing">${e(t('noExif'))}</span>`;
  el('prevPhoto').hidden = photos.length <= 1;
  el('nextPhoto').hidden = photos.length <= 1;
}
function navigatePhoto(delta) {
  const count = normalizedPhotos(getAlbum(state.activeAlbumId)).length;
  if (!count) return;
  state.activePhotoIndex = (state.activePhotoIndex + delta + count) % count;
  renderLightbox();
  requestAnimationFrame(fitLightboxImage);
}


// ---- Fullscreen lightbox: fit the ORIGINAL aspect ratio into the actual
// visible viewport, then zoom around the position under the pointer.
const lightboxZoom = {
  photoKey: '', ready: false,
  scale: 1, minScale: 1, maxScale: 6,
  baseWidth: 0, baseHeight: 0, x: 0, y: 0,
  pointers: new Map(), lastPinchDistance: 0, lastPinchCenter: null
};
const zoomViewport = () => el('lightboxViewport');
function clampPhotoPosition() {
  const viewport = zoomViewport();
  const w = viewport.clientWidth, h = viewport.clientHeight;
  const scaledWidth = lightboxZoom.baseWidth * lightboxZoom.scale;
  const scaledHeight = lightboxZoom.baseHeight * lightboxZoom.scale;
  lightboxZoom.x = scaledWidth <= w ? (w - scaledWidth) / 2
    : Math.max(w - scaledWidth, Math.min(0, lightboxZoom.x));
  lightboxZoom.y = scaledHeight <= h ? (h - scaledHeight) / 2
    : Math.max(h - scaledHeight, Math.min(0, lightboxZoom.y));
}
function paintLightboxZoom() {
  const img = el('lightboxImage');
  img.style.transform = `translate3d(${lightboxZoom.x}px,${lightboxZoom.y}px,0) scale(${lightboxZoom.scale})`;
  el('lightboxZoomLevel').textContent = `${Math.round(lightboxZoom.scale * 100)}%`;
  zoomViewport().classList.toggle('is-zoomed', lightboxZoom.scale > 1.005);
  el('zoomOutPhoto').disabled = !lightboxZoom.ready || lightboxZoom.scale <= 1.005;
  el('zoomInPhoto').disabled = !lightboxZoom.ready || lightboxZoom.scale >= lightboxZoom.maxScale - .005;
  el('zoomResetPhoto').disabled = !lightboxZoom.ready || lightboxZoom.scale <= 1.005;
}
function fitLightboxImage() {
  if (el('lightboxModal').hidden) return;
  const img = el('lightboxImage');
  const viewport = zoomViewport();
  if (!img.complete || !img.naturalWidth || !img.naturalHeight || !viewport.clientWidth || !viewport.clientHeight) return;
  // A small margin makes the entire photo frame visible, including its edges.
  const fitRatio = Math.min(
    (viewport.clientWidth - 10) / img.naturalWidth,
    (viewport.clientHeight - 10) / img.naturalHeight
  );
  lightboxZoom.baseWidth = Math.max(1, img.naturalWidth * fitRatio);
  lightboxZoom.baseHeight = Math.max(1, img.naturalHeight * fitRatio);
  lightboxZoom.scale = 1;
  lightboxZoom.x = (viewport.clientWidth - lightboxZoom.baseWidth) / 2;
  lightboxZoom.y = (viewport.clientHeight - lightboxZoom.baseHeight) / 2;
  lightboxZoom.ready = true;
  // Switching photos must fit instantly, not animate through the previous
  // photo's size and position (which briefly crops the new image).
  img.style.transition = 'none';
  img.style.width = `${lightboxZoom.baseWidth}px`;
  img.style.height = `${lightboxZoom.baseHeight}px`;
  paintLightboxZoom();
  img.classList.add('is-ready');
  void img.offsetWidth; // commit the fit transform before restoring smooth zoom
  requestAnimationFrame(() => { img.style.removeProperty('transition'); });
}
function lightboxZoomAt(nextScale, atX, atY) {
  if (!lightboxZoom.ready) return;
  const prevScale = lightboxZoom.scale;
  const next = Math.max(lightboxZoom.minScale, Math.min(lightboxZoom.maxScale, nextScale));
  if (Math.abs(next - prevScale) < .0001) return;
  const ratio = next / prevScale;
  lightboxZoom.x = atX - (atX - lightboxZoom.x) * ratio;
  lightboxZoom.y = atY - (atY - lightboxZoom.y) * ratio;
  lightboxZoom.scale = next;
  clampPhotoPosition();
  paintLightboxZoom();
}
function zoomFromCenter(factor) {
  const v = zoomViewport();
  lightboxZoomAt(lightboxZoom.scale * factor, v.clientWidth / 2, v.clientHeight / 2);
}
function resetLightboxZoom() {
  if (!lightboxZoom.ready) return;
  const v = zoomViewport();
  lightboxZoomAt(1, v.clientWidth / 2, v.clientHeight / 2);
}
function onLightboxWheel(event) {
  if (!lightboxZoom.ready || el('lightboxModal').hidden) return;
  event.preventDefault();
  const rect = zoomViewport().getBoundingClientRect();
  const delta = Math.max(-90, Math.min(90, event.deltaY));
  const factor = Math.exp(-delta * .003);
  lightboxZoomAt(lightboxZoom.scale * factor, event.clientX - rect.left, event.clientY - rect.top);
}
function onLightboxPointerDown(event) {
  if (!lightboxZoom.ready) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  const viewport = zoomViewport();
  lightboxZoom.pointers.set(event.pointerId, {x:event.clientX,y:event.clientY});
  viewport.setPointerCapture?.(event.pointerId);
  if (lightboxZoom.pointers.size === 1 && lightboxZoom.scale > 1) viewport.classList.add('is-dragging');
  if (lightboxZoom.pointers.size === 2) {
    viewport.classList.remove('is-dragging');
    const [a,b] = [...lightboxZoom.pointers.values()];
    lightboxZoom.lastPinchDistance = Math.hypot(a.x-b.x,a.y-b.y);
    lightboxZoom.lastPinchCenter = {x:(a.x+b.x)/2,y:(a.y+b.y)/2};
  }
}
function onLightboxPointerMove(event) {
  if (!lightboxZoom.pointers.has(event.pointerId)) return;
  const prev = lightboxZoom.pointers.get(event.pointerId);
  lightboxZoom.pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
  const pointers = [...lightboxZoom.pointers.values()];
  if (pointers.length === 2) {
    const [a,b] = pointers;
    const distance = Math.hypot(a.x-b.x,a.y-b.y);
    const center = {x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    if (lightboxZoom.lastPinchDistance > 0) {
      const bounds = zoomViewport().getBoundingClientRect();
      lightboxZoomAt(lightboxZoom.scale * distance / lightboxZoom.lastPinchDistance,
        center.x-bounds.left,center.y-bounds.top);
      if (lightboxZoom.lastPinchCenter && lightboxZoom.scale > 1) {
        lightboxZoom.x += center.x - lightboxZoom.lastPinchCenter.x;
        lightboxZoom.y += center.y - lightboxZoom.lastPinchCenter.y;
        clampPhotoPosition(); paintLightboxZoom();
      }
    }
    lightboxZoom.lastPinchDistance = distance;
    lightboxZoom.lastPinchCenter = center;
  } else if (lightboxZoom.scale > 1) {
    lightboxZoom.x += event.clientX - prev.x;
    lightboxZoom.y += event.clientY - prev.y;
    clampPhotoPosition();
    paintLightboxZoom();
  }
}
function onLightboxPointerUp(event) {
  lightboxZoom.pointers.delete(event.pointerId);
  if (zoomViewport().hasPointerCapture?.(event.pointerId)) zoomViewport().releasePointerCapture(event.pointerId);
  if (lightboxZoom.pointers.size < 2) {
    lightboxZoom.lastPinchDistance = 0;
    lightboxZoom.lastPinchCenter = null;
  }
  if (!lightboxZoom.pointers.size) zoomViewport().classList.remove('is-dragging');
}
function installLightboxZoom() {
  const viewport = zoomViewport();
  el('lightboxImage').addEventListener('load', () => requestAnimationFrame(fitLightboxImage));
  viewport.addEventListener('wheel', onLightboxWheel, {passive:false});
  viewport.addEventListener('dblclick', event => {
    event.preventDefault();
    const rect=viewport.getBoundingClientRect();
    lightboxZoomAt(lightboxZoom.scale > 1.05 ? 1 : 2.5,
      event.clientX-rect.left,event.clientY-rect.top);
  });
  viewport.addEventListener('pointerdown', onLightboxPointerDown);
  viewport.addEventListener('pointermove', onLightboxPointerMove);
  viewport.addEventListener('pointerup', onLightboxPointerUp);
  viewport.addEventListener('pointercancel', onLightboxPointerUp);
  el('zoomOutPhoto').addEventListener('click', () => zoomFromCenter(1 / 1.4));
  el('zoomInPhoto').addEventListener('click', () => zoomFromCenter(1.4));
  el('zoomResetPhoto').addEventListener('click', resetLightboxZoom);
  // Layout changes affect the fit area; recalculating prevents cropped photos.
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      if (!el('lightboxModal').hidden && lightboxZoom.ready) fitLightboxImage();
    });
    resizeObserver.observe(viewport);
  } else window.addEventListener('resize', () => requestAnimationFrame(fitLightboxImage));
  paintLightboxZoom();
}

// One-track ambient soundtrack: intentionally user-initiated; never autoplay with sound.
let ambientFadeFrame = 0;
let ambientPlaying = false;
let ambientDesiredVolume = 0.25;
function fadeAmbientTo(target, pauseAfter = false) {
  const audio = el('ambientAudio');
  cancelAnimationFrame(ambientFadeFrame);
  const from = audio.volume;
  const start = performance.now();
  const duration = 460;
  function frame(now) {
    const fraction = Math.min(1, (now-start)/duration);
    const eased = fraction*fraction*(3-2*fraction);
    audio.volume = Math.max(0,Math.min(1,from+(target-from)*eased));
    if (fraction < 1) ambientFadeFrame = requestAnimationFrame(frame);
    else if (pauseAfter && !ambientPlaying) audio.pause();
  }
  ambientFadeFrame = requestAnimationFrame(frame);
}
function updateAmbientButton() {
  const button = el('ambientToggle');
  const usable = state.site.musicEnabled === true && !!safeUrl(state.site.musicUrl);
  button.hidden = !usable;
  button.classList.toggle('is-playing', ambientPlaying);
  button.setAttribute('aria-pressed',String(ambientPlaying));
  button.setAttribute('aria-label',ambientPlaying ? 'Mute ambient music' : 'Play ambient music');
  button.title = ambientPlaying ? 'Mute ambient music' : 'Play ambient music';
}
function configureAmbientAudio() {
  const audio = el('ambientAudio');
  const url = safeUrl(state.site.musicUrl);
  const enabled = state.site.musicEnabled === true && !!url;
  ambientDesiredVolume = Math.min(1,Math.max(0,Number(state.site.musicVolume ?? 25)/100));
  if (!enabled) {
    ambientPlaying = false;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  } else if (audio.getAttribute('src') !== url) {
    ambientPlaying = false;
    audio.pause();
    audio.src = url;
    audio.load();
  } else if (ambientPlaying) fadeAmbientTo(ambientDesiredVolume);
  audio.loop = true;
  updateAmbientButton();
}
async function toggleAmbientMusic() {
  const audio = el('ambientAudio');
  if (!state.site.musicEnabled || !safeUrl(state.site.musicUrl)) return;
  if (ambientPlaying) {
    ambientPlaying = false;
    fadeAmbientTo(0,true);
    updateAmbientButton();
    return;
  }
  cancelAnimationFrame(ambientFadeFrame);
  audio.volume = 0;
  try {
    await audio.play(); // invoked from the user's real click
    ambientPlaying = true;
    fadeAmbientTo(ambientDesiredVolume);
  } catch(error) { ambientPlaying = false; toast('Musik tidak dapat diputar. Pastikan URL audio publik mendukung playback browser.',true); }
  updateAmbientButton();
}
function isFirebaseConfigured() {
  return ['apiKey','authDomain','projectId','appId'].every((key) =>
    typeof firebaseConfig[key] === 'string' &&
    firebaseConfig[key].trim().length > 0 &&
    !firebaseConfig[key].startsWith('YOUR_'));
}

async function startFirebase() {
  el('firebaseNotice').hidden = isFirebaseConfigured();
  if (!isFirebaseConfigured()) {
    finishBoot('Firebase belum diatur; menampilkan contoh.');
    return;
  }
  try {
    setBootMessage('Connecting to Firebase…');
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

    authSdk.onAuthStateChanged(firebase.auth, user => {
      state.user = user;
      state.admin = !!user && (!ADMIN_UID || user.uid === ADMIN_UID);
      if (state.booted) updateAdminUi();
      if (user && !state.admin) toast('Akun ini tidak diizinkan mengedit.', true);
    }, error => toast(`Autentikasi bermasalah: ${friendlyError(error)}`, true));

    const settingsDoc = firestoreSdk.doc(firebase.db, 'site_settings', 'main');
    const albumsCol = firestoreSdk.collection(firebase.db, 'albums');
    // Server-first: do NOT render the built-in demo until both latest server
    // snapshots are available. This prevents stale/default content flashing.
    setBootMessage('Loading your latest portfolio…');
    const [settingsSnapshot, albumsSnapshot] = await Promise.all([
      firestoreSdk.getDocFromServer(settingsDoc),
      firestoreSdk.getDocsFromServer(albumsCol)
    ]);
    applySettingsSnapshot(settingsSnapshot);
    applyAlbumsSnapshot(albumsSnapshot);
    finishBoot();
    // Continue listening to changes from this and other admin sessions.
    firebase.unsubscribers.push(firestoreSdk.onSnapshot(settingsDoc, snapshot => {
      if (!state.booted) return;
      applySettingsSnapshot(snapshot);
      applyAppearance();
      configureAmbientAudio();
      applyLanguage();
      resetAutoSlide();
    }, error => toast(`Gagal membaca site_settings: ${friendlyError(error)}`, true)));
    firebase.unsubscribers.push(firestoreSdk.onSnapshot(albumsCol, snapshot => {
      applyAlbumsSnapshot(snapshot);
      if (state.booted) {
        renderAlbums();
        if (!el('galleryModal').hidden) renderGallery();
        if (!el('lightboxModal').hidden) renderLightbox();
      }
    }, error => toast(`Gagal membaca albums: ${friendlyError(error)}`, true)));
  } catch (error) {
    // When the configured Firestore is unavailable, never show an out-of-date
    // default portfolio as though it were the user's actual data.
    console.error('[Givi Shashin] Tidak dapat mengambil data Firestore terbaru:', error);
    setBootMessage(`Unable to load the latest portfolio: ${friendlyError(error)}`);
    el('bootRetry').hidden = false;
  }
}
function applySettingsSnapshot(snapshot) {
  state.site = snapshot.exists()
    ? { ...structuredClone(DEFAULT_SITE), ...snapshot.data() }
    : structuredClone(DEFAULT_SITE);
  const localLang = (() => {
    try { return window.localStorage.getItem('givi-shashin-language'); }
    catch { return null; }
  })();
  if (!state.languageExplicit) state.language = LANGUAGES.includes(localLang) ? localLang :
    (LANGUAGES.includes(state.site.defaultLanguage) ? state.site.defaultLanguage : 'en');
  state.activeSlide = Math.max(0,Math.min(state.activeSlide,getHighlights().length - 1));
  ensureActiveVisible();
}
function applyAlbumsSnapshot(snapshot) {
  state.albums = snapshot.docs.map(docSnap => ({
    ...docSnap.data(), id:docSnap.id,
    photos:Array.isArray(docSnap.data().photos) ? docSnap.data().photos : []
  }));
  state.albumsLoaded = true;
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

function syncAccentEditor(hex) {
  const value = HEX_COLOR.test(String(hex)) ? String(hex).toUpperCase() : '#E11D48';
  el('siteAccentHex').value = value;
  el('siteAccentPicker').value = value.toLowerCase();
  document.querySelectorAll('[data-theme-color]').forEach(b => b.classList.toggle('is-selected', b.dataset.themeColor.toUpperCase() === value));
  applyAppearance(value, previewTypographyValues());
}
function previewTypographyValues() {
  const form = el('siteForm');
  const obj={};
  for (const key of Object.keys(TYPOGRAPHY_RULES)) obj[key] = clampRange(form.elements.namedItem(key)?.value, TYPOGRAPHY_RULES[key]);
  return obj;
}
function syncTypographyEditor(typography) {
  for (const [key,rule] of Object.entries(TYPOGRAPHY_RULES)) {
    const value = clampRange(typography?.[key] ?? rule[2],rule);
    el('siteForm').elements.namedItem(key).value = value;
    el(`${key}Out`).textContent = `${value} px`;
  }
  applyAppearance(el('siteAccentHex').value,previewTypographyValues());
}
function setMusicEditorValues() {
  el('siteMusicEnabled').checked = state.site.musicEnabled === true;
  el('siteMusicUrl').value = state.site.musicUrl || '';
  el('siteMusicVolume').value = state.site.musicVolume ?? 25;
  el('siteMusicVolumeOut').textContent = `${state.site.musicVolume ?? 25}%`;
}
let siteEditorDraft = {};
let siteEditorCurrentLanguage = 'en';
function captureSiteLocale() {
  const form = el('siteForm');
  const draft = siteEditorDraft[siteEditorCurrentLanguage] || {};
  for (const key of SITE_TRANSLATABLE) draft[key] = form.elements.namedItem(key).value;
  siteEditorDraft[siteEditorCurrentLanguage] = draft;
}
function showSiteLocale(language) {
  const form = el('siteForm');
  siteEditorCurrentLanguage = language;
  const draft = siteEditorDraft[language] || {};
  for (const key of SITE_TRANSLATABLE) {
    form.elements.namedItem(key).value = draft[key] ?? state.site[key] ?? '';
  }
}
function openSiteEditor() {
  if (!requireAdmin()) return;
  const form = el('siteForm');
  for (const key of ['brandName','contactEmail','profileName','profilePhotoUrl','storyImageUrl']) {
    if (form.elements.namedItem(key)) form.elements.namedItem(key).value = state.site[key] || '';
  }
  for (const key of ['instagramUrl','storyThumbOneUrl','storyThumbTwoUrl']) {
    form.elements.namedItem(key).value = state.site[key] || '';
  }
  form.elements.namedItem('autoSlideSeconds').value = clampSeconds(state.site.autoSlideSeconds ?? 6);
  form.elements.namedItem('defaultLanguage').value = LANGUAGES.includes(state.site.defaultLanguage) ? state.site.defaultLanguage : 'en';
  siteEditorDraft = structuredClone(state.site.translations || {});
  uiTextEditorDraft = structuredClone(state.site.uiText || {});
  switchUiTextLocale(state.language);
  syncAccentEditor(state.site.accentColor || '#E11D48');
  syncTypographyEditor(state.site.typography);
  setMusicEditorValues();
  siteEditorCurrentLanguage = state.language;
  el('siteEditLanguage').value = state.language;
  showSiteLocale(state.language);
  checkProfilePhotoUrl();
  openModal('siteModal');
  validateVisibleImageFields('siteModal');
}
async function saveSite(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  captureSiteLocale();
  captureUiTextLocale();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  data.musicEnabled = el('siteMusicEnabled').checked;
  data.musicVolume = Math.min(100,Math.max(0,Number(data.musicVolume || 0)));
  data.accentColor = HEX_COLOR.test(String(data.accentColor)) ? data.accentColor.toUpperCase() : '#E11D48';
  data.typography = previewTypographyValues();
  data.uiText = structuredClone(uiTextEditorDraft);
  for (const key of Object.keys(TYPOGRAPHY_RULES)) delete data[key];
  for (const key of ['profilePhotoUrl','storyImageUrl','storyThumbOneUrl','storyThumbTwoUrl']) {
    if (data[key] && !safeUrl(data[key])) return toast(`URL HTTPS tidak valid: ${key}`, true);
  }
  if (data.instagramUrl && !safeUrl(data.instagramUrl)) return toast('URL Instagram harus HTTPS.', true);
  if (data.musicUrl && !safeUrl(data.musicUrl)) return toast('URL musik harus HTTPS.',true);
  if (data.musicEnabled && !safeUrl(data.musicUrl)) return toast('Aktifkan musik hanya setelah mengisi URL audio publik.',true);
  data.autoSlideSeconds = clampSeconds(data.autoSlideSeconds);
  data.defaultLanguage = LANGUAGES.includes(data.defaultLanguage) ? data.defaultLanguage : 'en';
  data.translations = structuredClone(siteEditorDraft);
  // Compatibility with pre-existing Firestore fields / future older clients.
  for (const key of SITE_TRANSLATABLE) data[key] =
    siteEditorDraft[data.defaultLanguage]?.[key] || state.site[key] || DEFAULT_SITE[key] || '';
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await firebase.fs.setDoc(firebase.fs.doc(firebase.db,'site_settings','main'), {
      ...data, updatedAt: firebase.fs.serverTimestamp()
    }, {merge:true});
    state.site = {...state.site,...data};
    applyAppearance();
    configureAmbientAudio();
    applyLanguage();
    closeModal('siteModal');
    toast('Teks, tipografi, tema, musik, dan pengaturan website berhasil disimpan.');
  } catch(error) { toast(friendlyError(error),true); }
  finally { button.disabled = false; }
}

let highlightEditorDraft = {};
let highlightEditorCurrentLanguage = 'en';
function captureHighlightLocale() {
  const form = el('highlightForm');
  const draft = highlightEditorDraft[highlightEditorCurrentLanguage] || {};
  for (const key of HIGHLIGHT_TRANSLATABLE) draft[key] = form.elements.namedItem(key).value;
  highlightEditorDraft[highlightEditorCurrentLanguage] = draft;
}
function showHighlightLocale(language) {
  const form = el('highlightForm');
  const index = el('highlightIndex').value;
  const slide = index === 'new' ? null : getHighlights()[Number(index)];
  highlightEditorCurrentLanguage = language;
  const draft = highlightEditorDraft[language] || {};
  for (const key of HIGHLIGHT_TRANSLATABLE) form.elements.namedItem(key).value =
    draft[key] ?? slide?.[key] ?? '';
}
function openHighlightEditor(index = 'new') {
  if (!requireAdmin()) return;
  const isNew = index === 'new';
  const slide = isNew ? null : getHighlights()[Number(index)];
  if (!isNew && !slide) return;
  const form = el('highlightForm');
  form.reset();
  el('highlightModalTitle').textContent = isNew ? 'TAMBAH HIGHLIGHT' : `EDIT HIGHLIGHT ${capitalizeId(index)}`;
  el('highlightIndex').value = index;
  form.elements.namedItem('imageUrl').value = slide?.imageUrl || '';
  highlightEditorDraft = structuredClone(slide?.translations || {});
  el('highlightEditLanguage').value = state.language;
  showHighlightLocale(state.language);
  el('deleteHighlightButton').hidden = isNew || getHighlights().length <= 1;
  openModal('highlightModal');
  validateVisibleImageFields('highlightModal');
}
async function saveHighlight(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  captureHighlightLocale();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const isNew = data.highlightIndex === 'new';
  const index = isNew ? getHighlights().length : Number(data.highlightIndex);
  if (!isNew && (!Number.isInteger(index) || index < 0 || index >= getHighlights().length)) return;
  if (!safeUrl(data.imageUrl)) return toast('URL background hero harus HTTPS.',true);
  const nextHighlights = getHighlights().map(item => structuredClone(item));
  const original = isNew ? {} : nextHighlights[index];
  const defaultLang = LANGUAGES.includes(state.site.defaultLanguage) ? state.site.defaultLanguage : 'en';
  const result = { ...original, imageUrl: safeUrl(data.imageUrl), translations:structuredClone(highlightEditorDraft) };
  for (const key of HIGHLIGHT_TRANSLATABLE) result[key] =
    highlightEditorDraft[defaultLang]?.[key] || highlightEditorDraft[highlightEditorCurrentLanguage]?.[key] || original[key] || '';
  if (!result.headline || !result.label || !result.cardTitle) return toast('Isi label, judul hero, dan judul kartu.', true);
  nextHighlights[index] = result;
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await firebase.fs.setDoc(firebase.fs.doc(firebase.db,'site_settings','main'), {
      highlights:nextHighlights,updatedAt:firebase.fs.serverTimestamp()
    }, {merge:true});
    closeModal('highlightModal');
    state.activeSlide = index;
    ensureActiveVisible();
    toast(t('added'));
  } catch(error) { toast(friendlyError(error),true); }
  finally { button.disabled = false; }
}
async function deleteHighlight() {
  if (!requireAdmin()) return;
  const index = Number(el('highlightIndex').value);
  const current = getHighlights();
  if (!Number.isInteger(index) || current.length <= 1 || !current[index]) return;
  if (!window.confirm(`Hapus highlight ${capitalizeId(index)}?`)) return;
  const nextHighlights = current.filter((_,i) => i !== index);
  try {
    await firebase.fs.setDoc(firebase.fs.doc(firebase.db,'site_settings','main'), {
      highlights:nextHighlights,updatedAt:firebase.fs.serverTimestamp()
    },{merge:true});
    state.activeSlide = Math.max(0,Math.min(state.activeSlide,nextHighlights.length-1));
    state.highlightOffset = Math.max(0,Math.min(state.highlightOffset,nextHighlights.length-3));
    closeModal('highlightModal');
    toast(t('removed'));
  } catch(error) { toast(friendlyError(error),true); }
}

// On first admin save, materialize all four preview albums as editable Firestore
// documents. This keeps the other preview albums visible after editing one.
let demoSeedPromise = null;
async function persistDemoAlbumsIfNeeded() {
  if (!state.albumsLoaded) throw new Error('Daftar album masih dimuat. Coba lagi setelah beberapa saat.');
  if (state.albums.length || state.site.albumsInitialized) return;
  if (!demoSeedPromise) {
    demoSeedPromise = (async () => {
      const batch = firebase.fs.writeBatch(firebase.db);
      for (const album of DEMO_ALBUMS) {
        const { id, ...data } = album;
        batch.set(firebase.fs.doc(firebase.db, 'albums', id), {
          ...structuredClone(data),
          createdAt: firebase.fs.serverTimestamp(), updatedAt: firebase.fs.serverTimestamp()
        });
      }
      batch.set(firebase.fs.doc(firebase.db, 'site_settings', 'main'), { albumsInitialized: true }, { merge: true });
      await batch.commit();
      state.site.albumsInitialized = true;
    })().catch((error) => { demoSeedPromise = null; throw error; });
  }
  return demoSeedPromise;
}

let albumEditorDraft = {};
let albumEditorCurrentLanguage = 'en';
function captureAlbumLocale() {
  const form = el('albumForm');
  const draft = albumEditorDraft[albumEditorCurrentLanguage] || {};
  for (const key of ALBUM_TRANSLATABLE) draft[key] = form.elements.namedItem(key).value;
  albumEditorDraft[albumEditorCurrentLanguage] = draft;
}
function showAlbumLocale(language) {
  const form = el('albumForm');
  albumEditorCurrentLanguage = language;
  const album = el('albumId').value ? getAlbum(el('albumId').value) : null;
  const draft = albumEditorDraft[language] || {};
  for (const key of ALBUM_TRANSLATABLE) form.elements.namedItem(key).value = draft[key] ?? album?.[key] ?? '';
}
function openAlbumEditor(id = '') {
  if (!requireAdmin()) return;
  const album = id ? getAlbum(id) : null;
  el('albumFormTitle').textContent = album ? 'EDIT ALBUM' : 'TAMBAH ALBUM';
  el('albumForm').reset();
  el('albumId').value = album?.id || '';
  for (const key of ['category','coverUrl','sortOrder']) {
    el('albumForm').elements.namedItem(key).value = album?.[key] ?? (key === 'sortOrder' ? String(state.albums.length+1) : '');
  }
  albumEditorDraft = structuredClone(album?.translations || {});
  el('albumEditLanguage').value = state.language;
  showAlbumLocale(state.language);
  openModal('albumFormModal');
  validateVisibleImageFields('albumFormModal');
}
async function saveAlbum(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  captureAlbumLocale();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  if (!safeUrl(data.coverUrl)) return toast('Cover album harus menggunakan URL HTTPS.',true);
  const albumId = data.albumId;
  const old = albumId ? getAlbum(albumId) : null;
  const defaultLang = LANGUAGES.includes(state.site.defaultLanguage) ? state.site.defaultLanguage : 'en';
  const textLocale = albumEditorDraft[defaultLang] || albumEditorDraft[albumEditorCurrentLanguage] || {};
  const payload = {
    title: textLocale.title?.trim() || old?.title || data.title.trim(),
    description: textLocale.description?.trim() || old?.description || data.description.trim(),
    translations: structuredClone(albumEditorDraft),
    category: data.category.trim(),coverUrl:safeUrl(data.coverUrl),
    sortOrder:Math.max(0,Number(data.sortOrder)||0),updatedAt:firebase.fs.serverTimestamp()
  };
  if (!payload.title || !payload.category) return toast('Judul dan kategori album wajib diisi.',true);
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await persistDemoAlbumsIfNeeded();
    if (albumId) await firebase.fs.updateDoc(firebase.fs.doc(firebase.db,'albums',albumId),payload);
    else await firebase.fs.addDoc(firebase.fs.collection(firebase.db,'albums'),{
      ...payload,photos:[],createdAt:firebase.fs.serverTimestamp()
    });
    closeModal('albumFormModal');
    toast(albumId ? 'Album berhasil diperbarui.' : 'Album berhasil ditambahkan.');
  } catch(error) { toast(friendlyError(error),true); }
  finally { button.disabled = false; }
}

async function deleteAlbum(id) {
  if (!requireAdmin()) return;
  const album = getAlbum(id);
  if (!album) return;
  if (!window.confirm(`Hapus album "${album.title}" beserta seluruh referensi fotonya? URL asli di ImageKit tidak akan terhapus.`)) return;
  try {
    await persistDemoAlbumsIfNeeded();
    await firebase.fs.setDoc(firebase.fs.doc(firebase.db,'site_settings','main'), {albumsInitialized: true}, {merge: true});
    await firebase.fs.deleteDoc(firebase.fs.doc(firebase.db,'albums',id));
    if (state.activeAlbumId === id) closeModal('galleryModal');
    toast('Album dihapus dari Firestore. File ImageKit tidak terpengaruh.');
  } catch (error) { toast(friendlyError(error), true); }
}

function photoKey() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID() : `p_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
let photoEditorDraft = {};
let photoEditorCurrentLanguage = 'en';
function capturePhotoLocale() {
  const form = el('photoForm');
  const draft = photoEditorDraft[photoEditorCurrentLanguage] || {};
  for (const key of PHOTO_TRANSLATABLE) draft[key] = form.elements.namedItem(key).value;
  photoEditorDraft[photoEditorCurrentLanguage] = draft;
}
function showPhotoLocale(language) {
  const form = el('photoForm');
  photoEditorCurrentLanguage = language;
  const photoId = el('photoId').value;
  const album = getAlbum(el('photoAlbumId').value);
  const photo = normalizedPhotos(album).find(p => p.id === photoId);
  const draft = photoEditorDraft[language] || {};
  for (const key of PHOTO_TRANSLATABLE) form.elements.namedItem(key).value = draft[key] ?? photo?.[key] ?? '';
}
function openPhotoEditor(photoId = '') {
  if (!requireAdmin()) return;
  const album = getAlbum(state.activeAlbumId);
  if (!album) return;
  const photo = normalizedPhotos(album).find(p => p.id === photoId);
  const form = el('photoForm');
  form.reset();
  el('photoFormTitle').textContent = photo ? 'EDIT FOTO' : 'TAMBAH FOTO';
  el('photoAlbumId').value = album.id;
  el('photoId').value = photo?.id || '';
  for (const key of ['url','category']) form.elements.namedItem(key).value = photo?.[key] ?? '';
  for (const key of ['camera','lens','focalLength','shutter','aperture','iso']) form.elements.namedItem(key).value = photo?.exif?.[key] ?? '';
  photoEditorDraft = structuredClone(photo?.translations || {});
  el('photoEditLanguage').value = state.language;
  showPhotoLocale(state.language);
  openModal('photoFormModal');
  validateVisibleImageFields('photoFormModal');
}
async function savePhoto(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  capturePhotoLocale();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const album = getAlbum(data.photoAlbumId);
  if (!album) return toast('Album tidak ditemukan.',true);
  if (!safeUrl(data.url)) return toast('URL foto harus HTTPS.',true);
  const photos = [...normalizedPhotos(album)];
  const existingIndex = photos.findIndex(p => p.id === data.photoId);
  const old = existingIndex >= 0 ? photos[existingIndex] : null;
  const defaultLang = LANGUAGES.includes(state.site.defaultLanguage) ? state.site.defaultLanguage : 'en';
  const textLocale = photoEditorDraft[defaultLang] || photoEditorDraft[photoEditorCurrentLanguage] || {};
  const payload = {
    id:data.photoId || photoKey(),url:safeUrl(data.url),
    title:textLocale.title?.trim() || old?.title || data.title.trim(),
    description:textLocale.description?.trim() || old?.description || data.description.trim(),
    translations: structuredClone(photoEditorDraft),
    category:data.category.trim(),
    exif:Object.fromEntries(['camera','lens','focalLength','shutter','aperture','iso'].map(key => [key,data[key].trim()]))
  };
  if (!payload.title) return toast('Judul foto wajib diisi.',true);
  if (existingIndex >= 0) photos[existingIndex] = payload;
  else photos.push(payload);
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    await persistDemoAlbumsIfNeeded();
    await firebase.fs.updateDoc(firebase.fs.doc(firebase.db,'albums',album.id),{
      photos, updatedAt:firebase.fs.serverTimestamp()
    });
    closeModal('photoFormModal');
    toast(existingIndex >= 0 ? 'Foto berhasil diperbarui.' : 'Foto berhasil ditambahkan ke album.');
  } catch(error) { toast(friendlyError(error),true); }
  finally { button.disabled = false; }
}

async function deletePhoto(photoId) {
  if (!requireAdmin()) return;
  const album = getAlbum(state.activeAlbumId);
  if (!album) return;
  const photo = normalizedPhotos(album).find((p) => p.id === photoId);
  if (!photo || !window.confirm(`Hapus referensi foto "${photo.title}" dari album?`)) return;
  const photos = normalizedPhotos(album).filter((p) => p.id !== photoId);
  try {
    await persistDemoAlbumsIfNeeded();
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
    batch.set(settings, { ...state.site, albumsInitialized: true, updatedAt: firebase.fs.serverTimestamp() }, { merge: true });
    for (const album of DEMO_ALBUMS) {
      const ref = firebase.fs.doc(firebase.db,'albums',album.id);
      const { id: _demoId, ...payload } = album;
      batch.set(ref, { ...structuredClone(payload), createdAt: firebase.fs.serverTimestamp(), updatedAt: firebase.fs.serverTimestamp() });
    }
    await batch.commit();
    state.site.albumsInitialized = true;
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
  state.visibleAlbumCount = ALBUM_PAGE_SIZE;
  state.albumsExpanded = false;
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
    if (target.dataset.slide !== undefined) { setSlide(Number(target.dataset.slide)); resetAutoSlide(); return; }
    if (target.dataset.highlightNav !== undefined) return updateHighlightWindow(Number(target.dataset.highlightNav));
    if (target.dataset.openAlbum) return openAlbum(target.dataset.openAlbum);
    if (target.dataset.openPhoto !== undefined) return openLightbox(Number(target.dataset.openPhoto));
    if (target.dataset.editHighlight !== undefined) return openHighlightEditor(Number(target.dataset.editHighlight));
    if (target.dataset.editAlbum) return openAlbumEditor(target.dataset.editAlbum);
    if (target.dataset.deleteAlbum) return deleteAlbum(target.dataset.deleteAlbum);
    if (target.dataset.editPhoto) return openPhotoEditor(target.dataset.editPhoto);
    if (target.dataset.deletePhoto) return deletePhoto(target.dataset.deletePhoto);
    if (target.dataset.filter !== undefined) {
      state.currentCategory = target.dataset.filter;
      if (state.currentCategory !== 'ALL') state.albumsExpanded = true;
      state.visibleAlbumCount = ALBUM_PAGE_SIZE;
      renderAlbums();
    }
  });
  el('languageSelect').addEventListener('change', event => setLanguage(event.target.value));
  el('ambientToggle').addEventListener('click',toggleAmbientMusic);
  el('ambientAudio').addEventListener('error',()=>{if (ambientPlaying){ambientPlaying=false;updateAmbientButton();toast('Audio tidak dapat dimuat. Periksa URL soundtrack.',true);}});
  el('siteUiTextLanguage').addEventListener('change',event=>{captureUiTextLocale();switchUiTextLocale(event.target.value);});
  el('siteAccentHex').addEventListener('input',event=>{if(HEX_COLOR.test(event.target.value))syncAccentEditor(event.target.value);});
  el('siteAccentPicker').addEventListener('input',event=>syncAccentEditor(event.target.value));
  el('themePresets').addEventListener('click',event=>{const b=event.target.closest('[data-theme-color]');if(b)syncAccentEditor(b.dataset.themeColor);});
  el('resetThemeColor').addEventListener('click',()=>syncAccentEditor('#E11D48'));
  el('typographyEditor').addEventListener('input',event=>{
    const input=event.target;
    if(!input.name || !(input.name in TYPOGRAPHY_RULES)) return;
    el(`${input.name}Out`).textContent=`${input.value} px`;
    applyAppearance(el('siteAccentHex').value,previewTypographyValues());
  });
  el('resetTypography').addEventListener('click',()=>syncTypographyEditor(Object.fromEntries(Object.entries(TYPOGRAPHY_RULES).map(([k,v])=>[k,v[2]]))));
  el('siteMusicVolume').addEventListener('input',event=>{el('siteMusicVolumeOut').textContent=`${event.target.value}%`;});
  el('siteEditLanguage').addEventListener('change', event => {
    captureSiteLocale(); showSiteLocale(event.target.value);
  });
  el('highlightEditLanguage').addEventListener('change', event => {
    captureHighlightLocale(); showHighlightLocale(event.target.value);
  });
  el('albumEditLanguage').addEventListener('change', event => {
    captureAlbumLocale(); showAlbumLocale(event.target.value);
  });
  el('photoEditLanguage').addEventListener('change', event => {
    capturePhotoLocale(); showPhotoLocale(event.target.value);
  });
  el('addHighlightButton').addEventListener('click', () => openHighlightEditor('new'));
  el('adminAddHighlight').addEventListener('click', () => openHighlightEditor('new'));
  el('deleteHighlightButton').addEventListener('click', deleteHighlight);
  el('highlightList').addEventListener('wheel', onHighlightWheel, {passive:false});
  el('heroTeasers').addEventListener('wheel', onHighlightWheel, {passive:false});
  document.addEventListener('visibilitychange', resetAutoSlide);
  el('searchToggle').addEventListener('click', () => setSearchOpen(el('searchPanel').hidden));
  el('searchInput').addEventListener('input', (event) => {
    state.currentQuery = event.currentTarget.value;
    if (state.currentQuery.trim()) state.albumsExpanded = true;
    state.visibleAlbumCount = ALBUM_PAGE_SIZE;
    renderAlbums();
  });
  el('resetFilters').addEventListener('click', resetSearch);
  el('albumLoadMore').addEventListener('click', () => {
    state.visibleAlbumCount += ALBUM_PAGE_SIZE;
    renderAlbums();
  });
  el('albumExpand').addEventListener('click',expandAlbums);
  el('albumCollapse').addEventListener('click',collapseAlbums);
  el('albumArrowPrev').addEventListener('click',()=>scrollAlbumCarousel(-1));
  el('albumArrowNext').addEventListener('click',()=>scrollAlbumCarousel(1));
  const carouselVp = el('albumCarouselViewport');
  carouselVp.addEventListener('mouseenter',()=>{state.albumCarouselHover=true;});
  carouselVp.addEventListener('mouseleave',()=>{state.albumCarouselHover=false;postponeCarouselAuto();});
  carouselVp.addEventListener('focusin',()=>{state.albumCarouselHover=true;});
  carouselVp.addEventListener('focusout',()=>{state.albumCarouselHover=false;postponeCarouselAuto();});
  carouselVp.addEventListener('scroll',normalizeCarouselPosition,{passive:true});
  carouselVp.addEventListener('pointerdown',event=>{
    if (event.pointerType !== 'mouse' || state.albumsExpanded) return;
    carouselDragState={x:event.clientX,left:carouselVp.scrollLeft,moved:false};
    state.albumCarouselDrag=true;postponeCarouselAuto();
  });
  carouselVp.addEventListener('pointermove',event=>{
    if (!carouselDragState || event.pointerType !== 'mouse') return;
    const distance=event.clientX-carouselDragState.x;
    if (Math.abs(distance)>7) carouselDragState.moved=true;
    if (carouselDragState.moved) carouselVp.scrollLeft=carouselDragState.left-distance;
  });
  const endDrag=()=>{if (carouselDragState?.moved) carouselVp.dataset.recentDrag='true';carouselDragState=null;state.albumCarouselDrag=false;postponeCarouselAuto();};
  carouselVp.addEventListener('pointerup',endDrag);
  carouselVp.addEventListener('pointercancel',endDrag);
  carouselVp.addEventListener('click',event=>{
    if (carouselVp.dataset.recentDrag === 'true') {event.preventDefault();event.stopImmediatePropagation();delete carouselVp.dataset.recentDrag;}
  },true);
  window.addEventListener('resize',()=>{if(!state.albumsExpanded)resetCarouselPosition();});
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
  el('editProfileButton').addEventListener('click', openSiteEditor);
  el('siteProfilePhoto').addEventListener('input', () => {
    clearTimeout(profilePreviewDebounce);
    profilePreviewDebounce = setTimeout(checkProfilePhotoUrl, 280);
  });
  el('siteProfilePhoto').addEventListener('change', checkProfilePhotoUrl);
  el('editGalleryAlbum').addEventListener('click', () => openAlbumEditor(state.activeAlbumId));
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
  installLightboxZoom();
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.modalStack.length) closeTopModal();
      else if (!el('searchPanel').hidden) setSearchOpen(false);
      else { el('mainNav').classList.remove('is-open'); el('mobileToggle').setAttribute('aria-expanded','false'); }
      return;
    }
    if (!el('lightboxModal').hidden && event.key === 'ArrowRight') navigatePhoto(1);
    else if (!el('lightboxModal').hidden && event.key === 'ArrowLeft') navigatePhoto(-1);
    else if (!el('lightboxModal').hidden && ['+','='].includes(event.key)) { event.preventDefault(); zoomFromCenter(1.4); }
    else if (!el('lightboxModal').hidden && ['-','_'].includes(event.key)) { event.preventDefault(); zoomFromCenter(1/1.4); }
    else if (!el('lightboxModal').hidden && event.key === '0') { event.preventDefault(); resetLightboxZoom(); }
    else if (event.key === '/' && !state.modalStack.length && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault(); setSearchOpen(true);
    }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Image URL checks in EVERY admin form, not only the profile editor.
const imageEditorFields = ['siteStoryImage','siteThumbOne','siteThumbTwo',
  'highlightImage','albumCover','photoUrl'];
const imagePreviewTimers = new Map();
const imagePreviewVersions = new Map();

function validateImageField(input) {
  const target = document.getElementById(`${input.id}ImageStatus`);
  if (!target) return;
  const value = input.value.trim();
  const version = (imagePreviewVersions.get(input.id) || 0) + 1;
  imagePreviewVersions.set(input.id, version);
  target.hidden = !value;
  if (!value) return;
  const safe = safeUrl(value);
  if (!safe) {
    target.textContent = 'URL tidak valid. Gunakan URL HTTPS publik.';
    target.dataset.status = 'error';
    return;
  }
  target.textContent = 'Memeriksa gambar...';
  target.dataset.status = 'loading';
  loadImageUrl(safe, input.id === 'siteStoryImage' || input.id === 'highlightImage' ? 'large' : 'thumb').then(usable => {
    if (imagePreviewVersions.get(input.id) !== version) return;
    if (!usable) {
      target.textContent = 'Gagal dimuat. Periksa URL asli, izin publik, dan batas ImageKit.';
      target.dataset.status = 'error';
    } else {
      target.textContent = usable === originalImageUrl(safe)
        ? '✓ Gambar asli berhasil dimuat.'
        : '✓ Gambar berhasil dimuat dari URL alternatif.';
      target.dataset.status = 'ok';
    }
  });
}
function installImageFieldChecks() {
  for (const id of imageEditorFields) {
    const input = el(id);
    if (!input) continue;
    const status = document.createElement('p');
    status.id = `${id}ImageStatus`;
    status.className = 'image-url-status';
    status.setAttribute('aria-live','polite');
    status.hidden = true;
    input.insertAdjacentElement('afterend', status);
    input.addEventListener('input', () => {
      clearTimeout(imagePreviewTimers.get(id));
      imagePreviewTimers.set(id, setTimeout(() => validateImageField(input), 320));
    });
    input.addEventListener('change', () => validateImageField(input));
  }
}
function validateVisibleImageFields(modalId) {
  document.querySelectorAll(`#${modalId} .editor-form input[type="url"]`).forEach(input => {
    if (imageEditorFields.includes(input.id)) validateImageField(input);
  });
}

function init() {
  const year = String(new Date().getFullYear());
  el('currentYear').textContent = year;
  el('footerYear').textContent = year;
  document.addEventListener('error', onImageError, true);
  installImageFieldChecks();
  attachEvents();
  // Do NOT render default site before remote Firestore has returned.
  // A loading screen prevents the old/default hero from flashing on refresh.
  startFirebase();
  // Failure safety for blocked CDN/connection. Display a retry, not stale demo.
  window.setTimeout(() => {
    if (!state.booted) {
      setBootMessage('Could not load the latest portfolio. Check your connection.');
      el('bootRetry').hidden = false;
    }
  }, 14000);
}
init();

// Export for optional console testing (not used by site code).
export { imagekitUrl, imageCandidates, originalImageUrl, safeUrl, DEFAULT_SITE };
