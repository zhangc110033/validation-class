import validate from './validate'

export default (cfg) => {
    let config = cfg
    return (target) => {
        // Object.defineProperty(target.prototype, mappingField, {
        //     get: function () {
        //         return { valid: formValidate(this)}
        //     },
        //     enumerable: false,
        //     configurable: true,
        // })
        validate.registerClass(target.prototype,config)
        return target
    }
}