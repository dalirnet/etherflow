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
                { value: 'getTxsStatus', name: 'Get txs status' },
            ],
        },
        {
            type: 'input',
            name: 'txs',
            message: 'Txs hash ?',
            when({ action }) {
                return action === 'getTxsStatus'
            },
        },
    ])
    .then(({ method, action, txs }) => {
        const loading = loadingCli({
            frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        }).start()

        return etherflow[method][action](txs).then((result) => {
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
