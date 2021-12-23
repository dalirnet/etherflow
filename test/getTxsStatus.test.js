const etherflow = require('../dist/index.js')

const txn = {
    valid: {
        hash: '0xc7b6bbc8c1c5c91b79eeb423c71001560b4e4296078de7d8d401e85afa40b5dc',
        value: 0.036,
        from: '0x1828fd9ef215706d022508e1ae3c791edc36e678',
        to: '0x284f12c5524c6afcf6844645398b8fa856f9ad92',
    },
    invalid: '0x0000',
}

test('Get valid txn status by Crawler', async () => {
    const { status, value, from, to } = await etherflow.crawler.getTxnStatus(txn.valid.hash)
    expect(status).toBeTruthy()
    expect(value).toBe(txn.valid.value)
    expect(from).toBe(txn.valid.from)
    expect(to).toBe(txn.valid.to)
})

test('Get invalid txn status by Crawler', async () => {
    const { status, value, from, to } = await etherflow.crawler.getTxnStatus(txn.invalid)
    expect(status).toBeFalsy()
    expect(value).toBe(0)
    expect(from).toBeNull()
    expect(to).toBeNull()
})

test('Get valid txn status by Http', async () => {
    const { status, value, from, to } = await etherflow.http.getTxnStatus(txn.valid.hash)
    expect(status).toBeTruthy()
    expect(value).toBe(txn.valid.value)
    expect(from).toBe(txn.valid.from)
    expect(to).toBe(txn.valid.to)
})

test('Get invalid txn status by Http', async () => {
    const { status, value, from, to } = await etherflow.http.getTxnStatus(txn.invalid)
    expect(status).toBeFalsy()
    expect(value).toBe(0)
    expect(from).toBeNull()
    expect(to).toBeNull()
})

test('Get valid txn status by Sdk', async () => {
    const { status, value, from, to } = await etherflow.sdk.getTxnStatus(txn.valid.hash)
    expect(status).toBeTruthy()
    expect(value).toBe(txn.valid.value)
    expect(from).toBe(txn.valid.from)
    expect(to).toBe(txn.valid.to)
})

test('Get invalid txn status by Sdk', async () => {
    const { status, value, from, to } = await etherflow.sdk.getTxnStatus(txn.invalid)
    expect(status).toBeFalsy()
    expect(value).toBe(0)
    expect(from).toBeNull()
    expect(to).toBeNull()
})
