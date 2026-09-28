
const $ = (selector) => document.querySelector(selector);

$("#brand-name").textContent = SITE.name;
$("#footer-name").textContent = SITE.name;
$("#hero-title").textContent = SITE.heroTitle;
$("#hero-text").textContent = SITE.heroText;
$("#about-title").textContent = SITE.aboutTitle;
$("#about-text").textContent = SITE.aboutText;
$("#year").textContent = new Date().getFullYear();

const contactLinks = $("#contact-links");

if (SITE.email && SITE.email !== "YOUR_EMAIL_HERE") {
  const email = document.createElement("a");
  email.className = "contact-link";
  email.href = `mailto:${SITE.email}`;
  email.textContent = SITE.email;
  contactLinks.appendChild(email);
}

SITE.links.forEach((item) => {
  const a = document.createElement("a");
  a.className = "contact-link";
  a.href = item.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = item.label;
  contactLinks.appendChild(a);
});

const grid = $("#project-grid");
const dialog = $("#project-dialog");
const gallery = $("#gallery");
const mediaStage = $("#media-stage");
const dialogImage = $("#dialog-image");
const videoWrap = $("#video-wrap");
const dialogVideo = $("#dialog-video");
const galleryPrev = $("#gallery-prev");
const galleryNext = $("#gallery-next");
const galleryCounter = $("#gallery-counter");
const dialogTitle = $("#dialog-title");
const dialogDescription = $("#dialog-description");
const dialogTags = $("#dialog-tags");
const dialogLinks = $("#dialog-links");

let activeMedia = [];
let activeMediaIndex = 0;
let mediaSwitching = false;

function normalizeMedia(project) {
  if (Array.isArray(project.media)) {
    return project.media.filter((item) => item && item.src);
  }

  // Backwards compatibility with older config format.
  if (Array.isArray(project.images)) {
    return project.images
      .filter(Boolean)
      .map((src) => ({ type: "image", src }));
  }

  if (project.image) {
    return [{ type: "image", src: project.image }];
  }

  return [];
}

function getYouTubeId(input) {
  if (!input) return "";

  // Plain 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2] || "";
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || "";
      }

      return url.searchParams.get("v") || "";
    }
  } catch (e) {
    return "";
  }

  return "";
}

function youtubeEmbedUrl(input) {
  const id = getYouTubeId(input);
  if (!id) return "";
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

function youtubeThumbnail(input) {
  const id = getYouTubeId(input);
  if (!id) return "";
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function makeTags(tags) {
  const fragment = document.createDocumentFragment();

  (tags || []).forEach((tag) => {
    const el = document.createElement("span");
    el.className = "tag";
    el.textContent = tag;
    fragment.appendChild(el);
  });

  return fragment;
}

function stopVideo() {
  dialogVideo.src = "";
}

function renderMedia() {
  stopVideo();

  if (activeMedia.length === 0) {
    gallery.hidden = true;
    return;
  }

  gallery.hidden = false;

  const item = activeMedia[activeMediaIndex];
  const type = (item.type || "image").toLowerCase();

  if (type === "youtube") {
    dialogImage.hidden = true;
    videoWrap.hidden = false;

    const embed = youtubeEmbedUrl(item.src);
    dialogVideo.src = embed;
  } else {
    videoWrap.hidden = true;
    dialogImage.hidden = false;

    dialogImage.src = item.src;
    dialogImage.alt = `${dialogTitle.textContent} — image ${activeMediaIndex + 1}`;
  }

  const hasSeveral = activeMedia.length > 1;

  galleryPrev.disabled = !hasSeveral;
  galleryNext.disabled = !hasSeveral;

  galleryCounter.hidden = !hasSeveral;
  galleryCounter.textContent =
    `${activeMediaIndex + 1} / ${activeMedia.length}`;
}

async function changeMedia(direction) {
  if (activeMedia.length < 2 || mediaSwitching) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    activeMediaIndex =
      (activeMediaIndex + direction + activeMedia.length) % activeMedia.length;
    renderMedia();
    return;
  }

  mediaSwitching = true;

  const exitX = direction > 0 ? -34 : 34;
  const enterX = direction > 0 ? 34 : -34;

  try {
    const exitAnimation = mediaStage.animate(
      [
        { opacity: 1, transform: "translateX(0) scale(1)", filter: "blur(0px)" },
        { opacity: 0, transform: `translateX(${exitX}px) scale(.985)`, filter: "blur(2px)" }
      ],
      {
        duration: 180,
        easing: "cubic-bezier(.4, 0, 1, 1)",
        fill: "forwards"
      }
    );

    await exitAnimation.finished;

    activeMediaIndex =
      (activeMediaIndex + direction + activeMedia.length) % activeMedia.length;

    renderMedia();

    const enterAnimation = mediaStage.animate(
      [
        { opacity: 0, transform: `translateX(${enterX}px) scale(.985)`, filter: "blur(2px)" },
        { opacity: 1, transform: "translateX(0) scale(1)", filter: "blur(0px)" }
      ],
      {
        duration: 260,
        easing: "cubic-bezier(.16, 1, .3, 1)",
        fill: "both"
      }
    );

    await enterAnimation.finished;
  } catch (_) {
    // If the animation is interrupted, make sure the media stays usable.
    mediaStage.getAnimations().forEach((animation) => animation.cancel());
  } finally {
    mediaSwitching = false;
  }
}

function openProject(project) {
  dialogTitle.textContent = project.title;
  dialogDescription.textContent =
    project.description || project.short || "";

  dialogTags.innerHTML = "";
  dialogTags.appendChild(makeTags(project.tags));

  dialogLinks.innerHTML = "";

  (project.links || []).forEach((item) => {
    const a = document.createElement("a");
    a.className = "button ghost";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = item.label;
    dialogLinks.appendChild(a);
  });

  activeMedia = normalizeMedia(project);
  activeMediaIndex = 0;

  renderMedia();
  dialog.showModal();
}

function makeProjectCover(project) {
  const media = normalizeMedia(project);

  const firstImage = media.find((item) => {
    return (item.type || "image").toLowerCase() === "image";
  });

  if (firstImage) {
    const img = document.createElement("img");
    img.className = "project-cover";
    img.src = firstImage.src;
    img.alt = project.title;
    img.loading = "lazy";
    return img;
  }

  const firstVideo = media.find((item) => {
    return (item.type || "").toLowerCase() === "youtube";
  });

  if (firstVideo) {
    const thumb = youtubeThumbnail(firstVideo.src);

    if (thumb) {
      const img = document.createElement("img");
      img.className = "project-cover";
      img.src = thumb;
      img.alt = `${project.title} video thumbnail`;
      img.loading = "lazy";
      return img;
    }
  }

  const placeholder = document.createElement("div");
  placeholder.className = "project-cover project-placeholder";
  placeholder.textContent = project.title.slice(0, 1).toUpperCase();
  return placeholder;
}

SITE.projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.tabIndex = 0;

  const cover = makeProjectCover(project);

  const body = document.createElement("div");
  body.className = "project-body";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const short = document.createElement("p");
  short.textContent = project.short || "";

  const tags = document.createElement("div");
  tags.className = "tags";
  tags.appendChild(makeTags(project.tags));

  body.append(title, short, tags);
  card.append(cover, body);

  card.addEventListener("click", () => openProject(project));

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(project);
    }
  });

  grid.appendChild(card);
});

galleryPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  changeMedia(-1);
});

galleryNext.addEventListener("click", (e) => {
  e.stopPropagation();
  changeMedia(1);
});

$("#dialog-close").addEventListener("click", () => {
  stopVideo();
  dialog.close();
});

dialog.addEventListener("close", stopVideo);

dialog.addEventListener("click", (e) => {
  const rect = dialog.getBoundingClientRect();

  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!inside) {
    stopVideo();
    dialog.close();
  }
});

document.addEventListener("keydown", (e) => {
  if (!dialog.open) return;

  if (e.key === "ArrowLeft") changeMedia(-1);
  if (e.key === "ArrowRight") changeMedia(1);
});
