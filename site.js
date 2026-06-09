(function () {
  const button = document.querySelector("[data-share-button]");

  if (!button) {
    return;
  }

  const originalText = button.textContent;

  async function copyPageLink() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      button.textContent = "Link copied";
    } catch (error) {
      button.textContent = "Copy failed";
    }

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  }

  button.addEventListener("click", copyPageLink);
})();

(function () {
  function openLightbox(src, alt, labels) {
    const overlay = document.createElement("div");
    overlay.className = "img-lightbox";
    const box = document.createElement("div");
    box.className = "img-lightbox-box";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    box.appendChild(img);
    if (labels.length) {
      const row = document.createElement("div");
      row.className = "img-labels img-labels--lightbox";
      labels.forEach(function (label) {
        const s = document.createElement("span");
        s.textContent = label.text;
        s.style.flex = label.weight;
        row.appendChild(s);
      });
      box.appendChild(row);
    }
    overlay.appendChild(box);
    overlay.addEventListener("click", () => overlay.remove());
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", onKey); }
    });
    document.body.appendChild(overlay);
  }

  document.querySelectorAll(".field-img-wrap img").forEach(function (img) {
    const inner = document.createElement("div");
    inner.className = "field-img-inner";
    img.parentNode.insertBefore(inner, img);
    inner.appendChild(img);
  });

  document.addEventListener("click", function (e) {
    const wrap = e.target.closest(".field-img-wrap");
    if (!wrap) return;
    const img = wrap.querySelector("img");
    if (!img) return;
    const labelEls = Array.from(wrap.querySelectorAll(".img-labels span"));
    const labels = labelEls.map(function (s) { return { text: s.textContent, weight: s.dataset.weight || "1" }; });
    openLightbox(img.src, img.alt, labels);
  });
})();
