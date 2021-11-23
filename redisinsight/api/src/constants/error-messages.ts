/* eslint-disable max-len */
export default {
  INVALID_DATABASE_INSTANCE_ID: 'Invalid database instance id.',
  UNDEFINED_INSTANCE_ID: 'Undefined redis database instance id.',
  NO_CONNECTION_TO_REDIS_DB: 'No connection to the Redis Database.',
  WRONG_DATABASE_TYPE: 'Wrong database type.',
  CONNECTION_TIMEOUT:
    'The connection has timed out, please check the connection details.',
  AUTHENTICATION_FAILED: () => 'Failed to authenticate, please check the username or password.',
  INCORRECT_DATABASE_URL: (url) => `Could not connect to ${url}, please check the connection details.`,
  INCORRECT_CERTIFICATES: (url) => `Could not connect to ${url}, please check the CA or Client certificate.`,
  INCORRECT_CREDENTIALS: (url) => `Could not connect to ${url}, please check the Username or Password.`,

  CA_CERT_EXIST: 'This ca certificate name is already in use.',
  CLIENT_CERT_EXIST: 'This client certificate name is already in use.',
  INVALID_CERTIFICATE_ID: 'Invalid certificate id.',
  SENTINEL_MASTER_NAME_REQUIRED: 'Sentinel master name must be specified.',
  MASTER_GROUP_NOT_EXIST: "Master group with this name doesn't exist",

  KEY_NAME_EXIST: 'This key name is already in use.',
  KEY_NOT_EXIST: 'Key with this name does not exist.',
  PATH_NOT_EXISTS: () => 'There is no such path.',
  INDEX_OUT_OF_RANGE: () => 'Index is out of range.',
  MEMBER_IN_SET_NOT_EXIST: 'This member does not exist.',
  NEW_KEY_NAME_EXIST: 'New key name is already in use.',
  KEY_OR_TIMEOUT_NOT_EXIST:
    'Key with this name does not exist or does not have an associated timeout.',
  SERVER_NOT_AVAILABLE: 'Server is not available. Please try again later.',
  REDIS_CLOUD_FORBIDDEN: 'Error fetching account details.',

  DATABASE_IS_INACTIVE: 'The base is inactive.',

  INCORRECT_CLUSTER_CURSOR_FORMAT: 'Incorrect cluster cursor format.',
  REMOVING_MULTIPLE_ELEMENTS_NOT_SUPPORT: () => 'Removing multiple elements is available for Redis databases v. 6.2 or later.',
  SCAN_PER_KEY_TYPE_NOT_SUPPORT: () => 'Filtering per Key types is available for Redis databases v. 6.0 or later.',
  WRONG_DISCOVERY_TOOL: () => 'Selected discovery tool is incorrect, please add this database manually using Host and Port.',
  COMMAND_NOT_SUPPORTED: (command: string) => `Redis does not support '${command}' command.`,
  CLI_COMMAND_NOT_SUPPORTED: (command: string) => `CLI ERROR: The '${command}' command is not supported by the RedisInsight CLI.`,
  CLI_UNTERMINATED_QUOTES: () => 'Invalid argument(s): Unterminated quotes.',
  CLI_INVALID_QUOTES_CLOSING: () => 'Invalid argument(s): Closing quote must be followed by a space or nothing at all.',
  CLUSTER_NODE_NOT_FOUND: (node: string) => `Node ${node} not exist in OSS Cluster.`,
  REDIS_MODULE_IS_REQUIRED: (module: string) => `Required ${module} module is not loaded.`,
  APP_SETTINGS_NOT_FOUND: () => 'Could not find application settings.',
  SERVER_INFO_NOT_FOUND: () => 'Could not find server info.',
};