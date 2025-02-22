import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Root module of the application, configuring caching and core application components.
 * This module sets up global caching using Redis via Keyv and registers application controllers and services.
 * @imports {CacheModule} Imports the `CacheModule` to enable caching functionality within the application.
 * @controllers {AppController} Declares the AppController to handle base application routes.
 * @providers {`AppService`, { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }}
 *   Declares the `AppService` to provide core application logic and configures a global CacheInterceptor.
 * @exports {AppModule} Exports the AppModule class, making it the main module of the application.
 */
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          stores: [
            // Redis Keyv instance https://docs.nestjs.com/techniques/caching#using-alternative-cache-stores
            createKeyv('redis://localhost:6379', {}),
          ],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Applyes to all controlles
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
