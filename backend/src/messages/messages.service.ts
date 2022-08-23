import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from 'dto/create-message.dto';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'schemas/message.schema';
import { ServersService } from 'src/servers/servers.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private serversService: ServersService,
    private usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    if (
      !(await this.usersService.inServer(
        createMessageDto.author,
        createMessageDto.server,
      ))
    )
      return;
    const createdMessage = new this.messageModel(createMessageDto);
    await this.serversService.sendMessage(createdMessage);
    return createdMessage.save();
  }
}
