import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UsersModule,
    ServersModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
