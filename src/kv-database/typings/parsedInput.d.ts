type SetCommand = {
  type: 'SET';
  name: string;
  value: number;
};

type GetCommand = {
  type: 'GET';
  name: string;
};

type UnsetCommand = {
  type: 'UNSET';
  name: string;
};

type NumWithValueCommand = {
  type: 'NUMWITHVALUE';
  value: number;
};

type RollbackCommand = {
  type: 'ROLLBACK';
};

type CommitCommand = {
  type: 'COMMIT';
};

type EndCommand = {
  type: 'END';
};

type BeginCommand = {
  type: 'BEGIN';
};
