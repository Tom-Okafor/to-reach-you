(() => {
    let isPasswordVisible = false;
    const TOGGLE_KEYS = document.querySelectorAll(".passwordBox a");
    TOGGLE_KEYS.forEach(ToggleKey => {
        ToggleKey.addEventListener("click", () => {
            if (!isPasswordVisible) {
                ToggleKey.previousElementSibling.setAttribute("type", "text");
                ToggleKey.innerText = "hide";
                isPasswordVisible = true;
            } else {
                ToggleKey.previousElementSibling.setAttribute(
                    "type",
                    "password"
                );
                ToggleKey.innerText = "show";

                isPasswordVisible = false;
            }
        });
    });
})();
