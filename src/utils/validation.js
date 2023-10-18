import validator from 'is_js'

const checkEmpty = (value,key) => {
    if(validator.empty(value.trim())){
        return `${key} is required`
    }
    return null
}

const checkMinLength = (value,key,minLength) => {
    if(value.trim().length < minLength){
        return `${key} must be at least ${minLength} characters`
    }
    return null
}

export default function (data) {
    const { email, password } = data

    if(email!== undefined){
        let emptyValidation = checkEmpty(email,'Email')
        if(emptyValidation){
            return emptyValidation
        }
        if (!validator.email(email)) {
            return 'Invalid Email'
        }
    }
    if(password!== undefined){
        let emptyValidation = checkEmpty(password,'Password')
        if(emptyValidation){
            return emptyValidation
        }
        if (!validator.email(email)) {
            return 'Invalid Email'
        }
        let minLengthValidation = checkMinLength(password,'Password',6)
        if(minLengthValidation){
            return minLengthValidation
        }
    }


}