import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FoldersController } from "./folders.controller";
import { FoldersService } from "./folders.service";
import { Folder } from "./folder.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthModule } from "src/auth/auth.module";
import { FilesModule } from "src/files/files.module";

@Module({
  controllers: [FoldersController],
  providers: [FoldersService, JwtAuthGuard],
  imports: [
    SequelizeModule.forFeature([Folder]),
    AuthModule,
    forwardRef(() => FilesModule),
  ],
  exports: [FoldersService],
})
export class FoldersModule {}
