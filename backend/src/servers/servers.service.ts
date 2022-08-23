import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateServerDto } from 'dto/create-server.dto';
import { Server, ServerDocument } from 'schemas/server.schema';
import { UsersService } from 'src/users/users.service';
import { CreateMessageDto } from 'dto/create-message.dto';
import { Message } from 'schemas/message.schema';

@Injectable()
export class ServersService {
  constructor(
    @InjectModel(Server.name) private serverModel: Model<ServerDocument>,
    private usersSevice: UsersService,
  ) {}

  async create(createServerDto: CreateServerDto): Promise<Server> {
    const createdServer = new this.serverModel(createServerDto);
    await createdServer.save();
    await this.joinServer(createdServer._id, createServerDto.owner);
    return createdServer;
  }

  async findOne(id: string): Promise<Server> {
    return this.serverModel
      .findById(id)
      .populate('owner')
      .populate('users')
      .populate('messages')
      .exec();
  }

  async sendMessage(message: Message) {
    this.serverModel
      .findByIdAndUpdate(message.server, {
        $push: {
          messages: {
            $each: [message],
            $position: 0,
          },
        },
      })
      .exec();
  }

  async joinServer(server: string, user: string): Promise<Server> {
    await this.usersSevice.joinServer(user, server);
    return this.serverModel
      .findByIdAndUpdate(server, {
        $push: {
          users: user,
        },
      })
      .exec();
  }

  async findAll(): Promise<Server[]> {
    return this.serverModel
      .find()
      .populate('owner')
      .populate('users')
      .populate('messages')
      .exec();
  }
}
