import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { Footer, FooterSchema } from './footer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Footer.name, schema: FooterSchema }]),
    AuthModule,
  ],
  providers: [FooterService],
  controllers: [FooterController],
})
export class FooterModule {}
