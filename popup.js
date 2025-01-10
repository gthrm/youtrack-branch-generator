document.getElementById("saveToken").addEventListener("click", () => {
  const token = document.getElementById("gptToken").value;
  chrome.storage.local.set({ gptToken: token }, () => {
    alert("Token saved successfully!");
  });
});
