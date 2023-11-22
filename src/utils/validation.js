import validator from 'is_js'

const checkEmpty = (value, key) => {
    if (validator.empty(value.trim())) {
        return `${key} is required`
    }
    return null
}

const checkMinLength = (value, key, minLength) => {
    if (value.trim().length < minLength) {
        return `${key} must be at least ${minLength} characters`
    }
    return null
}

export default function (data) {
    const { email,
        password,
        username,
        fullname
    } = data
    if (username !== undefined) {
        let emptyValidation = checkEmpty(username, 'Username')
        if (emptyValidation) {
            return emptyValidation
        }
        let minLengthValidation = checkMinLength(username, 'Username', 3)
        if (minLengthValidation) {
            return minLengthValidation
        }
    }

    if (fullname !== undefined) {
        let emptyValidation = checkEmpty(fullname, 'Fullname')
        if (emptyValidation) {
            return emptyValidation
        }
        let minLengthValidation = checkMinLength(fullname, 'Fullname', 3)
        if (minLengthValidation) {
            return minLengthValidation
        }
    }

    if (email !== undefined) {
        let emptyValidation = checkEmpty(email, 'Email')
        if (emptyValidation) {
            return emptyValidation
        }
        if (!validator.email(email)) {
            return 'Invalid Email'
        }
    }
    if (password !== undefined) {
        let emptyValidation = checkEmpty(password, 'Password')
        if (emptyValidation) {
            return emptyValidation
        }
       
        let minLengthValidation = checkMinLength(password, 'Password', 6)
        if (minLengthValidation) {
            return minLengthValidation
        }
    }



}