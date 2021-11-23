import { join } from 'path';

const homedir = join(__dirname, '..');

const staticDir = process.env.BUILD_TYPE === 'ELECTRON' && process['resourcesPath']
  ? join(process['resourcesPath'], 'static')
  : join(__dirname, '..', 'static');

export default {
  dir_path: {
    homedir,
    staticDir,
    logs: join(homedir, 'logs'),
    defaultPlugins: join(staticDir, 'plugins'),
    customPlugins: join(homedir, 'plugins'),
    pluginsAssets: join(staticDir, 'resources', 'plugins'),
    commands: join(homedir, 'commands'),
    caCertificates: join(homedir, 'ca_certificates'),
    clientCertificates: join(homedir, 'client_certificates'),
  },
  server: {
    env: 'development',
    port: 5000,
    docPrefix: 'api/docs',
    globalPrefix: 'api',
    customPluginsUri: '/plugins',
    staticUri: '/static',
    defaultPluginsUri: '/static/plugins',
    pluginsAssetsUri: '/static/resources/plugins',
    secretStoragePassword: process.env.SECRET_STORAGE_PASSWORD,
    tls: process.env.SERVER_TLS ? process.env.SERVER_TLS === 'true' : true,
    tlsCert: process.env.SERVER_TLS_CERT,
    tlsKey: process.env.SERVER_TLS_KEY,
    staticContent: !!process.env.SERVER_STATIC_CONTENT || false,
    buildType: process.env.BUILD_TYPE || 'ELECTRON',
    appVersion: process.env.APP_VERSION || '2.0.0',
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 10000,
  },
  db: {
    database: join(homedir, 'redisinsight.db'),
    synchronize: process.env.DB_SYNC ? process.env.DB_SYNC === 'true' : false,
    migrationsRun: process.env.DB_MIGRATIONS ? process.env.DB_MIGRATIONS === 'true' : true,
  },
  redis_cloud: {
    url: process.env.REDIS_CLOUD_URL || 'https://qa-api.redislabs.com/v1/',
  },
  redis_clients: {
    idleSyncInterval: parseInt(process.env.CLIENTS_IDLE_SYNC_INTERVAL, 10) || 1000 * 60 * 60, // 1hr
    maxIdleThreshold: parseInt(process.env.CLIENTS_MAX_IDLE_THRESHOLD, 10) || 1000 * 60 * 60, // 1hr
    retryTimes: parseInt(process.env.CLIENTS_RETRY_TIMES, 10) || 5,
    retryDelay: parseInt(process.env.CLIENTS_RETRY_DELAY, 10) || 500,
    maxRetriesPerRequest: parseInt(process.env.CLIENTS_MAX_RETRIES_PER_REQUEST, 10) || 1,
  },
  redis_scan: {
    countDefault: parseInt(process.env.SCAN_COUNT_DEFAULT, 10) || 200,
    countThreshold: parseInt(process.env.SCAN_COUNT_THRESHOLD, 10) || 10000,
  },
  modules: {
    json: {
      sizeThreshold: parseInt(process.env.JSON_SIZE_THRESHOLD, 10) || 1024,
    },
  },
  redis_cli: {
    unsupportedCommands: JSON.parse(process.env.CLI_UNSUPPORTED_COMMANDS || '[]'),
  },
  analytics: {
    writeKey: process.env.SEGMENT_WRITE_KEY || 'SOURCE_WRITE_KEY',
  },
  logger: {
    stdout: process.env.STDOUT_LOGGER ? process.env.STDOUT_LOGGER === 'true' : false, // disabled by default
    files: process.env.FILES_LOGGER ? process.env.FILES_LOGGER === 'true' : true, // enabled by default
    omitSensitiveData: process.env.LOGGER_OMIT_DATA ? process.env.LOGGER_OMIT_DATA === 'true' : true,
    pipelineSummaryLimit: parseInt(process.env.LOGGER_PIPELINE_SUMMARY_LIMIT, 10) || 5,
  },
  commands: {
    mainUrl: process.env.COMMANDS_MAIN_URL
      || 'https://raw.githubusercontent.com/redis/redis-doc/master/commands.json',
    redisearchUrl: process.env.COMMANDS_REDISEARCH_URL
      || 'https://raw.githubusercontent.com/RediSearch/RediSearch/master/commands.json',
    redijsonUrl: process.env.COMMANDS_REDIJSON_URL
      || 'https://raw.githubusercontent.com/RedisJSON/RedisJSON/master/commands.json',
    redistimeseriesUrl: process.env.COMMANDS_REDISTIMESERIES_URL
      || 'https://raw.githubusercontent.com/RedisTimeSeries/RedisTimeSeries/master/src/commands.json',
    redisaiUrl: process.env.COMMANDS_REDISAI_URL
      || 'https://raw.githubusercontent.com/RedisAI/RedisAI/master/commands.json',
    redisgraphUrl: process.env.COMMANDS_REDISGRAPH_URL
      || 'https://raw.githubusercontent.com/RedisGraph/RedisGraph/master/commands.json',
  },
};