import axios from 'axios'
import web3Utils from 'web3-utils'
import MethodInterface from './MethodInterface'

class CrawlerMethod extends MethodInterface {
    constructor() {
        super()
        this.provider = 'https://etherscan.io/'
    }

    getBlockNumber() {
        return axios
            .get(`${this.provider}blocks`)
            .then(({ data }) => {
                return data
            })
            .then((context) => {
                return context.match(/\(Total\s+of\s+([0-9,]+)\s+blocks\)/i)
            })
            .then(([match, value = '0'] = []) => {
                return Number(value.replace(/,/g, ''))
            })
            .catch(() => {
                return 0
            })
    }

    getTxnStatus(txnHash) {
        return axios
            .get(`${this.provider}tx/${txnHash}`)
            .then(({ data }) => {
                return data
            })
            .then((context) => {
                return context.match(/\<div\s+id="ContentPlaceHolder1_maintable".*?>.*<div\s+id="ContentPlaceHolder1_divTxFee".*?>/is)
            })
            .then(([match] = []) => {
                if (match) {
                    return match
                        .replace(/<(.|\n)*?>/g, '')
                        .replace(/:\s+/g, '::')
                        .matchAll(/^(.*?):+(.*)$/gm)
                }

                return Promise.reject()
            })
            .then((matchs) => {
                return [...matchs].reduce((keep, [match, key, value] = []) => {
                    keep[key.replace(/[^a-z]/gi, '').toLowerCase()] = value.toLowerCase()

                    return keep
                }, {})
            })
            .then(({ status = null, from = null, interactedwithto = null, value = null } = {}) => {
                return {
                    status: status === 'success',
                    value: value ? Number(value.match(/^[0-9.]+/)[0]) : 0,
                    from: from
                        ? from
                              .trim()
                              .replace(/.*(?=0x)/, '')
                              .toLowerCase()
                        : null,
                    to: interactedwithto
                        ? interactedwithto
                              .replace(/contract/i, '')
                              .trim()
                              .replace(/.*(?=0x)/, '')
                              .toLowerCase()
                        : null,
                }
            })
            .catch(() => {
                return MethodInterface.defaultTxnStatus
            })
    }
}

export default CrawlerMethod
