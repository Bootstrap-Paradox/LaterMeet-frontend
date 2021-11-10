
function regex({ checkFor = "", check = "email" }) {
    switch (check) {
        case "email":
            let mailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (mailCheck.test(checkFor)) {
                return true;
            }
            return false;

        case "password":
            let passwordConfirmation = {}
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

            if (checkFor === "") {
                passwordConfirmation["type"] = "";
                passwordConfirmation["value"] = "0";

            }
            else if (strongPassword.test(checkFor)) {
                passwordConfirmation["type"] = "strong";
                passwordConfirmation["value"] = "100";
            }
            else if (mediumPassword.test(checkFor)) {
                passwordConfirmation["type"] = "medium";
                passwordConfirmation["value"] = "50";
            }
            else {
                passwordConfirmation["type"] = "weak";
                passwordConfirmation["value"] = "20";
            }

            return passwordConfirmation;

        default:
            throw new Error("Regex Error");
    }
}

export default regex;