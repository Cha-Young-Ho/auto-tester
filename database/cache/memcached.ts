import memcached from 'memcached';
import { DatabaseConfig } from '../../config/config';
  
function getMemcachedConnection(config: DatabaseConfig): any {
    return new memcached(config.host + ':' + config.port);
}

export { getMemcachedConnection };