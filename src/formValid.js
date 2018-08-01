import { formValidate } from './validate'

export default (cfg) => {
    let config = cfg
    return (target, name, descriptor) => {
        let { mappingField = `formValid` } = config

        Object.defineProperty(target.prototype, mappingField, {
            get: function () {
                return { valid: formValidate(this)}
            },
            enumerable: false,
            configurable: true,
        })

        return target
    }
}