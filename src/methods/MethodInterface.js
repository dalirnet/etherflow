class MethodInterface {
    constructor() {
        this.checkRequirements({
            function: ['getBlockNumber', 'getTxsStatus'],
        })
    }

    checkRequirements(requirements = {}, target = this) {
        Object.entries(requirements).forEach(([type, props]) => {
            props.forEach((prop) => {
                if (typeof target[prop] !== type) {
                    throw MethodInterface.error(`The typeof "${prop}" must be ${type}`)
                }
            })
        })
    }

    static defaultTxsStatus = {
        status: false,
        value: 0,
        from: null,
        to: null,
        blockHash: null,
    }

    static error(message, scope = 'Implement') {
        return new Error(`[${scope}] ${message}.`)
    }
}

export default MethodInterface
