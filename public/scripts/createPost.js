(() => {
  const FORM_ELEM = document.querySelector("form");
  const VALIDATE_FORM = function () {
    const TITLE_INPUT = document.getElementById("title");
    const CATEGORY_OPTION = document.getElementById("category");
    const CONTENT_INPUT = document.getElementById("content");
    // if (TITLE_INPUT.value.length > 200) {
    //   return;
    // }
    console.log(TITLE_INPUT.parentElement.querySelector("p").innerText);
  };
  VALIDATE_FORM();
})();
