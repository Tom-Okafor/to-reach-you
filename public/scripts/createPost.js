(() => {
  const FORM_ELEM = document.querySelector("form");
  const VALIDATE_FORM = function () {
    const TITLE_INPUT = document.getElementById("title");
    const CATEGORY_OPTION = document.getElementById("category");
    const CONTENT_INPUT = document.getElementById("content");
    if (TITLE_INPUT.value.length > 200) {
      console.log(TITLE_INPUT.value);
      return false;
    }
    if (CATEGORY_OPTION.value === "none") {
      console.log(CATEGORY_OPTION.value);
      return false;
    }
    if (CONTENT_INPUT.value.length < 700) {
      console.log(CONTENT_INPUT.value);
      return false;
    }
    return true;
    console.log(TITLE_INPUT.parentElement.querySelector("p").innerText);
  };

  FORM_ELEM.addEventListener("submit", () => {
    console.log(VALIDATE_FORM());
  });
})();
