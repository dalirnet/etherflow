const etherflow = require('../dist/index.js')

test('Get block number by crawler', async () => {
    const blockNumber = await etherflow.crawler.getBlockNumber()
    expect(blockNumber).toBeGreaterThanOrEqual(0)
})

test('Get block number by http', async () => {
    const blockNumber = await etherflow.http.getBlockNumber()
    expect(blockNumber).toBeGreaterThanOrEqual(0)
})

test('Get block number by sdk', async () => {
    const blockNumber = await etherflow.sdk.getBlockNumber()
    expect(blockNumber).toBeGreaterThanOrEqual(0)
})
