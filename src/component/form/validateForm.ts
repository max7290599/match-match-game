const regPart1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))/;
const regPart2 = /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regex = new RegExp(`${regPart1.source}${regPart2.source}`);

const regexNumber = new RegExp(/^[\da-zA-ZА-Яа-я_-]*[a-zA-ZА-Яа-я_-][\da-zA-ZА-Яа-я_-]*$/);

export const setErrorFor = (input: HTMLElement, message: string): void => {
  const formControl = input.parentElement;
  if (formControl === null) return;
  const small = formControl.querySelector('small');
  if (small === null) return;
  formControl.className = 'label error';
  small.innerText = message;
}

export const setSuccessFor = (input: HTMLElement): void => {
  const formControl = input.parentElement;
  if (formControl === null) return;
  formControl.className = 'label success';
}

const isEmail = (email: string): boolean => regex.test(email);

const isNumberLine = (line: string): boolean => regexNumber.test(line);

export const blankLine = (line: string, input: HTMLElement): void => {
  if (!line) {
    setErrorFor(input, 'Username cannot be blank');
  } else if (line.length > 30) {
    setErrorFor(input, 'Maximum number of letters 30');
  } else if (!isNumberLine(line)) {
    setErrorFor(input, 'name should not consist of only numbers');
  } else {
    setSuccessFor(input);
  }
}

export const blankLineMail = (mail: string, input: HTMLElement): void => {
  if (!mail) {
    setErrorFor(input, 'Username cannot be blank');
  } else if (!isEmail(mail)) {
    setErrorFor(input, 'Not a valid email');
  } else {
    setSuccessFor(input);
  }
}
