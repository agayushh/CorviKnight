import { UserData, FormField } from "./types";

const extractFormFields = (): FormField[] => {
  const fields: FormField[] = [];
  document.querySelectorAll("input, textarea, select").forEach((input) => {
    const inputElement = input as HTMLInputElement;
    const label =
      inputElement.closest("label")?.innerText ||
      (
        document.querySelector(
          `label[for='${inputElement.id}']`
        ) as HTMLLabelElement
      )?.innerText ||
      inputElement.getAttribute("placeholder") ||
      inputElement.getAttribute("name") ||
      "";
    fields.push({
      id: inputElement.id,
      name: inputElement.name,
      placeholder: (input as HTMLInputElement).placeholder || "",

      label,
      type: (input as HTMLInputElement).type,
    });
  });
  return fields;
};

const fillForm = (fields: FormField[], userData: UserData) => {
  fields.forEach((field) => {
    const value =
      (field.name && userData[field.name as keyof UserData]) ||
      (field.label && userData[field.label as keyof UserData]);
    if (value) {
      const inputEl = document.querySelector<HTMLInputElement>(
        `[name='${field.name}']`
        ) || document.getElementById(field.id) as HTMLInputElement;
      if (inputEl) inputEl.value = value as string;
    }
  });
};

chrome.storage.sync.get(
  ["userData"],
  async ({ userData }: { userData: UserData }) => {
    if (!userData) return;
    const fields = extractFormFields();
    console.log("Detected fields:", fields);
    fillForm(fields, userData);
  }
);

console.log("Content script injected");
const input = document.querySelector<HTMLInputElement>(
  "input[name = 'username']"
);
if (input) {
  input.value = "Ayush";
}
