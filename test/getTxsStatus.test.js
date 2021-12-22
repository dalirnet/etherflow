const etherflow = require('../dist/index.js')

const txs = {
    valid: {
        hash: '0xc7b6bbc8c1c5c91b79eeb423c71001560b4e4296078de7d8d401e85afa40b5dc',
        value: 0.036,
        from: '0x1828fd9ef215706d022508e1ae3c791edc36e678',
        to: '0x284f12c5524c6afcf6844645398b8fa856f9ad92',
    },
    invalid: '0x0000',
}

test('Get valid txs status by Crawler', async () => {
    const { status, value, from, to } = await etherflow.crawler.getTxsStatus(txs.valid.hash)
    expect(status).toBeTruthy()
    expect(value).toBe(txs.valid.value)
    expect(from).toBe(txs.valid.from)
    expect(to).toBe(txs.valid.to)
})

test('Get invalid txs status by Crawler', async () => {
    const { status, value, from, to } = await etherflow.crawler.getTxsStatus(txs.invalid)
    expect(status).toBeFalsy()
    expect(value).toBe(0)
    expect(from).toBeNull()
    expect(to).toBeNull()
})

test('Get valid txs status by Http', async () => {
    const { status, value, from, to } = await etherflow.http.getTxsStatus(txs.valid.hash)
    expect(status).toBeTruthy()
    expect(value).toBe(txs.valid.value)
    expect(from).toBe(txs.valid.from)
    expect(to).toBe(txs.valid.to)
})

test('Get invalid txs status by Http', async () => {
    const { status, value, from, to } = await etherflow.http.getTxsStatus(txs.invalid)
    expect(status).toBeFalsy()
    expect(value).toBe(0)
    expect(from).toBeNull()
    expect(to).toBeNull()
})

test('Get valid txs status by Sdk', async () => {
    const { status, value, from, to } = await etherflow.sdk.getTxsStatus(txs.valid.hash)
    expect(status).toBeTruthy()
    expect(value).toBe(txs.valid.value)
    expect(from).toBe(txs.valid.from)
    expect(to).toBe(txs.valid.to)
})

test('Get invalid txs status by Sdk', async () => {
    const { status, value, from, to } = await etherflow.sdk.getTxsStatus(txs.invalid)
    expect(status).toBeFalsy()
    expect(value).toBe(0)
    expect(from).toBeNull()
    expect(to).toBeNull()
})
