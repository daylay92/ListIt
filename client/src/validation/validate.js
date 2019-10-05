class Validator {
  static required({ value }) {
    let isValid = false;
    if (value) isValid = value.trim().length !== 0;
    return isValid;
  }
  static isAlphabetOnly({ value }) {
    if (!value) return true;
    const regex = /^\w+$/i;
    return regex.test(value);
  }
  static maxLength({ maxLength, value }) {
    if (!value) return true;
    return value.length === maxLength || value.length < maxLength;
  }
  static minLength({ minLength, value }) {
    if (!value) return true;
    return value.length === minLength || value.length > minLength;
  }
  static isMatch({ value, comparedValue }) {
    if (!value) return true;
    return value.trim() === comparedValue.trim();
  }
  static isEmail({ value }) {
    if (!value) return true;
    const regex = /^\S+@\S+[^.]\.[^.]\S+$/i;
    return regex.test(value);
  }
  static validateField(formSchema, key, value) {
    const schema = { ...formSchema };
    const {
      validation: { rules }
    } = schema[key];
    const ruleList = Object.keys(rules);
    const validationParams = { ...rules, value };
    if (ruleList.includes('isMatch')) {
      const matchKey = rules['isMatch'];
      const {
        inputConfig: { value: matchValue }
      } = schema[matchKey];
      validationParams.comparedValue = matchValue;
    }

    let valid = true;
    valid = ruleList.some(fn => {
      return !Validator[fn](validationParams);
    });
    return !valid;
  }
}

export default Validator;
