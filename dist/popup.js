"use strict";
var _a;
(_a = document.getElementById("fill")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            });
        }
    });
});
