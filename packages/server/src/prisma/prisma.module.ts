import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Make this module global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export the service so other modules can use it
})
export class PrismaModule {}