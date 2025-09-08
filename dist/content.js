"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractFormFields = () => {
    const fields = [];
    document.querySelectorAll("input, textarea, select").forEach((input) => {
        var _a, _b;
        const inputElement = input;
        const label = ((_a = inputElement.closest("label")) === null || _a === void 0 ? void 0 : _a.innerText) ||
            ((_b = document.querySelector(`label[for='${inputElement.id}']`)) === null || _b === void 0 ? void 0 : _b.innerText) ||
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
chrome.storage.sync.get(["userData"], (_a) => __awaiter(void 0, [_a], void 0, function* ({ userData }) {
    if (!userData)
        return;
    const fields = extractFormFields();
    console.log("Detected fields:", fields);
}));
console.log("Content script injected");
const input = document.querySelector("input[name = 'username']");
if (input) {
    input.value = "Ayush";
}
