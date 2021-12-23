# etherflow

## Flow of Ethereum blockchain

-   getBlockNumber

-   getBlockNumber

![carbon](https://raw.githubusercontent.com/dalirnet/etherflow/master/carbon.png)

### Install

```bash
npm install etherflow

# or

yarn add etherflow
```

### Import

```javascript
import etherflow from 'etherflow'

// or

const etherflow = require('etherflow')
```

### Usage

#### ✔️ **getBlockNumber** Get block number

-   Crawler method

```javascript
etherflow.crawler.getBlockNumber().then((blockNumber) => {
    console.log(blockNumber) /* 13854282 */
})

// or

const blockNumber = await etherflow.crawler.getBlockNumber()
console.log(blockNumber) /* 13854282 */
```

-   Http method

```javascript
etherflow.http.getBlockNumber().then((blockNumber) => {
    console.log(blockNumber) /* 13854282 */
})

// or

const blockNumber = await etherflow.http.getBlockNumber()
console.log(blockNumber) /* 13854282 */
```

-   Sdk method

```javascript
etherflow.sdk.getBlockNumber().then((blockNumber) => {
    console.log(blockNumber) /* 13854282 */
})

// or

const blockNumber = await etherflow.sdk.getBlockNumber()
console.log(blockNumber) /* 13854282 */
```

#### ✔️ **getTxnStatus** Get txn status

-   Crawler method

```javascript
const TxnHash = '0xc7b6bbc8c1c5c91b79eeb423c71001560b4e4296078de7d8d401e85afa40b5dc'
etherflow.crawler.getTxnStatus(TxnHash).then(({ status, value, from, to }) => {
    console.log(status)
    /* true */

    console.log(value)
    /* 0.036 */

    console.log(from)
    /* 0x1828fd9ef215706d022508e1ae3c791edc36e678 */

    console.log(to)
    /* 0x284f12c5524c6afcf6844645398b8fa856f9ad92 */
})

// or

const result = await etherflow.crawler.getTxnStatus('0x0000')
console.log(result)
/*
    {
        status: true,
        value: 0.036,
        from: '0x1828fd9ef215706d022508e1ae3c791edc36e678',
        to: '0x284f12c5524c6afcf6844645398b8fa856f9ad92'
    }
*/
```

-   Http method

```javascript
const TxnHash = '0xc7b6bbc8c1c5c91b79eeb423c71001560b4e4296078de7d8d401e85afa40b5dc'
etherflow.http.getTxnStatus(TxnHash).then(({ status, value, from, to }) => {
    console.log(status)
    /* true */

    console.log(value)
    /* 0.036 */

    console.log(from)
    /* 0x1828fd9ef215706d022508e1ae3c791edc36e678 */

    console.log(to)
    /* 0x284f12c5524c6afcf6844645398b8fa856f9ad92 */
})

// or

const result = await etherflow.http.getTxnStatus('0x0000')
console.log(result)
/*
    {
        status: true,
        value: 0.036,
        from: '0x1828fd9ef215706d022508e1ae3c791edc36e678',
        to: '0x284f12c5524c6afcf6844645398b8fa856f9ad92'
    }
*/
```

-   Sdk method

```javascript
const TxnHash = '0xc7b6bbc8c1c5c91b79eeb423c71001560b4e4296078de7d8d401e85afa40b5dc'
etherflow.sdk.getTxnStatus(TxnHash).then(({ status, value, from, to }) => {
    console.log(status)
    /* true */

    console.log(value)
    /* 0.036 */

    console.log(from)
    /* 0x1828fd9ef215706d022508e1ae3c791edc36e678 */

    console.log(to)
    /* 0x284f12c5524c6afcf6844645398b8fa856f9ad92 */
})

// or

const result = await etherflow.sdk.getTxnStatus('0x0000')
console.log(result)
/*
    {
        status: true,
        value: 0.036,
        from: '0x1828fd9ef215706d022508e1ae3c791edc36e678',
        to: '0x284f12c5524c6afcf6844645398b8fa856f9ad92'
    }
*/
```

### Cli

```bash
npx etherflow

# or

npx github:dalirnet/etherflow
```

#### Test

```bash
npm run test
```

-   getBlockNumber

```bash
 PASS  test/getBlockNumber.test.js (9.213 s)
  √ Get block number by crawler (3574 ms)
  √ Get block number by http (2244 ms)
  √ Get block number by sdk (1988 ms)
```

-   getTxnStatus

```bash
 PASS  test/getTxnStatus.test.js (12.643 s)
  √ Get valid txn status by Crawler (3699 ms)
  √ Get invalid txn status by Crawler (1751 ms)
  √ Get valid txn status by Http (1472 ms)
  √ Get invalid txn status by Http (1307 ms)
  √ Get valid txn status by Sdk (1293 ms)
  √ Get invalid txn status by Sdk (1716 ms)
```
