import { MiniStore } from './miniStore'

type User = {
    id: number;
    name: string;
    registrationDate: string;
    roles: string[];
  };
  
  //Task 1: Transforming and Filtering Data with an Unusual Condition
  //Start Task 1

  function getQualifiedUserNames(users: User[]): string[] {
    return users
      .filter(user => {
        const month = new Date(user.registrationDate).getMonth() + 1;
        const isQ2 = month >= 4 && month <= 6;
        const hasSingleViewerRole = user.roles.length === 1 && user.roles[0] === 'viewer';
        return isQ2 && hasSingleViewerRole;
      })
      .map(user => user.name.split(' ')[0])
      .sort((a, b) => b.localeCompare(a));
  }
  //Sample Users
  const users: User[] = [
    { id: 1, name: "Anna Maria", registrationDate: "2023-04-10", roles: ["viewer"] },
    { id: 2, name: "John", registrationDate: "2023-05-20", roles: ["viewer"] },
    { id: 3, name: "Zoe", registrationDate: "2023-07-01", roles: ["viewer"] },
    { id: 4, name: "Luke", registrationDate: "2023-06-15", roles: ["editor"] },
    { id: 5, name: "Brian Smith", registrationDate: "2023-06-05", roles: ["viewer"] },
  ];
  
  console.log(getQualifiedUserNames(users));
  //End Task 1

  //Task 2: Simple form validation with unusual error messages
  // Start Task 2

  // Define the input type
type RegistrationInput = {
    username: string;
    email: string;
    password: string;
    age: number;
  };
  
  /**
   * Validates a registration form input object.
   * @param input The registration form input.
   * @returns An array of error messages.
   */
  function validateRegistrationForm(input: RegistrationInput): string[] {
    const errors: string[] = [];
  
    // Username validation
    const { username, email, password, age } = input;
  
    if (username.length < 5 || username.length > 15) {
      errors.push(`Login "${username}" is of invalid length. Acceptable length is 5-15 characters.`);
    }
  
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.push(`Login "${username}" contains invalid characters. Use only letters and numbers.`);
    }
  
    // Email validation (simple)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errors.push(`Email address "${email}" appears to be incomplete.`);
    }
  
    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
  
    if (!(hasUppercase && hasLowercase && hasDigit && isLongEnough)) {
      errors.push(
        `Error: Password is too weak. Required: min. 8 characters, uppercase/lowercase letter, digit.`
      );
    }
  
    if (!(age % 1 === 0) || age < 18 || age > 99) {
        errors.push(`Error: Age "${age}" is outside the allowed range (18-99).`);
      }
  
    return errors;
  }

  const userInput: RegistrationInput = {
    username: "Jo",
    email: "john.doeexample.com",
    password: "pass123",
    age: 102
  };
  
  const validationErrors = validateRegistrationForm(userInput);
  console.log(validationErrors);

  // End Task 2

  //Task 3: Implement a "Mini-Redux Store" for a counter
  //Start Task 3

  const store = new MiniStore();

  const unsubscribe = store.subscribe(() => {
    console.log('State changed:', store.getState());
  });
  
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'DECREMENT' }); 
  store.dispatch({ type: 'SET', payload: 42 });
  
  unsubscribe(); 
  store.dispatch({ type: 'INCREMENT' }); 

  //End Task 3
  