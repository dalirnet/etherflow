#!/usr/bin/env node

const inquirer = require('inquirer')
const loadingCli = require('loading-cli')
const etherflow = require('./dist/index.js')

process.removeAllListeners('warning')
inquirer
    .prompt([
        {
            type: 'list',
            name: 'method',
            message: 'Catch method ?',
            choices: [
                { value: 'crawler', name: 'Crawler' },
                { value: 'http', name: 'Http' },
                { value: 'sdk', name: 'Sdk' },
            ],
        },
        {
            type: 'list',
            name: 'action',
            message: 'Method action ?',
            choices: [
                { value: 'getBlockNumber', name: 'Get block number' },
                { value: 'getTxnStatus', name: 'Get txn status' },
            ],
        },
        {
            type: 'input',
            name: 'txn',
            message: 'Txn hash ?',
            when({ action }) {
                return action === 'getTxnStatus'
            },
        },
    ])
    .then(({ method, action, txn }) => {
        const loading = loadingCli({
            frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        }).start()

        return etherflow[method][action](txn).then((result) => {
            return {
                loading,
                result,
            }
        })
    })
    .then(({ loading, result }) => {
        loading.stop()
        console.dir(result)
        process.exit(0)
    })
