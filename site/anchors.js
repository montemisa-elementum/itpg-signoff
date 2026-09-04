// Shared section anchors: every section with an id gets a copyable permalink.
function addSectionAnchors() {
  document.querySelectorAll("section.section[id] .section-head h2").forEach((heading) => {
    const id = heading.closest("section.section").id;
    const link = document.createElement("a");
    link.className = "anchor heading-anchor";
    link.href = `#${id}`;
    link.dataset.permalink = "";
    link.title = "Copy link to this section";
    link.setAttribute("aria-label", `Copy link to the ${heading.textContent} section`);
    link.textContent = "#";
    heading.append(link);
  });
}

function copyPermalink(link) {
  const hash = link.getAttribute("href");
  const url = `${location.origin}${location.pathname}${hash}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      link.classList.add("is-copied");
      setTimeout(() => link.classList.remove("is-copied"), 1400);
    }, () => {});
  }
  history.replaceState(null, "", hash);
}

document.addEventListener("DOMContentLoaded", () => {
  addSectionAnchors();
  document.body.addEventListener("click", (event) => {
    const link = event.target.closest("[data-permalink]");
    if (!link) return;
    event.preventDefault();
    copyPermalink(link);
  });
});
