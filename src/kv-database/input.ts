import PromptSync from 'prompt-sync';
import { logInfo } from 'shared/logger';

const prompt = PromptSync({ sigint: true });

function setCommand (args: string[]): SetCommand {
  if (args.length !== 2) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'SET command accepts exactly 2 arguments.',
        'Example: `SET A 10` to set A to the value of 10.',
        ''
      ].join('\n')
    );
  }

  const value = Number(args[1]);

  if (isNaN(value)) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'SET command accepts only numbers as value',
        'Example: `SET A 10` to set A to the value of 10.',
        ''
      ].join('\n')
    );
  }

  return {
    type: 'SET',
    name: args[0],
    value
  };
}

function getCommand (args: string[]): GetCommand {
  if (args.length !== 1) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'GET command accepts exactly 1 argument.',
        'Example: `GET A` to get the value of A.',
        ''
      ].join('\n')
    );
  }

  return {
    type: 'GET',
    name: args[0]
  };
}

function unsetCommand (args: string[]): UnsetCommand {
  if (args.length !== 1) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'UNSET command accepts exactly 1 arguments.',
        'Example: `UNSET A` to unset A.',
        ''
      ].join('\n')
    );
  }

  return {
    type: 'UNSET',
    name: args[0]
  };
}

function numWithValueCommand (args: string[]): NumWithValueCommand {
  if (args.length !== 1) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'NUMWITHVALUE command accepts exactly 1 arguments.',
        'Example: `NUMWITHVALUE 10` to get the count of entries equals 10.',
        ''
      ].join('\n')
    );
  }

  return {
    type: 'NUMWITHVALUE',
    value: Number(args[0])
  };
}

function beginCommand (args: string[]): BeginCommand {
  if (args.length) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'BEGIN command does not accept any arguments.',
        ''
      ].join('\n')
    );
  }

  return { type: 'BEGIN' };
}

function commitCommand (args: string[]): CommitCommand {
  if (args.length) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'COMMIT command does not accept any arguments.',
        ''
      ].join('\n')
    );
  }

  return { type: 'COMMIT' };
}

function rollbackCommand (args: string[]): RollbackCommand {
  if (args.length) {
    throw new Error(
      [
        '',
        'INVALID INPUT',
        'ROLLBACK command does not accept any arguments.',
        ''
      ].join('\n')
    );
  }

  return { type: 'ROLLBACK' };
}

export default function getInput (currentBlockIndex: number) {
  const input = prompt(`Enter command [${currentBlockIndex}]:`);
  const [command, ...args] = input.split(/\s/);

  switch (command.toLowerCase()) {
    case 'set':
      return setCommand(args);
    case 'get':
      return getCommand(args);
    case 'unset':
      return unsetCommand(args);
    case 'numwithvalue':
      return numWithValueCommand(args);
    case 'begin':
      return beginCommand(args);
    case 'commit':
      return commitCommand(args);
    case 'rollback':
      return rollbackCommand(args);
    case 'end':
      logInfo('exit');
      return process.exit(0);
    default:
      // @todo show list of acceptable commands
      throw new Error(`UNKNOWN COMMAND: ${command}`);
  }
}
