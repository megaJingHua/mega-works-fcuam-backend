import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { GraphicEditController } from './graphic-edit.controller';
import { GraphicEditService } from './graphic-edit.service';
import { Graphic_edit, Graphic_editSchema } from './graphic_edit.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '../uploadfiles'),
    }),
    AuthModule,
    MongooseModule.forFeature([
      { name: Graphic_edit.name, schema: Graphic_editSchema },
    ]),
  ],
  controllers: [GraphicEditController],
  providers: [GraphicEditService],
})
export class GraphicEditModule {}
