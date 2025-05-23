"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUserData = WorkspaceUserData;
exports.WorkspaceUserPreferences = WorkspaceUserPreferences;
exports.getCombinedData = getCombinedData;
var miniStore_1 = require("./miniStore");
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
//Task 3: Implement a "Mini-Redux Store" for a counter
var store = new miniStore_1.MiniStore();
var unsubscribe = store.subscribe(function () {
    console.log('State changed:', store.getState());
});
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'SET', payload: 42 });
unsubscribe();
store.dispatch({ type: 'INCREMENT' });
//Task 4-String Function with Unusual Condition and Formatting
function processText(text, forbiddenWord) {
    var words = text.split(' ');
    var isForbidden = function (word, forbidden) {
        return word.toLowerCase() === forbidden.toLowerCase();
    };
    var toCamelCase = function (word) {
        if (word.length <= 3)
            return word;
        var firstChar = word.charAt(0);
        var rest = word.slice(1).toLowerCase();
        return firstChar === firstChar.toUpperCase()
            ? firstChar.toUpperCase() + rest
            : firstChar.toLowerCase() + rest;
    };
    var repeatAsterisk = function (count) {
        var result = '';
        for (var i = 0; i < count; i++) {
            result += '*';
        }
        return result;
    };
    var processed = words.map(function (word) {
        if (isForbidden(word, forbiddenWord)) {
            return repeatAsterisk(forbiddenWord.length);
        }
        else if (word.length > 3) {
            return toCamelCase(word);
        }
        return word;
    });
    return processed.join('_');
}
console.log(processText("Hello world apple", "world"));
// Output: "Hello_*****_apple"
console.log(processText("The Big Brown Dog", "brown"));
// Output: "The_Big_*****_Dog"
console.log(processText("jump over lazy dog", "lazy"));
// Output: "jump_over_****_dog"
console.log(processText("This IS a teSt", "is"));
function WorkspaceUserData(userId) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("User data for ".concat(userId));
        }, 1000);
    });
}
function WorkspaceUserPreferences(userId) {
    return new Promise(function (resolve, reject) {
        var shouldFail = Math.random() < 0.3;
        setTimeout(function () {
            if (shouldFail) {
                reject({
                    errorCode: 'PREF_FETCH_FAILED',
                    message: 'Could not fetch preferences'
                });
            }
            else {
                resolve("User preferences for ".concat(userId));
            }
        }, 500);
    });
}
function getCombinedData(userId) {
    var timeoutPromise = new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Timeout fetching combined data.'));
        }, 1200);
    });
    var userDataPromise = WorkspaceUserData(userId);
    var userPrefsPromise = WorkspaceUserPreferences(userId)
        .catch(function (error) {
        if (error.errorCode === 'PREF_FETCH_FAILED') {
            return "Preferences unavailable (Error: ".concat(error.errorCode, ")");
        }
        throw error;
    });
    return Promise.race([
        Promise.all([userDataPromise, userPrefsPromise])
            .then(function (_a) {
            var data = _a[0], prefs = _a[1];
            return "".concat(data, "; ").concat(prefs);
        }),
        timeoutPromise
    ]);
}
// Example usage
getCombinedData(123)
    .then(function (result) { return console.log(result); })
    .catch(function (error) { return console.error(error.message); });
