/* =============================================
   IMAGE GALLERY WITH FILTERS — script.js
   Features: Filter, Search, Sort, Lightbox,
             View Toggle, Like, Keyboard Nav
============================================= */

// ─── DATA ────────────────────────────────────
const images = [
  {
    id: 1,
    title: "Misty Morning",
    category: "nature",
    tags: ["fog", "forest", "morning"],
    desc: "A quiet morning in the forest, wrapped in soft mist and golden silence.",
    likes: 342,
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    height: 280
  },
  {
    id: 2,
    title: "Urban Lines",
    category: "architecture",
    tags: ["city", "lines", "modern"],
    desc: "Geometric precision in steel and glass — the poetry of modern architecture.",
    likes: 218,
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    height: 380
  },
  {
    id: 3,
    title: "Golden Hour",
    category: "nature",
    tags: ["sunset", "sky", "light"],
    desc: "The last whisper of sun painting the horizon in amber and rose.",
    likes: 512,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    height: 320
  },
  {
    id: 4,
    title: "Quiet Corner",
    category: "people",
    tags: ["portrait", "candid", "street"],
    desc: "A stolen moment of solitude in the middle of a busy world.",
    likes: 185,
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    height: 420
  },
  {
    id: 5,
    title: "Chromatic Flow",
    category: "abstract",
    tags: ["color", "paint", "texture"],
    desc: "Pigment dancing freely across the canvas in a burst of pure color.",
    likes: 297,
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    height: 300
  },
  {
    id: 6,
    title: "Santorini Dawn",
    category: "travel",
    tags: ["greece", "island", "blue"],
    desc: "Where the Aegean Sea meets the white and blue of Cycladic dreams.",
    likes: 631,
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    height: 360
  },
  {
    id: 7,
    title: "Owl at Rest",
    category: "animals",
    tags: ["owl", "bird", "wildlife"],
    desc: "Ancient eyes that have seen countless nights, resting in rare daylight.",
    likes: 409,
    src: "https://images.unsplash.com/photo-1618397746666-63405ce5d015?w=800&q=80",
    height: 340
  },
  {
    id: 8,
    title: "Glass Tower",
    category: "architecture",
    tags: ["skyscraper", "glass", "reflection"],
    desc: "The sky reflected infinite times in a tower of mirrors reaching upward.",
    likes: 276,
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    height: 400
  },
  {
    id: 9,
    title: "Ocean Pulse",
    category: "nature",
    tags: ["waves", "ocean", "power"],
    desc: "Raw energy at the edge of land — the relentless rhythm of the sea.",
    likes: 388,
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    height: 300
  },
  {
    id: 10,
    title: "Neon Reverie",
    category: "abstract",
    tags: ["neon", "light", "blur"],
    desc: "City lights distorted through rain-soaked glass into abstract luminescence.",
    likes: 224,
    src: "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=800&q=80",
    height: 360
  },
  {
    id: 11,
    title: "Tokyo Drift",
    category: "travel",
    tags: ["japan", "city", "night"],
    desc: "The electric heartbeat of Tokyo, alive at 3am, restless and glowing.",
    likes: 517,
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    height: 310
  },
  {
    id: 12,
    title: "Fox in Snow",
    category: "animals",
    tags: ["fox", "winter", "snow"],
    desc: "A red flash against a white world — hunting with silent precision.",
    likes: 461,
    src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80",
    height: 380
  },
  {
    id: 13,
    title: "The Wanderer",
    category: "people",
    tags: ["travel", "backpack", "mountains"],
    desc: "Small against the vastness of mountains, yet undeniably free.",
    likes: 343,
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    height: 290
  },
  {
    id: 14,
    title: "Old Havana",
    category: "travel",
    tags: ["cuba", "architecture", "color"],
    desc: "Faded pastel walls that carry the weight of decades and music.",
    likes: 290,
    src: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800&q=80",
    height: 340
  },
  {
    id: 15,
    title: "Arctic Polar Bear",
    category: "animals",
    tags: ["polar bear", "arctic", "ice"],
    desc: "King of the frozen north, surveying a melting empire with quiet dignity.",
    likes: 523,
    src: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80",
    height: 310
  },
  {
    id: 16,
    title: "Brutalist Beauty",
    category: "architecture",
    tags: ["brutalism", "concrete", "form"],
    desc: "Where raw concrete becomes poetry — an ode to unapologetic structure.",
    likes: 187,
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    height: 360
  }
];

// ─── STATE ────────────────────────────────────
let state = {
  activeFilter: "all",
  searchQuery: "",
  sortBy: "default",
  viewMode: "masonry", // masonry | grid
  likedIds: new Set(JSON.parse(localStorage.getItem("likedIds") || "[]")),
  lightboxIndex: null,
  filteredImages: []
};

// ─── DOM REFS ────────────────────────────────
const galleryContainer = document.getElementById("galleryContainer");
const emptyState       = document.getElementById("emptyState");
const visibleCount     = document.getElementById("visibleCount");
const searchInput      = document.getElementById("searchInput");
const filterBtns       = document.querySelectorAll(".filter-btn");
const sortBtns         = document.querySelectorAll(".sort-btn");
const gridViewBtn      = document.getElementById("gridView");
const masonryViewBtn   = document.getElementById("masonryView");

// Lightbox
const lightbox         = document.getElementById("lightbox");
const lightboxOverlay  = document.getElementById("lightboxOverlay");
const lightboxImg      = document.getElementById("lightboxImg");
const lightboxTitle    = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDesc     = document.getElementById("lightboxDesc");
const lightboxLikes    = document.getElementById("lightboxLikes");
const lightboxIndex    = document.getElementById("lightboxIndex");
const lightboxClose    = document.getElementById("lightboxClose");
const lightboxPrev     = document.getElementById("lightboxPrev");
const lightboxNext     = document.getElementById("lightboxNext");

// ─── UTILS ───────────────────────────────────
function saveLocalStorage() {
  localStorage.setItem("likedIds", JSON.stringify([...state.likedIds]));
}

function getFilteredImages() {
  let result = [...images];

  // Category filter
  if (state.activeFilter !== "all") {
    result = result.filter(img => img.category === state.activeFilter);
  }

  // Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(img =>
      img.title.toLowerCase().includes(q) ||
      img.category.toLowerCase().includes(q) ||
      img.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (state.sortBy === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.sortBy === "likes") {
    result.sort((a, b) => b.likes - a.likes);
  }

  return result;
}

// ─── RENDER ──────────────────────────────────
function renderGallery() {
  state.filteredImages = getFilteredImages();
  const imgs = state.filteredImages;

  galleryContainer.innerHTML = "";

  if (imgs.length === 0) {
    emptyState.style.display = "flex";
    emptyState.style.flexDirection = "column";
    emptyState.style.alignItems = "center";
    visibleCount.textContent = "0";
    return;
  }

  emptyState.style.display = "none";
  visibleCount.textContent = imgs.length;

  imgs.forEach((img, i) => {
    const card = createCard(img, i);
    galleryContainer.appendChild(card);
  });
}

function createCard(img, index) {
  const card = document.createElement("div");
  card.className = "card entering";
  card.dataset.id = img.id;
  card.style.animationDelay = `${index * 40}ms`;

  const isLiked = state.likedIds.has(img.id);
  const currentLikes = img.likes + (isLiked ? 1 : 0);

  card.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="${img.src}"
        alt="${img.title}"
        loading="lazy"
        style="${state.viewMode === 'masonry' ? `min-height:${img.height}px` : ''}"
      />
      <div class="card-overlay">
        <span class="card-category">${img.category}</span>
        <h3 class="card-title">${img.title}</h3>
      </div>
      <div class="card-likes">
        <span class="heart">♥</span> ${currentLikes}
      </div>
      <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${img.id}">
        ${isLiked ? '♥ Liked' : '♡ Like'}
      </button>
    </div>
  `;

  // Open lightbox
  card.addEventListener("click", (e) => {
    if (e.target.closest(".like-btn")) return;
    const idx = state.filteredImages.findIndex(i => i.id === img.id);
    openLightbox(idx);
  });

  // Like button
  card.querySelector(".like-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLike(img.id, card);
  });

  return card;
}

function toggleLike(id, card) {
  const btn  = card.querySelector(".like-btn");
  const countEl = card.querySelector(".card-likes");
  const img  = images.find(i => i.id === id);

  if (state.likedIds.has(id)) {
    state.likedIds.delete(id);
    btn.textContent = "♡ Like";
    btn.classList.remove("liked");
    countEl.innerHTML = `<span class="heart">♥</span> ${img.likes}`;
  } else {
    state.likedIds.add(id);
    btn.textContent = "♥ Liked";
    btn.classList.add("liked");
    countEl.innerHTML = `<span class="heart">♥</span> ${img.likes + 1}`;

    // Heartbeat pop animation
    btn.style.transform = "scale(1.15)";
    setTimeout(() => { btn.style.transform = ""; }, 200);
  }

  saveLocalStorage();
}

// ─── LIGHTBOX ────────────────────────────────
function openLightbox(index) {
  state.lightboxIndex = index;
  updateLightboxContent();
  lightbox.classList.add("active");
  lightboxOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxOverlay.classList.remove("active");
  document.body.style.overflow = "";
  state.lightboxIndex = null;
}

function updateLightboxContent() {
  const idx = state.lightboxIndex;
  const img = state.filteredImages[idx];
  if (!img) return;

  lightboxImg.style.opacity = "0";
  setTimeout(() => {
    lightboxImg.src  = img.src.replace("w=800", "w=1200");
    lightboxImg.alt  = img.title;
    lightboxImg.onload = () => { lightboxImg.style.opacity = "1"; };
    lightboxTitle.textContent    = img.title;
    lightboxCategory.textContent = img.category.toUpperCase();
    lightboxDesc.textContent     = img.desc;
    lightboxLikes.textContent    = `♥ ${img.likes + (state.likedIds.has(img.id) ? 1 : 0)} likes`;
    lightboxIndex.textContent    = `${idx + 1} / ${state.filteredImages.length}`;
  }, 160);
}

function prevImage() {
  const total = state.filteredImages.length;
  state.lightboxIndex = (state.lightboxIndex - 1 + total) % total;
  updateLightboxContent();
}

function nextImage() {
  const total = state.filteredImages.length;
  state.lightboxIndex = (state.lightboxIndex + 1) % total;
  updateLightboxContent();
}

// ─── VIEW TOGGLE ─────────────────────────────
function setViewMode(mode) {
  state.viewMode = mode;
  galleryContainer.className = "gallery-container";
  galleryContainer.classList.add(mode === "grid" ? "grid-mode" : "masonry-mode");
  gridViewBtn.classList.toggle("active", mode === "grid");
  masonryViewBtn.classList.toggle("active", mode === "masonry");
  renderGallery();
}

// ─── RESET ───────────────────────────────────
function resetFilters() {
  state.activeFilter = "all";
  state.searchQuery  = "";
  state.sortBy       = "default";
  searchInput.value  = "";

  filterBtns.forEach(b => b.classList.toggle("active", b.dataset.filter === "all"));
  sortBtns.forEach(b  => b.classList.toggle("active",  b.dataset.sort   === "default"));

  renderGallery();
}
window.resetFilters = resetFilters;

// ─── EVENT LISTENERS ─────────────────────────
// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    state.activeFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery();
  });
});

// Sort buttons
sortBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    state.sortBy = btn.dataset.sort;
    sortBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery();
  });
});

// Search (debounced)
let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    state.searchQuery = searchInput.value.trim();
    renderGallery();
  }, 250);
});

// View toggle
gridViewBtn.addEventListener("click", () => setViewMode("grid"));
masonryViewBtn.addEventListener("click", () => setViewMode("masonry"));

// Lightbox controls
lightboxClose.addEventListener("click",   closeLightbox);
lightboxOverlay.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (state.lightboxIndex === null) return;
  if (e.key === "Escape")      closeLightbox();
  if (e.key === "ArrowLeft")   prevImage();
  if (e.key === "ArrowRight")  nextImage();
});

// Touch swipe support for lightbox
let touchStartX = 0;
lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    dx < 0 ? nextImage() : prevImage();
  }
});

// ─── INIT ────────────────────────────────────
setViewMode("masonry");
