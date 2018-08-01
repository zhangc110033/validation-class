import fieldValidate from './validate'

export default (cfg) => {
    let config = cfg
    return (target, name, descriptor) => {
        let { mappingField = `${name}Valid` } = config
        Object.defineProperty(target, mappingField, {
            get: function () {
                return fieldValidate(this[name], this, config)
            },
            enumerable: false,
            configurable: true,
        })
        return descriptor
    }
}
