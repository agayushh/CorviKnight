export interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  education?: string;
  skills?: string[];
  coverLetter?: string;
  [key: string]: string | string[] | undefined;
}

export interface FormField {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const FIELD_ALIASES: Record<string, string[]> = {
  name: ["full name", "your name", "candidate name"],
  email: ["email address", "e-mail", "mail"],
  phone: ["phone number", "mobile", "contact number"],
  address: ["home address", "location"],
  education: ["qualification", "degree", "school", "college"],
  skills: ["tech stack", "expertise", "abilities"],
  coverLetter: ["motivation", "statement", "summary"],
};
