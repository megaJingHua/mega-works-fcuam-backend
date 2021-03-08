import {
  Response,
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NavbarService } from './navbar.service';

import { Roles } from '../user_role/roles.decorator';
import { Role } from '../user_role/role.enum';
import { RolesGuard } from '../user_role/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NavbarPipe } from './navbar.pipe';
import { CreateNavbarDto } from './create-navbar.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('navbar')
export class NavbarController {
  constructor(private navbarService: NavbarService) {}

  @ApiOperation({
    summary: '取得Menu',
    description: '取得Menu',
  })
  @ApiParam({ name: '不用參數', required: false })
  @ApiOkResponse({
    description: '取得Menu',
    type: [CreateNavbarDto],
  })
  @Get()
  async getall(@Response() res): Promise<string[]> {
    const data = await this.navbarService.findAll();
    return res.status(HttpStatus.OK).json(data);
  }

  //需有權限才能存取
  @ApiOperation({
    summary: '新增Menu資料',
    description: '新增Menu資料',
  })
  @ApiBody({ type: [CreateNavbarDto] })
  @ApiCreatedResponse({
    description: '連結成功建立,其實就是201狀態的描述',
  })
  @ApiBearerAuth()
  /*
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)*/
  @Post()
  async addData(
    @Param() params,
    @Response() res,
    @Body(new NavbarPipe()) input_data: CreateNavbarDto[],
  ): Promise<any> {
    const s: CreateNavbarDto[] = input_data;
    let resulterror = 0;
    const count = s.length;
    let i: number;
    const result_OK = 'OK';
    let result;

    ///先把資料刪除後再新增
    const navbar_delete = await this.navbarService.deletenavbar();
    const childern_delete = await this.navbarService.deletenavbarchildern();
    ///刪除失敗
    if (!navbar_delete || !childern_delete) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('Delte navbar and childern Error .');
    }
    //依序新增
    for (i = 0; i < count; i++) {
      try {
        result = await this.navbarService.create(s[i]);
        // 保存成功执行的操作
      } catch (err) {
        // 保存失败执行的操作
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resulterror += 1;
      }
    }
    ///回傳結果
    if (resulterror != 0) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('Create and update Error .');
    } else {
      return res.status(HttpStatus.CREATED).json(result_OK);
    } /*
    const result = await this.navbarService.create(s[0]);
    return res.status(HttpStatus.CREATED).json(result);*/
  }

  @ApiExcludeEndpoint()
  //需有權限才能存取
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteone(@Param() params, @Response() res): Promise<any> {
    const result = await this.navbarService.deletenavbar();
    return res.status(HttpStatus.CREATED).json(result);
  }
}
