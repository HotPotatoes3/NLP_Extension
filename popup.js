document.getElementById("applyFilter").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const allowedScores = Array.from(checkboxes).map(cb => parseInt(cb.value));

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "filterLinksByScore",
      allowedScores: allowedScores
    });
  });
});
