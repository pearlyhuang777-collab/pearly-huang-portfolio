
(function () {
  "use strict";

  const translations = window.portfolioTranslations || {};
  const supportedLanguages = ["EN", "简体", "繁體"];

  function applyLanguage(language) {
    const selectedLanguage = supportedLanguages.includes(language)
      ? language
      : "EN";

    const dictionary = translations[selectedLanguage];

    if (!dictionary) {
      console.error("Language dictionary not found:", selectedLanguage);
      return;
    }

    document.documentElement.lang =
      selectedLanguage === "EN"
        ? "en"
        : selectedLanguage === "简体"
          ? "zh-CN"
          : "zh-TW";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.innerHTML = dictionary[key];
      }
    });

    document.querySelectorAll(".lang-btn").forEach((button) => {
      const isActive = button.dataset.lang === selectedLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem("pearly-portfolio-language", selectedLanguage);
    } catch (error) {
      console.warn("Language preference could not be saved.");
    }
  }

  // Language switcher
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
    });
  });

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Restore the last selected language.
  let savedLanguage = "EN";

  try {
    const storedLanguage = localStorage.getItem(
      "pearly-portfolio-language"
    );

    if (supportedLanguages.includes(storedLanguage)) {
      savedLanguage = storedLanguage;
    }
  } catch (error) {
    console.warn("Using the default English language.");
  }

  // English is the default language for first-time visitors.
  applyLanguage(savedLanguage);

  console.log("Pearly Huang Portfolio initialized successfully.");
})();
