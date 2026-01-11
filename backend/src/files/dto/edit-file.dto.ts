import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditFileDto {
  @ApiProperty({ example: "document.pdf" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "uuid-or-null", nullable: true })
  @IsUUID()
  @IsOptional()
  folderId?: string | null;
}





