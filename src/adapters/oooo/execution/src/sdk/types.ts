export type UserTxData = {
    timestamp: number
    userAddress: string
    contractAddress: string
    tokenAddress: string
    decimals: number
    price: number
    quantity: bigint
    txHash: string
    nonce: string
    blockNumber: number
    symbol: string
}