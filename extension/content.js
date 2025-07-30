const processedLinks = new Set();
const linkData = [];

// Score logic based on hostname
function getScore(hostname) {
  if (hostname.endsWith(".gov") || hostname.endsWith(".edu")) return 3;
  if (hostname.endsWith(".org")) return 2;
  if (hostname.endsWith(".com")) return 1;
  return 0;
}

function getColor(score) {
  if (score === 3) return "#cce5ff";    // .edu/.gov
  if (score === 2) return "#d4edda";    // .org
  if (score === 1) return "#ffeeba";    // .com
  return "#f8d7da";                     // unknown
}

function highlightLink(linkEl, score) {
  linkEl.style.backgroundColor = getColor(score);
  linkEl.style.borderRadius = "6px";
  linkEl.style.padding = "2px 4px";
  linkEl.style.transition = "background-color 0.3s";
}

function removeHighlight(linkEl) {
  linkEl.style.backgroundColor = "transparent";
}

// Main logic
function getValidLinks() {
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
}

function highlightAndAttachHover() {
  const links = getValidLinks();

  for (const link of links) {
    if (processedLinks.has(link)) continue;
    processedLinks.add(link);

    let hostname;
    try {
      const url = new URL(link.href);
      hostname = url.hostname;
    } catch {
      continue;
    }

    const score = getScore(hostname);
    highlightLink(link, score);
    linkData.push({ href: link.href, domain: hostname, score, element: link });

    // Attach tooltip
    link.addEventListener("mouseenter", async () => {
    const tooltip = document.createElement("div");

    // Add heading
    const heading = document.createElement("div");
    heading.textContent = "Credibility Overview";
    heading.style.fontWeight = "bold";
    heading.style.marginBottom = "4px";

    // Add placeholder for summary
    const summaryText = document.createElement("div");
    summaryText.textContent = "Loading credibility...";

    // Tooltip container
    Object.assign(tooltip.style, {
      position: "absolute",
      top: (link.getBoundingClientRect().top + window.scrollY - 60) + "px",
      left: (link.getBoundingClientRect().left + window.scrollX) + "px",
      backgroundColor: "white",
      padding: "6px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "12px",
      zIndex: 9999,
      maxWidth: "300px"
    });

    tooltip.appendChild(heading);
    tooltip.appendChild(summaryText);
    document.body.appendChild(tooltip);

    try {
      const response = await fetch("http://localhost:3000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link.href }),
      });
      const data = await response.json();
      summaryText.textContent = data.summary || "No response";
    } catch (err) {
      summaryText.textContent = "Error fetching credibility info.";
    }

    let removeTimeout;

    const handleMouseLeave = () => {
      removeTimeout = setTimeout(() => tooltip.remove(), 200);
    };

    tooltip.addEventListener("mouseenter", () => clearTimeout(removeTimeout));
    tooltip.addEventListener("mouseleave", () => tooltip.remove());
    link.addEventListener("mouseleave", handleMouseLeave);
    });
  }
}

// Initial run
highlightAndAttachHover();

// Observe dynamic changes
const observer = new MutationObserver(highlightAndAttachHover);
observer.observe(document.body, { childList: true, subtree: true });

// Respond to popup requests (optional, from original)
chrome?.runtime?.onMessage?.addListener((request, sender, sendResponse) => {
  if (request.action === "getScoredLinks") {
    sendResponse({
      links: linkData.map(({ href, domain, score }) => ({ href, domain, score }))
    });
  }

  if (request.action === "filterLinksByScore") {
    const allowed = request.allowedScores;
    linkData.forEach(({ score, element }) => {
      if (allowed.includes(score)) {
        highlightLink(element, score);
      } else {
        removeHighlight(element);
      }
    });
  }
});
