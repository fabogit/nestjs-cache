import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 42 }, 10 * 1000);
    // await this.cacheManager.del('cached_item');
    // await this.cacheManager.clear();
    const cachedItem = await this.cacheManager.get('cached_item');
    this.logger.debug('Item cached', cachedItem);
    return 'Hello World!';
  }
}
