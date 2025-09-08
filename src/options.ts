import { UserData } from "./types";

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    ["userData"],
    ({ userData }: { userData: UserData }) => {
      if (userData) {
        (document.getElementById("name") as HTMLInputElement).value =
          userData.name || "";
        (document.getElementById("email") as HTMLInputElement).value =
          userData.email || "";
        (document.getElementById("phone") as HTMLInputElement).value =
          userData.phone || "";
        (document.getElementById("address") as HTMLInputElement).value =
          userData.address || "";
        (document.getElementById("education") as HTMLInputElement).value =
          userData.education || "";
        (document.getElementById("skills") as HTMLInputElement).value =
          userData.skills ? userData.skills.join(", ") : "";
        (document.getElementById("coverLetter") as HTMLInputElement).value =
          userData.coverLetter || "";
      }
    }
  );
});

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
