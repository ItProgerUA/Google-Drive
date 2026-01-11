import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { AuthModule } from "src/auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Folder } from "src/folders/folder.model";
import { File } from "src/files/file.model";
@Module({
  imports: [SequelizeModule.forFeature([Folder, File]), AuthModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
