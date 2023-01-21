import getInput from './input';
import { logError, logInfo, logOutput } from 'shared/logger';

async function main () {
  let blocks: Array<Record<string, number>> = [{}];
  let currentBlockIndex = 0;
  let totalNumTransactions = 0;
  let currentBlockNumTransactions = 0;

  logInfo('Program start');

  while (true) {
    try {
      const command = getInput(currentBlockIndex + 1);
      const currentBlock = blocks[currentBlockIndex];

      switch (command.type) {
        case 'SET':
          currentBlock[command.name] = command.value;
          currentBlockNumTransactions++;
          totalNumTransactions++;
          break;
        case 'GET':
          if (command.name in currentBlock)
            logOutput(currentBlock[command.name]);
          else logOutput('NULL');

          break;
        case 'UNSET':
          delete currentBlock[command.name];
          currentBlockNumTransactions++;
          totalNumTransactions++;
          break;
        case 'NUMWITHVALUE':
          const count = Object.keys(currentBlock).reduce(
            (count, key) => {
              const value = currentBlock[key];
              if (value === command.value) return count + 1;
              return count;
            },
            0
          );

          logOutput(count);

          break;
        case 'BEGIN':
          blocks.push({ ...currentBlock });
          currentBlockIndex = currentBlockIndex + 1;
          currentBlockNumTransactions = 0;
          break;
        case 'COMMIT':
          let store = {};

          if (totalNumTransactions) {
            store = blocks.reduce((result, block) => {
              return {
                ...result,
                ...block
              };
            }, {});
          } else {
            logInfo('NO TRANSACTION');
          }

          blocks = [store];
          currentBlockIndex = 0;
          totalNumTransactions = 0;
          currentBlockNumTransactions = 0;

          break;
        case 'ROLLBACK':
          if (!currentBlockNumTransactions)
            logInfo('NO TRANSACTION');

          blocks.splice(currentBlockIndex, 1);
          currentBlockIndex = Math.max(currentBlockIndex - 1, 0);
          currentBlockNumTransactions = 0;
          break;
      }
    } catch (_error) {
      const error = _error as { message: string };
      logError(error.message);
    }
  }
}

main();
