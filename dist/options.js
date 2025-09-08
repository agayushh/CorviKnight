"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["userData"], ({ userData }) => {
        if (userData) {
            document.getElementById("name").value =
                userData.name || "";
            document.getElementById("email").value =
                userData.email || "";
            document.getElementById("phone").value =
                userData.phone || "";
            document.getElementById("address").value =
                userData.address || "";
            document.getElementById("education").value =
                userData.education || "";
            document.getElementById("skills").value =
                userData.skills ? userData.skills.join(", ") : "";
            document.getElementById("coverLetter").value =
                userData.coverLetter || "";
        }
    });
});
(_a = document.getElementById("save")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value
            .split(",")
            .map((s) => s.trim()),
        coverLetter: document.getElementById("coverLetter")
            .value,
    };
    chrome.storage.sync.set({ userData }, () => {
        alert("Data saved!");
    });
});
