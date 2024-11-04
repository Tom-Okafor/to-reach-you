(() => {
    // script for Sign Up Page

    document.querySelector("form").addEventListener("submit", event => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
    function validateForm() {
        const VALID_NAME = /^[a-zA-Z]+([\s'-]{1}[a-zA-Z]+)*$/;
        const VALID_EMAIL = /^[\w.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const VALID_PASSWORD =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@=!?#&*"'√π$%`]).{8,}$/;
        const FIRSTNAME = document.getElementById("firstname");
        const LASTNAME = document.getElementById("lastname");
        const EMAIL = document.getElementById("email");
        const PASSWORD = document.getElementById("password");
        const PASSWORD_CHECK = document.getElementById("passwordCheck");

        clearErrorMessage();

        if (
            !checkValue(
                FIRSTNAME,
                VALID_NAME,
                "Please, input a valid firstname"
            )
        ) {
            return false;
        }

        if (
            !checkValue(LASTNAME, VALID_NAME, "Please, input a valid lastname")
        ) {
            return false;
        }

        if (!checkValue(EMAIL, VALID_EMAIL, "Please, input a valid email")) {
            return false;
        }

        if (
            !checkValue(
                PASSWORD,
                VALID_PASSWORD,
                "Please, input a valid password"
            )
        ) {
            return false;
        }

        if (PASSWORD.value !== PASSWORD_CHECK.value) {
            const CLASSNAME = PASSWORD_CHECK.getAttribute("id");
            showFormError(CLASSNAME, "Your passwords do not match", "error");
            PASSWORD_CHECK.focus();
            PASSWORD_CHECK.addEventListener("input", () => {
                if (PASSWORD.value !== PASSWORD_CHECK.value) {
                    showFormError(
                        CLASSNAME,
                        "Your passwords do not match",
                        "error"
                    );
                } else {
                    showFormError(CLASSNAME, "Match!🎊🎊", "correct");
                }
            });
            return false;
        }
        return true;
    }

    function showFormError(className, message, formatClass) {
        document.querySelector(`.${className}`).innerText = message;
        document.querySelector(
            `.${className}`
        ).className = `${className} ${formatClass}`;
    }

    function checkValue(input, regularExp, message) {
        if (!regularExp.test(input.value.trim())) {
            input.focus();
            const CLASSNAME = input.getAttribute("id");
            showFormError(CLASSNAME, message, "error");
            input.addEventListener("input", () => {
                clearErrorMessage();
                if (regularExp.test(input.value.trim())) {
                    showFormError(CLASSNAME, "Correct!", "correct");
                } else {
                    showFormError(
                        CLASSNAME,
                        `Please, input a valid ${CLASSNAME}`,
                        "error"
                    );
                }
            });
            return false;
        } else {
            return true;
        }
    }

    function clearErrorMessage() {
        document.querySelectorAll("fieldset span").forEach(span => {
            span.innerText = "";
            span.className = span.classList[0];
        });
    }

    function togglePasswordVisibility() {
        let isPasswordVisible = false;
        const TOGGLE_KEYS = document.querySelectorAll(".passwordBox a");
        TOGGLE_KEYS.forEach(ToggleKey => {
            ToggleKey.addEventListener("click", () => {
                if (!isPasswordVisible) {
                    ToggleKey.previousElementSibling.setAttribute(
                        "type",
                        "text"
                    );
                    ToggleKey.innerText = "hide";
                    isPasswordVisible = true;
                } else {
                    ToggleKey.previousElementSibling.setAttribute(
                        "type",
                        "password"
                    );
                                        ToggleKey.innerText = 'show'
                                        
                    isPasswordVisible = false;
                }
            });
        });
    }
    togglePasswordVisibility();
})();
