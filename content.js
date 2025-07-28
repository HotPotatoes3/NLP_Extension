const processedLinks = new Set();

const scoreLink = (url) => {
  if (url.includes('.gov') || url.includes('.edu')) return 1;
  if (url.includes('.org')) return 2;
  if (url.includes('.com')) return 3;
  return 0;
};

const highlightColor = (score) => {
  switch (score) {
    case 1: return '#a2d5c6'; // greenish
    case 2: return '#ffeaa7'; // yellow
    case 3: return '#fab1a0'; // pink
    default: return '';
  }
};

// 🧠 Your filtering logic for valid Google search links
const getValidLinks = () => {
  return Array.from(document.querySelectorAll('a')).filter(a => {
    const href = a.href;
    if (!href || href.includes("google.com") || href.startsWith("javascript:")) return false;
    const rect = a.getBoundingClientRect();
    if (rect.height === 0 || rect.width === 0) return false;
    let parent = a;
    while (parent) {
      if (
        parent.hasAttribute?.("data-sokoban-container") ||
        parent.getAttribute("jscontroller")?.startsWith("SC7lYd")
      ) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  });
};

function highlightAndAttachHover() {
  const links = getValidLinks();
  for (const link of links) {
    if (processedLinks.has(link)) continue;
    processedLinks.add(link);

    const score = scoreLink(link.href);
    if (score === 0) continue;

    // Highlight
    link.style.backgroundColor = highlightColor(score);

    let removeTimeout;

    const handleMouseLeave = () => {
      removeTimeout = setTimeout(() => {
        tooltip.remove();
      }, 200); // small delay
    };

    const handleMouseEnterTooltip = () => clearTimeout(removeTimeout);

    tooltip.addEventListener("mouseenter", handleMouseEnterTooltip);
    tooltip.addEventListener("mouseleave", () => tooltip.remove());

    link.addEventListener("mouseleave", handleMouseLeave);

  }
}

// Run once on page load
highlightAndAttachHover();

// Watch for dynamically loaded results (scroll/AJAX)
const observer = new MutationObserver(highlightAndAttachHover);
observer.observe(document.body, { childList: true, subtree: true });
