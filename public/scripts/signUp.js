(() => {
    // script for Sign Up Page

    document.querySelector("form").addEventListener("submit", event => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
    function validateForm() {
        /*const VALID_NAME = /^[A-Za-z]+(?:[-'\s][A-Za-z]+)*$/;*/
        const VALID_NAME = /^[a-zA-Z]+([\s'-]{1}[a-zA-Z])*$/;
        const VALID_EMAIL = /^[\w.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const VALID_PASSWORD =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@=!?#&*"'√π$%`]).{8,}$/;
        const FIRSTNAME = document.getElementById("firstname");
        const LASTNAME = document.getElementById("lastname");
        const EMAIL = document.getElementById("email");
        const PASSWORD = document.getElementById("password");
        const PASSWORD_CHECK = document.getElementById("passwordCheck");

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
            showFormError(CLASSNAME, "Your passwords do not match");
            return false;
        }
        return true
    }

    function showFormError(className, message) {
        document.querySelector(`.${className}`).innerText = message;
    }

    function checkValue(input, regularExp, message) {
        if (!regularExp.test(input.value)) {
            input.focus();
            const CLASSNAME = input.getAttribute("id");
            showFormError(CLASSNAME, message);
            return false;
        } else {
            return true;
        }
    }
})();
