import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from 'dto/create-message.dto';
import { CreateServerDto } from 'dto/create-server.dto';
import { JoinServerDto } from 'dto/join-server.dto';
import { Server } from 'schemas/server.schema';
import { ServersService } from './servers.service';

@Controller('servers')
export class ServersController {
  constructor(private serversService: ServersService) {}

  @Post()
  async create(@Body() createServerDto: CreateServerDto) {
    return this.serversService.create(createServerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Server> {
    return this.serversService.findOne(id);
  }

  @Post(':id/join')
  async joinServer(
    @Param('id') id,
    @Body() joinServerDto: JoinServerDto,
  ): Promise<Server> {
    return this.serversService.joinServer(id, joinServerDto.user);
  }

  @Get()
  async findAll(): Promise<Server[]> {
    return this.serversService.findAll();
  }
}
