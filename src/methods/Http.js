import axios from 'axios'
import web3Utils from 'web3-utils'
import MethodInterface from './MethodInterface'

class HttpMethod extends MethodInterface {
    constructor() {
        super()
        this.provider = 'https://api.blockcypher.com/v1/eth/main/'
    }

    getBlockNumber() {
        return axios
            .get(this.provider)
            .then(({ data }) => {
                return data
            })
            .then(({ height = 0 }) => {
                return height
            })
            .catch(() => {
                return 0
            })
    }

    getTxsStatus(txsHash) {
        return axios
            .get(`${this.provider}txs/${txsHash}`)
            .then(({ data }) => {
                return data
            })
            .then(({ addresses: [from = null, to = null] = [], total = 0, block_hash = null } = {}) => {
                return {
                    status: !!block_hash,
                    value: Number(web3Utils.fromWei(total.toString())),
                    from: `0x${from}`.toLowerCase(),
                    to: `0x${to}`.toLowerCase(),
                }
            })
            .catch(() => {
                return MethodInterface.defaultTxsStatus
            })
    }
}

export default HttpMethod
