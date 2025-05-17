//Task 1: Transforming and Filtering Data with an Unusual Condition
function getQualifiedUserNames(users) {
    return users
        .filter(function (user) {
        var month = new Date(user.registrationDate).getMonth() + 1;
        var isQ2 = month >= 4 && month <= 6;
        var hasSingleViewerRole = user.roles.length === 1 && user.roles[0] === 'viewer';
        return isQ2 && hasSingleViewerRole;
    })
        .map(function (user) { return user.name.split(' ')[0]; })
        .sort(function (a, b) { return b.localeCompare(a); });
}
//Sample Users
var users = [
    { id: 1, name: "Anna Maria", registrationDate: "2023-04-10", roles: ["viewer"] },
    { id: 2, name: "John", registrationDate: "2023-05-20", roles: ["viewer"] },
    { id: 3, name: "Zoe", registrationDate: "2023-07-01", roles: ["viewer"] },
    { id: 4, name: "Luke", registrationDate: "2023-06-15", roles: ["editor"] },
    { id: 5, name: "Brian Smith", registrationDate: "2023-06-05", roles: ["viewer"] },
];
console.log(getQualifiedUserNames(users));
/**
 * Validates a registration form input object.
 * @param input The registration form input.
 * @returns An array of error messages.
 */
function validateRegistrationForm(input) {
    var errors = [];
    // Username validation
    var username = input.username, email = input.email, password = input.password, age = input.age;
    if (username.length < 5 || username.length > 15) {
        errors.push("Login \"".concat(username, "\" is of invalid length. Acceptable length is 5-15 characters."));
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push("Login \"".concat(username, "\" contains invalid characters. Use only letters and numbers."));
    }
    // Email validation (simple)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        errors.push("Email address \"".concat(email, "\" appears to be incomplete."));
    }
    // Password validation
    var hasUppercase = /[A-Z]/.test(password);
    var hasLowercase = /[a-z]/.test(password);
    var hasDigit = /[0-9]/.test(password);
    var isLongEnough = password.length >= 8;
    if (!(hasUppercase && hasLowercase && hasDigit && isLongEnough)) {
        errors.push("Error: Password is too weak. Required: min. 8 characters, uppercase/lowercase letter, digit.");
    }
    if (!(age % 1 === 0) || age < 18 || age > 99) {
        errors.push("Error: Age \"".concat(age, "\" is outside the allowed range (18-99)."));
    }
    return errors;
}
var userInput = {
    username: "Jo",
    email: "john.doeexample.com",
    password: "pass123",
    age: 102
};
var validationErrors = validateRegistrationForm(userInput);
console.log(validationErrors);
