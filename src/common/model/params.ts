import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsNumberString, IsArray } from 'class-validator'

/**
 * 查询单个参数，用于 class-validator 校验
 */
export class FindOneParams {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumberString({}, { message: 'id必须为数字类型' })
  id: number
}

/**
 * 批量删除，接收id数组
 */
export class DeleteManyDto {
  @ApiProperty({ description: 'id数组', example: [1, 2, 3] })
  @IsArray({ message: 'id必须为数组类型' })
  @ArrayNotEmpty({ message: 'id数组不能为空' })
  ids: number[]
}
