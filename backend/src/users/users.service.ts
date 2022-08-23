import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { CreateUserDto } from 'dto/create-user.dto';
import { Server } from 'schemas/server.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).populate('servers').exec();
  }

  async findOneNoPopulate(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async inServer(user: string, server: string): Promise<boolean> {
    let userServers = (await this.findOneNoPopulate(user)).servers;

    return userServers.some((server) => {
      return (<any>server).equals(server);
    });
  }

  async joinServer(user: string, server: string) {
    await this.userModel
      .findByIdAndUpdate(user, {
        $push: {
          servers: server,
        },
      })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('servers').exec();
  }
}
