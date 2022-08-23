import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Server } from './server.schema';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Server' })
  server: Server;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
