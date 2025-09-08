"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const normalize = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim();
};
const matchField = (field, userData) => {
    const fieldKey = normalize(field.name || field.label || field.placeholder || "");
    if (userData[fieldKey]) {
        return userData[fieldKey];
    }
    for (const [key, aliases] of Object.entries(types_1.FIELD_ALIASES)) {
        if (aliases.some((alias) => fieldKey.includes(normalize(alias)))) {
            return userData[key];
        }
    }
    return undefined;
};
const extractFormFields = () => {
    const fields = [];
    document.querySelectorAll("input, textarea, select").forEach((input) => {
        const inputElement = input;
        const label = inputElement.closest("label")?.innerText ||
            document.querySelector(`label[for='${inputElement.id}']`)?.innerText ||
            inputElement.getAttribute("placeholder") ||
            inputElement.getAttribute("name") ||
            "";
        fields.push({
            id: inputElement.id,
            name: inputElement.name,
            placeholder: input.placeholder || "",
            label,
            type: input.type,
        });
    });
    return fields;
};
const fillForm = (fields, userData) => {
    fields.forEach((field) => {
        const value = (field.name && userData[field.name]) ||
            (field.label && userData[field.label]);
        if (value) {
            const inputEl = document.querySelector(`[name='${field.name}']`) ||
                document.getElementById(field.id);
            if (inputEl)
                inputEl.value = value;
        }
    });
};
chrome.storage.sync.get(["userData"], async ({ userData }) => {
    if (!userData)
        return;
    const fields = extractFormFields();
    console.log("Detected fields:", fields);
    fillForm(fields, userData);
});
console.log("Content script injected");
