export interface UserData {
  name?: string;
  fullname?: string;   // alias for name
  email?: string;
  phone?: string;
  phonenumber?: string; // alias for phone
  address?: string;
  education?: string;
  skills?: string[];
  coverLetter?: string;
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
