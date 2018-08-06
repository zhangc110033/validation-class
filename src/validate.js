class Validate {

    registerField(target, name, config) {
        let me = this
        if (!target._fieldData && !target.getValidation) {
            target._fieldData = []
            //用function包裹为了取到this（当前实例）
            target.getValidation = function () {
                return me.getValidation(this)
            }
        }
        target._fieldData.push({
            name: name,
            config: config
        })
    }

    registerClass(target, config) {
        // Object.defineProperty(target, "_classConfig", {
        //     enumerable: false,
        //     value: config
        // })
        target._classConfig = config
    }

    getValidation(instance) {
        let result = {}, classValid = true, validOpen = true
        if (instance._classConfig) {
            validOpen = instance._classConfig.switcher(instance)
        }
        instance._fieldData.map(field => {
            result[field.name] = this.fieldValidate(instance[field.name], instance, field.config, validOpen)
            if (result[field.name].valid == false) {
                classValid = false
            }
        })
        result.classValid = classValid
        return result
    }

    fieldValidate(value, instance, config, validOpen) {
        let { require = false, help = "", regex, validator } = config
        let valid = true, result = { valid: true, help: "" }
        if (validOpen) {
            if (validator) {
                validator(value, instance, result)
            } else {
                if (require == true && (value == "" || !value || this.isArrayEmpty(value))) {
                    valid = false
                } else if (regex) {
                    valid = regex.test(value)
                }
                result.valid = valid
                result.help = valid == true ? "" : help
            }
        }
        return result
    }

    isArrayEmpty(value) {
        let array = value.toJS ? value.toJS() : value
        return Object.prototype.toString.call(array) == '[object Array]' && array.length == 0
    }
}

export default new Validate()