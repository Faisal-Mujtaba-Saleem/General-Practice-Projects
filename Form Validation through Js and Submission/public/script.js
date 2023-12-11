function passwordStricter(string) {
    let regex1 = /[A-Z]+/;
    let regex2 = /[a-z]+/;
    let regex3 = /\d/
    let regex4 = /\D\W/
    return regex1.test(string) && regex2.test(string) && regex3.test(string) && regex4.test(string);
}

function clearErrors() {

    errors = document.getElementsByClassName('formerror');
    for (let item of errors) {
        item.innerHTML = "";
    }

}
function seterror(id, error) {
    //sets error inside tag of id 
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function validateForm() {
    let returnval = true;
    clearErrors();

    //perform validation and if validation fails, set the value of returnval to false
    let name = document.forms['myForm']["name"].value;
    if (name.length < 5) {
        seterror("fname", "*Length of name is too short");
        returnval = false;
    }

    if (name.length == 0) {
        seterror("fname", "*Length of name cannot be zero!");
        returnval = false;
    }

    let email = document.forms['myForm']["email"].value;
    if (email.length > 30) {
        seterror("femail", "*Email length is too long");
        returnval = false;
    }

    let phone = document.forms['myForm']["phone"].value;
    if (phone.length != 11) {
        seterror("fphone", "*Phone number should be of 10 digits!");
        returnval = false;
    }

    let password = document.forms['myForm']["password"].value;
    let condition1 = password.length < 6;
    let condition2 = !passwordStricter(password);
    if (condition1 || condition2) {

        // Quiz: create a logic to allow only those passwords which contain atleast one letter, one number and one special character and one uppercase letter
        if (condition1 && condition2) {
            seterror("fpass", "*Password should be atleast 6 characters long! and it should contain atleast one letter, one number and one special character and one uppercase letter!");
            returnval = false;
        } else if (condition1) {
            seterror("fpass", "*Password should be atleast 6 characters long!");
            returnval = false;
        } else {
            seterror("fpass", "*Password should contain atleast one letter, one number and one special character and one uppercase letter!");
            returnval = false;
        }

    }

    let cpassword = document.forms['myForm']["cpass"].value;
    if (cpassword != password) {
        seterror("fcpass", "*Password and Confirm password should match!");
        returnval = false;
    }

    return returnval;
}

