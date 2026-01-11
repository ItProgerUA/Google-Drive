import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { Folder } from "./folders/folder.model";
import { File } from "./files/file.model";

import { AuthModule } from "./auth/auth.module";
import { FoldersModule } from "./folders/folders.module";
import { FilesModule } from "./files/files.module";
import { EventsModule } from "./events/events.module";
import { SearchModule } from "./search/search.module";
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Folder, File],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FoldersModule,
    FilesModule,
    EventsModule,
    SearchModule,
  ],
})
export class AppModule {}
