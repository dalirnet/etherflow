import web3 from 'web3-eth'
import web3Utils from 'web3-utils'
import MethodInterface from './MethodInterface'

class SdkMethod extends MethodInterface {
    constructor() {
        super()
        this.providers = {
            mew: 'https://nodes.mewapi.io/rpc/eth/',
            ava: 'https://mainnet.eth.cloud.ava.do/',
            mycrypto: 'https://api.mycryptoapi.com/eth/',
        }
    }

    getBlockNumber() {
        return Promise.allSettled(
            Object.values(this.providers).map((provider) => {
                return new web3(provider).getBlockNumber()
            })
        )
            .then((values) => {
                return Math.max(...values.map(({ value = 0 }) => value))
            })
            .catch(() => {
                return 0
            })
    }

    getTxnStatus(txnHash) {
        return Promise.allSettled(
            Object.values(this.providers).map((provider) => {
                return new web3(provider).getTransaction(txnHash).then(({ from = null, to = null, value = 0, blockHash = null } = {}) => {
                    return {
                        status: !!blockHash,
                        value: Number(web3Utils.fromWei(value)),
                        from: from.toLowerCase(),
                        to: to.toLowerCase(),
                    }
                })
            })
        )
            .then((values) => {
                const successfulTxn = values.find(({ value = {} }) => value?.status)
                if (successfulTxn) {
                    return successfulTxn.value
                }

                return Promise.reject()
            })
            .catch(() => {
                return MethodInterface.defaultTxnStatus
            })
    }
}

export default SdkMethod
