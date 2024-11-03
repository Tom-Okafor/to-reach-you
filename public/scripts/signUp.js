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
    }
})();
