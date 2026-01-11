import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditFolderDto {
  @ApiProperty({ example: "Documents" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "uuid-or-null", nullable: true })
  @IsUUID()
  @IsOptional()
  parentId?: string | null;
}





