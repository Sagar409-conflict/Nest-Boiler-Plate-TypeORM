// src/users/dto/update-user.dto.ts
import { IsEmail, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Min(10)
  bio?: string;

  @IsString()
  address?: string;

  @IsString()
  @Length(10)
  phone?: string;
}
