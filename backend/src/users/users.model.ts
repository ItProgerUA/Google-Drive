import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { Folder } from "../folders/folder.model";
import { File } from "../files/file.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;
  @ApiProperty({ example: "user@example.com", description: "Email" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;
  @ApiProperty({ example: "password123", description: "Password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare password: string;

  @ApiProperty({ example: "Ivan", description: "Name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Folder, "userId")
  declare folders: Folder[];

  @HasMany(() => File, "userId")
  declare files: File[];
}
