import validate from './validate'

export default (cfg) => {
    let config = cfg
    return (target, name, descriptor) => {
        validate.registerField(target, name, config)
        return descriptor
    }
}
