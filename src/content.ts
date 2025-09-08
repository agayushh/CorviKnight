import { UserData, FormField, FIELD_ALIASES } from "./types";
const normalize = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
};
const matchField = (
  field: FormField,
  userData: UserData
): string | undefined => {
  const fieldKey = normalize(
    field.name || field.label || field.placeholder || ""
  );
  if (userData[fieldKey as keyof UserData]) {
    return userData[fieldKey as keyof UserData] as string;
  }
  for (const [key, aliases] of Object.entries(FIELD_ALIASES)) {
    if (aliases.some((alias) => fieldKey.includes(normalize(alias)))) {
      return userData[key as keyof UserData] as string;
    }
  }
  return undefined;
};

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
      const inputEl =
        document.querySelector<HTMLInputElement>(`[name='${field.name}']`) ||
        (document.getElementById(field.id) as HTMLInputElement);
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
