const validation = {
    required: value => value ? undefined : 'Required',
    maxLength: max => value =>
        value && value.length > max ? `Must be ${max} characters or less` : undefined,
    number: value => value && isNaN(Number(value)) ? 'Must be a number' : undefined,
    minValue: min => value =>
        value && value < min ? `Must be at least ${min}` : undefined,
    email: value =>
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
            'Invalid email address' : undefined,
    phone: value =>
        value && !/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/i.test(value) ?
            'Invalid phone number' : undefined,
    password: values => {
        const errors = {};
  
        if (values.password != values.confirmPassword) {
            errors.confirmPassword = 'Password does not match';
        }      
        return errors;
    }
};
  
export const normalizePhone = (value) => {
    if (!value) {
        return value;
    }
  
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6,10)}`;
};

export default validation;
  