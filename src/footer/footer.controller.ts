import {
  Response,
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterPipe } from './footer.pipe';
import { CreateFooterDto } from './create-footer.dto';
import { Roles } from '../user_role/roles.decorator';
import { Role } from '../user_role/role.enum';
import { RolesGuard } from '../user_role/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FindoneFormat } from './findone.format';
import { Rolefooter } from './footerrole.enum';
import { FindAllFormat } from './findall.format';

@ApiTags('Footer 頁尾')
@Controller('footer')
export class FooterController {
  constructor(private footerService: FooterService) {}
  /*
  @Get() ////data在程式裡面
  async get(@Response() res): Promise<string[]> {
    const data = this.footerService.getdata();
    return res.status(HttpStatus.OK).json(data);
  }
*/
  @ApiOperation({
    summary: '使用角色取得單一資料',
    description: '使用角色取得單一資料',
  })
  @ApiParam({ name: 'roles', description: '使用者role', enum: Rolefooter })
  @ApiOkResponse({
    description: '取得單一資料',
    type: FindoneFormat,
  })
  @Get(':roles')
  async getone(@Param() params, @Response() res): Promise<string[]> {
    const data = await this.footerService.findone(params.roles);
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiOperation({
    summary: '取得頁尾資料',
    description: '取得頁尾資料',
  })
  @ApiParam({ name: '不用參數', required: false })
  @ApiOkResponse({
    description: '取得頁尾資料',
    type: FindAllFormat,
  })
  @Get()
  async getall(@Response() res): Promise<string[]> {
    const data = await this.footerService.findAll();
    return res.status(HttpStatus.OK).json(data);
  }

  //需有權限才能存取

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '新增頁尾資料',
    description: '新增頁尾資料',
  })
  @ApiBody({ type: [CreateFooterDto] })
  @ApiCreatedResponse({
    description: '連結成功建立,其實就是201狀態的描述',
  })
  @ApiBearerAuth()
  @Post()
  async addData(
    @Param() params,
    @Response() res,
    @Body(new FooterPipe()) input_data: CreateFooterDto[],
  ): Promise<any> {
    const s_length: any = input_data;
    //const s: CreateFooterDto[] = s_length.data;
    const s: CreateFooterDto[] = s_length;
    let i: number;
    //const count = s_length.data.length;
    const count = s_length.length;
    const result_OK = 'OK';
    let resulterror = 0;
    let result;

    if (count == null || count == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Create and update Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    for (i = 0; i < count; i++) {
      try {
        result = await this.footerService.createorupdate(s[i]);
        // 保存成功执行的操作
      } catch (err) {
        // 保存失败执行的操作
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resulterror += 1;
      }
    }

    //const result = await this.footerService.create(input_data[0]);
    if (resulterror != 0) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('Create and update Error .');
    } else {
      return res.status(HttpStatus.CREATED).json(result_OK);
    }
  }
  /*
  //需有權限才能存取
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':role')
  async updateone(
    @Param() params,
    @Response() res,
    @Body(new FooterPipe()) input_data: CreateFooterDto,
  ): Promise<any> {
    const result = await this.footerService.updateone(params.role, input_data);
    return res.status(HttpStatus.CREATED).json(result);
  }
*/

  @ApiOperation({
    summary: '使用角色刪除單一資料',
    description: '使用角色刪除單一資料',
  })
  @ApiParam({ name: 'roles', description: '使用者role', enum: Rolefooter })
  @ApiOkResponse({
    description: '刪除單一資料',
  })
  @ApiBearerAuth()
  //需有權限才能存取
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':role')
  async deleteone(@Param() params, @Response() res): Promise<any> {
    const result = await this.footerService.deleteOne(params.role);
    return res.status(HttpStatus.CREATED).json(result);
  }
}
