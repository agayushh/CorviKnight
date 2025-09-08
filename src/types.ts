export interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
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
