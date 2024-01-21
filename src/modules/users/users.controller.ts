import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
// import { User as UserModel, Post as PostModel } from '@prisma/client';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: '获取单个用户信息', type: CreateUserDto })
  findOne(@Param('id') id: number) {
    // console.log('id :>> type:', typeof id);
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    // +id 将 id 转换为 number 类型
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id)
  }
}
