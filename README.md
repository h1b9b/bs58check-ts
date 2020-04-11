![CI](https://github.com/h1b9b/bs58check-ts/workflows/CI/badge.svg?branch=master)

# Bs58Check Typescript

A quick implementation of base58check extending upon bs58 in TS.

### Example
```js
import bs58safe from 'bs58safe')

console.log(bs58safe.decode('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr'))
// => <Buffer 80 ed db dc 11 68 f1 da ea db d3 e4 4c 1e 3f 8f 5a 28 4c 20 29 f7 8a d2 6a f9 85 83 a4 99 de 5b 19>

console.log(bs58check.encode(decoded))
// => 5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr
```
