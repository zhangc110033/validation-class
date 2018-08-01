let fieldValidate = (value, target, config, validClose) => {
    let { require = false, help = "", validator } = config
    let valid = true, result = { valid: true, help: "" }
    if (target) {
        if (validator) {
            validator(value, target, result)
        } else {
            if (require == true && !validClose && (value == "" || !value || isArrayEmpty(value))) {
                valid = false
            }
            result.valid = valid
            result.help = valid == true ? "" : help
        }
    }
    return result
}

let formValidate = (target) => {
    let valid
    valid = Object.keys(target._validationMap).every(v => {
        return target[target._validationMap[v]].valid == true
    })
    return valid
}

let isArrayEmpty = (value) => {
    let array = value.toJS ? value.toJS() : value
    return Object.prototype.toString.call(array) == '[object Array]' && array.length == 0
}

export default fieldValidate
export { fieldValidate, formValidate, isArrayEmpty }