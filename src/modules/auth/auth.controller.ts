import { Body, Controller, Post, Get, Patch, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthLoginVo, ProfileVo } from './auth.vo'
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  ResetPasswordDto,
  updatePermissionDto,
} from '@/modules/users/user.dto'
import { ReqUser } from '@/common/decorator/param.decorator'
import { Guest } from '@/common/decorator/guest.decorator'
import { RequirePermission } from '@/common/decorator/permission.decorator'
import { PermissionsEnum } from '@/config/enum.config'
import { PermissionGuard } from './permission.guard'

@ApiTags('auth')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Guest()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @ApiOkResponse({ type: AuthLoginVo })
  @Guest()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @ApiOkResponse({ type: ProfileVo, description: '根据token获取当前用户信息' })
  @Get('profile')
  getProfile(@ReqUser('id') id: number): Promise<ProfileVo> {
    return this.authService.profile(id)
  }

  /**
   * 修改密码
   */
  @ApiOkResponse()
  @Patch('change-password')
  updatePassword(@ReqUser('id') id: number, @Body() dto: ChangePasswordDto) {
    return this.authService.updatePassword(id, dto.oldPassword, dto.newPassword)
  }

  /**
   * 重置密码
   * @permission 必须是管理员才能重置密码
   */
  // @Guest()
  @RequirePermission(PermissionsEnum.ADMIN)
  @Patch('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto)
  }

  /**
   * 修改用户权限
   * @permission 必须是管理员才能修改权限
   */
  @RequirePermission(PermissionsEnum.ADMIN)
  @Patch('update-permission')
  async updatePermission(@Body() dto: updatePermissionDto) {
    await this.authService.updatePermission(dto.id, dto.permissions, dto.type)
    return '修改成功'
  }
}
