import {
  Controller,
  Get,
  // UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
// import { CacheInterceptor } from '@nestjs/cache-manager';

/**
 * Controller for the root application endpoint.
 * Handles requests to the base route ('/') and demonstrates caching using `CacheInterceptor` and `Cache` decorators.
 */
//  class-level caching configuration (currently not active here, as caching is method-specific).
// @UseInterceptors(CacheInterceptor)`
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint with caching applied.
   * Demonstrates method-level caching using `@CacheKey` and `@CacheTTL` decorators.
   * `@Get()` Decorator that maps this method to handle GET requests to the root path ('/').
   * `@CacheKey('some_route')` Decorator to define a custom cache key for this endpoint, overriding default key generation.
   * `@CacheTTL(10 * 1000)` Decorator to set a specific Time-To-Live (TTL) for the cache entry of this endpoint, in milliseconds (10 seconds).
   * @async
   * @returns A Promise that resolves to the greeting message, potentially retrieved from cache or newly computed by `appService.cache()`.
   */
  @Get()
  @CacheKey('some_route')
  @CacheTTL(10 * 1000)
  async getHello() {
    return this.appService.cache();
  }
}
