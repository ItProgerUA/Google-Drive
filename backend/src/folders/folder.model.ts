import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "../users/users.model";

export interface FolderCreationAttrs {
  name: string;
  userId: string;
  parentId?: string;
}

@Table({
  tableName: "folders",
  indexes: [
    { fields: ["userId"] },
    { fields: ["parentId"] },
    { fields: ["userId", "parentId"] },
    { fields: ["name"] },
  ],
})
export class Folder extends Model<Folder, FolderCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: "My Folder", description: "Folder name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "1",
    description: "Parent folder ID (null for root folders)",
  })
  @ForeignKey(() => Folder)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare parentId: string | null;

  @ApiProperty({ example: "1", description: "Owner user ID" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare owner: User;

  @BelongsTo(() => Folder, "parentId")
  declare parent: Folder;

  @HasMany(() => Folder, "parentId")
  declare children: Folder[];
}
