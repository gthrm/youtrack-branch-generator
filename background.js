// Background script для обработки HTTP Basic Auth

// Функция проверки, является ли домен тестовым
const isTestDomain = (url) => {
  try {
    const hostname = new URL(url).hostname;
    return (
      hostname.startsWith("new.vpn-naruzhu.com") ||
      hostname.startsWith("test.ubstv.click")
    );
  } catch (e) {
    return false;
  }
};

// Слушатель для обработки запросов авторизации
chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    // Проверяем, является ли домен тестовым
    if (isTestDomain(details.url)) {
      console.log(`Требуется авторизация для: ${details.url}`);

      // Получаем сохраненные учетные данные
      chrome.storage.local.get(["devLogin", "devPassword"], (data) => {
        if (data.devLogin && data.devPassword) {
          console.log("Используем сохраненные учетные данные для авторизации");

          // Возвращаем учетные данные
          callback({
            authCredentials: {
              username: data.devLogin,
              password: data.devPassword,
            },
          });
        } else {
          console.log("Учетные данные не найдены");
          // Продолжаем без предоставления учетных данных
          callback();
        }
      });

      return true; // Необходимо для асинхронного колбэка
    }

    return false; // Пусть браузер обрабатывает другие запросы авторизации
  },
  { urls: ["<all_urls>"] },
  ["asyncBlocking"]
);

// Слушатель для установки расширения
chrome.runtime.onInstalled.addListener(() => {
  console.log("Расширение установлено/обновлено");
});
