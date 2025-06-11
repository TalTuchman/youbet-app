import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'; // <-- ADD IMPORT

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <-- ADD THIS MODULE CONFIG
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}