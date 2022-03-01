export interface ICommands {
  [key: string]: ICommand;
}

export interface ICommand {
  name?: string;
  summary: string;
  complexity?: string;
  arguments?: ICommandArg[];
  since: string;
  group: CommandGroup | string;
}

export interface ICommandArg {
  name?: string[] | string;
  type?: CommandArgsType[] | CommandArgsType | string | string[];
  optional?: boolean;
  enum?: string[];
  block?: ICommandArg[];
  command?: string;
  multiple?: boolean;
  variadic?: boolean;
  dsl?: string;
}

export interface ICommandArgGenerated extends ICommandArg {
  generatedName?: string | string[];
}

export enum CommandArgsType {
  Block = 'block',
  Double = 'double',
  Enum = 'enum',
  Integer = 'integer',
  Key = 'key',
  POSIXTime = 'posix time',
  Pattern = 'pattern',
  String = 'string',
  Type = 'type',
}

export enum CommandGroup {
  Cluster = 'cluster',
  Connection = 'connection',
  Geo = 'geo',
  Bitmap = 'bitmap',
  Generic = 'generic',
  PubSub = 'pubsub',
  Scripting = 'scripting',
  Transactions = 'transactions',
  Server = 'server',
  SortedSet = 'sorted-set',
  HyperLogLog = 'hyperloglog',
  Hash = 'hash',
  Set = 'set',
  Stream = 'stream',
  List = 'list',
  String = 'string',
  Search = 'search',
  JSON = 'json',
  TimeSeries = 'timeseries',
  Graph = 'graph',
  AI = 'ai',
  TDigest = 'tdigest',
  CMS = 'cms',
  TopK = 'topk',
}

export enum CommandPrefix {
  AI = 'AI',
  Graph = 'GRAPH',
  TimeSeries = 'TS',
  Search = 'FT',
  JSON = 'JSON',
  Gears = 'RG',
  BloomFilter = 'BF',
  CuckooFilter = 'CF',
  CountMinSketchFilter = 'CMS',
  TopK = 'TOPK',
}

export const CommandMonitor = 'MONITOR'

export enum CommandRediSearch {
  Search = 'FT.SEARCH',
  Aggregate = 'FT.AGGREGATE',
  Info = 'FT.INFO',
}

export const commandsWBTableView = [
  CommandRediSearch.Search,
  CommandRediSearch.Aggregate,
]
export const commandsWBTablePartView = [
  CommandRediSearch.Info,
]

export enum CommandRSSearchArgument {
  NoContent = 'NOCONTENT',
  Return = 'RETURN',
  Highlight = 'HIGHLIGHT',
  WithScores = 'WITHSCORES',
  WithPayloads = 'WITHPAYLOADS',
  WithSortKeys = 'WITHSORTKEYS',
}

export enum DSL {
  cypher = 'cypher',
  lua = 'lua'
}

interface IDSNaming {
  [key: string]: string
}

export const DSLNaming: IDSNaming = {
  [DSL.cypher]: 'Cypher',
  [DSL.lua]: 'Lua'
}
