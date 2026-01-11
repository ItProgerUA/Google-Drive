import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateFolderDto {
  @ApiProperty({ example: "My Folder", description: "Folder name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Parent folder ID (null for root folders)",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string | null;
}


