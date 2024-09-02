import { UserTxData } from "./types";
import { JsonRpcProvider } from "ethers";

// export async function getUserTXAtBlockb(startBlock: number, endBlock: number) {
//   const startTime = getTimestampAtBlock(startBlock);
//   const endTime = getTimestampAtBlock(endBlock);
//   const response = await fetch('https://api.bridge.oooo.money/api/zklink/getUserTransactions', {
//     method: 'POST',
//     body: JSON.stringify({ startBlock: startBlock, endBlock: endBlock, startTime: startTime, endTime: endTime, page:page, pageSize:2000 }),
//     headers: { 'Content-Type': 'application/json' },
//   });
//
//   const data = await response.json();
//   const userTxData: UserTxData[] = data.data.map((item: any) => {
//     return {
//       timestamp: item.timestamp,
//       userAddress: item.userAddress,
//       contractAddress: item.contractAddress,
//       tokenAddress: item.tokenAddress,
//       decimals: item.decimals,
//       price: item.price,
//       quantity: BigInt(item.quantity),
//       txHash: item.txHash,
//       nonce: item.nonce,
//       symbol: item.symbol,
//       blockNumber: item.blockNumber,
//     };
//   });
//
//   return userTxData;
// }


export async function getUserTXAtBlock(startBlock: number, endBlock: number): Promise<UserTxData[]> {
  const startTime = await getTimestampAtBlock(startBlock);
  const endTime = await getTimestampAtBlock(endBlock);
  const pageSize = 100;
  let page = 1;
  let hasMoreData = true;
  const allUserTxData: UserTxData[] = [];
  // console.log("startTime:" + startTime);
  // console.log("endTime:" + endTime);
  while (hasMoreData) {
    // Fetch the data for the current page
    // TODO const response = await fetch('https://api.bridge.oooo.money/api/zklink/getUserTransactions', {
    const response = await fetch('http://127.0.0.1:10001/api/zklink/getUserTransactions', {
      method: 'POST',
      body: JSON.stringify({ startBlock, endBlock, startTime, endTime, page, pageSize }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data for page ${page}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.list != null && !(Array.isArray(data.list) && data.list.length === 0)) {
      const userTxData: UserTxData[] = data.list.map((item: any) => {
        return {
          timestamp: item.timestamp,
          userAddress: item.userAddress,
          contractAddress: item.contractAddress,
          tokenAddress: item.tokenAddress,
          decimals: item.decimals,
          price: item.price,
          quantity: BigInt(item.quantity),
          txHash: item.txHash,
          nonce: item.nonce,
          symbol: item.symbol,
          blockNumber: item.blockNumber,
        };
      });

      allUserTxData.push(...userTxData);
    }

    if (data.totalCount <= data.page * data.size) {
      hasMoreData = false;
    } else {
      page++;
    }
  }

  // console.log(allUserTxData);
  return allUserTxData;
}


export const getTimestampAtBlock = async (blockNumber: number) => {
  const provider = new JsonRpcProvider("https://rpc.zklink.io");
  const block = await provider.getBlock(blockNumber);
  return Number(block?.timestamp);
};


