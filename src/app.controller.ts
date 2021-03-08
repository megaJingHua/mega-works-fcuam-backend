import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginFormat } from './users/login_format';

@ApiTags('Login 登入')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: '登入',
    description: '登入',
  })
  @ApiBody({ type: LoginFormat })
  @ApiCreatedResponse({
    description:
      'Token  :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml2YW4iLCJzdWIiOjEsInJvbGVzIjoiYWRtaW4iLCJpYXQiOjE2MTQ3ODMyNzcsImV4cCI6MTYxNDc4Mzg3N30.SDEGqAFcmH00GWuuk85tXKDH1Dw9yekaq2ghGLqm2aU',
    type: String,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
