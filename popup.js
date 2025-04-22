document.addEventListener("DOMContentLoaded", () => {
  // Загрузка сохраненных значений
  chrome.storage.local.get(["gptToken", "devLogin", "devPassword"], (data) => {
    if (data.gptToken) {
      document.getElementById("gptToken").value = data.gptToken;
    }
    if (data.devLogin) {
      document.getElementById("devLogin").value = data.devLogin;
    }
    if (data.devPassword) {
      document.getElementById("devPassword").value = data.devPassword;
    }
  });

  // Функция для показа сообщения об успехе
  function showSuccess(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = "block";
    setTimeout(() => {
      element.style.display = "none";
    }, 2000);
  }

  // Сохранение GPT токена
  document.getElementById("saveToken").addEventListener("click", () => {
    const token = document.getElementById("gptToken").value;
    chrome.storage.local.set({ gptToken: token }, () => {
      showSuccess("tokenSuccess");
    });
  });

  // Сохранение учетных данных разработки
  document
    .getElementById("saveDevCredentials")
    .addEventListener("click", () => {
      const login = document.getElementById("devLogin").value;
      const password = document.getElementById("devPassword").value;

      chrome.storage.local.set(
        {
          devLogin: login,
          devPassword: password,
        },
        () => {
          showSuccess("credSuccess");
        }
      );
    });
});
