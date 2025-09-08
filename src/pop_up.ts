document.getElementById("fill")?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.ts"]
      });
    }
  });
});
