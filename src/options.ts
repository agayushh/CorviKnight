import { UserData } from "./types";

document.getElementById("save")?.addEventListener("click", () => {
  const userData: UserData = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    address: (document.getElementById("address") as HTMLInputElement).value,
    education: (document.getElementById("education") as HTMLInputElement).value,
    skills: (document.getElementById("skills") as HTMLInputElement).value
      .split(",")
      .map((s) => s.trim()),
    coverLetter: (document.getElementById("coverLetter") as HTMLInputElement)
      .value,
  };

  chrome.storage.sync.set({ userData }, () => {
    alert("Data saved!");
  });
});
