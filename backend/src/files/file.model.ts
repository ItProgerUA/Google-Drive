import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Folder } from "../folders/folder.model";

export interface FileCreationAttrs {
  name: string;
  filename: string;
  mimetype: string;
  size: number;
  folderId?: string | null;
  userId: string;
}

@Table({
  tableName: "files",
  indexes: [
    { fields: ["userId"] },
    { fields: ["folderId"] },
    { fields: ["userId", "folderId"] },
    { fields: ["name"] },
    { fields: ["mimetype"] },
  ],
})
export class File extends Model<File, FileCreationAttrs> {
  @ApiProperty({ example: "uuid", description: "Unique identifier" })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: "photo.jpg", description: "Original file name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({ example: "uuid.jpg", description: "Stored file name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare filename: string;

  @ApiProperty({ example: "image/jpeg", description: "File MIME type" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare mimetype: string;

  @ApiProperty({ example: 1024, description: "File size in bytes" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare size: number;

  @ApiProperty({ example: "uuid", description: "Folder ID (null for root)" })
  @ForeignKey(() => Folder)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare folderId: string | null;

  @ApiProperty({ example: "uuid", description: "Owner user ID" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare owner: User;

  @BelongsTo(() => Folder)
  declare folder: Folder;
}
