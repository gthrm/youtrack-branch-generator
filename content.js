// Helper function to generate a branch name
const generateBranchName = async (issueKey, title, gptToken) => {
  let branchName;

  if (gptToken) {
    // Use GPT API to translate
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gptToken}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "When translating phrases or technical descriptions from Russian to English, understand the context and informal language used. For example, if the phrase includes slang or expressions like ‘поехали стили,’ it means ‘the styles are broken or messed up.’ Avoid literal translations when slang is used, and focus on conveying the meaning in a way that makes sense in the context. Always clarify if you’re unsure about the intended meaning. Translate this text from Russian translit to English for a Git branch name, keeping it concise:",
          },
          {
            role: "user",
            content: title,
          },
        ],
      }),
    });

    const data = await response.json();
    const translatedTitle = data.choices[0].message.content
      .toLocaleLowerCase()
      .split(" ")
      .join("-")
      .replaceAll(/[^a-z0-9-]/g, "");

    branchName = `${issueKey}_${translatedTitle.slice(0, 100)}`;
  } else {
    // Default local generation
    const formattedTitle = title
      .toLocaleLowerCase()
      .split(" ")
      .join("-")
      .replaceAll(/[^a-z0-9-]/g, "");

    branchName = `${issueKey}_${formattedTitle}`;
  }

  return branchName;
};

// Add button to the page
const addCopyButton = () => {
  const existingButton = document.getElementById("copyBranchNameButton");
  if (existingButton) return;

  const button = document.createElement("button");
  button.id = "copyBranchNameButton";
  button.textContent = "Copy branch name";
  button.style.backgroundColor = "#007bff";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.padding = "10px 15px";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";

  button.addEventListener("click", async () => {
    const urlParts = window.location.pathname.split("/");
    const issueKey = urlParts[2].toUpperCase();
    const title = urlParts.slice(3).join("-");

    chrome.storage.local.get("gptToken", async (data) => {
      const gptToken = data.gptToken;
      const branchName = await generateBranchName(issueKey, title, gptToken);

      navigator.clipboard.writeText(branchName).then(() => {
        alert(`Branch name copied: ${branchName}`);
      });
    });
  });

  const observer = new MutationObserver(() => {
    const parent = document.querySelector("[class^='summaryToolbar__']");
    if (parent) {
      parent.appendChild(button);
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

if (
  window.location.hostname.endsWith("youtrack.cloud") &&
  window.location.pathname.includes("/issue/")
) {
  addCopyButton();
}
