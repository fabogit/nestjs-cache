import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';

/**
 * Injectable service for the root application module.
 * Provides core application functionalities such as demonstrating cache usage.
 */
@Injectable()
export class AppService {
  /**
   * `Logger` instance for `AppService`, used for logging service activities.
   * @private
   * @readonly
   */
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  /**
   * Constructor for `AppService`.
   * @param {Cache} cacheManager - Injected `CacheManager` instance, used for interacting with the cache.
   * @Inject Injects the `CacheManager` dependency into this service.
   */
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /**
   * Retrieves a greeting message, demonstrating cache operations.
   * Sets an item in the cache, retrieves it, and logs the cached item to demonstrate caching functionality.
   * @async
   * @returns {Promise<string>} A Promise that resolves to the greeting message "Hello World!".
   */
  async cache(): Promise<string> {
    await this.cacheManager.set('cached_item', { key: 42 }, 10 * 1000);
    // await this.cacheManager.del('cached_item');
    // await this.cacheManager.clear();
    const cachedItem = await this.cacheManager.get('cached_item');
    // this will log only the first time and after ttl is expired
    this.logger.debug('Item cached', cachedItem);
    return 'Redis';
  }
}
