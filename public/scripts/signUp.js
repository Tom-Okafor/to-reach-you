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
        if (!VALID_NAME.test(FIRSTNAME.value)) {
          FIRSTNAME.focus()
            const CLASSNAME = FIRSTNAME.getAttribute("id");
            showFormError(
                CLASSNAME,
                "Please ensure you have inputed a valid firstname"
            );
            return false
        }
    }

    function showFormError(className, message) {
        document.querySelector(`.${className}`).innerText = message;
    }
})();
