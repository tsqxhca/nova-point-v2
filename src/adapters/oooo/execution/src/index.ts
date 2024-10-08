import { UserTxData } from './sdk/types';
import { getUserTXAtBlock } from './sdk/lib';


export const getUserTransactionData = async (startBlock: number, endBlock: number): Promise<UserTxData[]> => {
  console.log(`Get User Tx Data From ${startBlock} to ${endBlock}`);
  return await getUserTXAtBlock(startBlock, endBlock);
};


getUserTransactionData(0, 5759346);

