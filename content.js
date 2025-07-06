// Store all links and their associated DOM elements
const linkData = [];

function getScore(hostname) {
  if (hostname.endsWith(".org")) return 2;
  if (hostname.endsWith(".com")) return 3;
  if (hostname.endsWith(".edu")) return 1;
  if (hostname.endsWith(".gov")) return 1;
  return 0;
}

function getColor(score) {
  if (score >= 3) return "#ffeeba";
  if (score === 2) return "#d4edda";
  if (score === 1) return "#cce5ff";
  return "#f8d7da";
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

console.log("✅ Search Link Analyzer content script loaded");

// Select result links
const links = Array.from(document.querySelectorAll('a')).filter(a => {
  const href = a.href;
  if (!href || href.includes("google.com") || href.startsWith("javascript:")) return false;
  const rect = a.getBoundingClientRect();
  if (rect.height === 0 || rect.width === 0) return false;
  let parent = a;
  while (parent) {
    if (parent.hasAttribute?.("data-sokoban-container") || parent.getAttribute("jscontroller")?.startsWith("SC7lYd")) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
});

links.forEach(link => {
  try {
    const url = new URL(link.href);
    const hostname = url.hostname;
    const domain = hostname.split('.').slice(-2).join('.');
    const score = getScore(hostname);

    // Save reference for filtering
    linkData.push({ href: url.href, domain, score, element: link });

    // Apply initial highlight
    highlightLink(link, score);
  } catch {}
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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

