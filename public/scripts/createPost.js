(() => {
  const FORM_ELEM = document.querySelector("form");
  const VALIDATE_FORM = function () {
    const TITLE_INPUT = document.getElementById("title");
    const CATEGORY_OPTION = document.getElementById("category");
    const CONTENT_INPUT = document.getElementById("content");
    if (TITLE_INPUT.value.length > 200 || TITLE_INPUT.value.length < 20) {
      sendErrorMessage(
        TITLE_INPUT,
        "Please, enter a valid title of accurate length."
      );
      TITLE_INPUT.addEventListener("input", () => {
        if (TITLE_INPUT.value.length < 200 && TITLE_INPUT.value.length >= 20) {
          sendErrorCorrectedMessage(TITLE_INPUT, "Your title is now correct!");
        }
      });
      return false;
    }
    if (CATEGORY_OPTION.value === "none") {
      sendErrorMessage(
        CATEGORY_OPTION,
        "Please, select a category for your post."
      );
      CATEGORY_OPTION.addEventListener("change", () => {
        if (CATEGORY_OPTION.value !== "none") {
          sendErrorCorrectedMessage(
            CATEGORY_OPTION,
            "You have selected a category."
          );
        }
      });
      return false;
    }
    if (CONTENT_INPUT.value.length < 700) {
      sendErrorMessage(CONTENT_INPUT, "Your content is too short.");
      CONTENT_INPUT.addEventListener("input", () => {
        if (CONTENT_INPUT.value.length >= 700) {
          sendErrorCorrectedMessage(
            CONTENT_INPUT,
            "Your Content is now over 700 words."
          );
        }
      });

      return false;
    }
    return true;
  };

  FORM_ELEM.addEventListener("submit", (event) => {
    switch (VALIDATE_FORM()) {
      case false:
        event.preventDefault();
        break;
    }
  });

  function sendErrorMessage(element, message) {
    element.parentElement.querySelector("p").innerText = message;
    element.parentElement.querySelector("p").style.color = "red";
    element.focus();
  }

  function sendErrorCorrectedMessage(element, message) {
    element.parentElement.querySelector("p").innerText = message;
    element.parentElement.querySelector("p").style.color = "#007870";
  }
})();
