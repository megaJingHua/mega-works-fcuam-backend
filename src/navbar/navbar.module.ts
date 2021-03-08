import { Module } from '@nestjs/common';
import { NavbarController } from './navbar.controller';
import { NavbarService } from './navbar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Navbar, NavbarSchema } from './navbar.schema';
import { Navbarchildern, NavbarchildernSchema } from './navbarchildern.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Navbar.name, schema: NavbarSchema },
      { name: Navbarchildern.name, schema: NavbarchildernSchema },
    ]),
    AuthModule,
  ],
  controllers: [NavbarController],
  providers: [NavbarService],
})
export class NavbarModule {}
