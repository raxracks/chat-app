import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { Server, ServerSchema } from 'schemas/server.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }]),
    UsersModule,
  ],
  providers: [ServersService],
  controllers: [ServersController],
  exports: [ServersService],
})
export class ServersModule {}
