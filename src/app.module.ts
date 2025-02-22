import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          stores: [
            // Redis Keyv instance
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
