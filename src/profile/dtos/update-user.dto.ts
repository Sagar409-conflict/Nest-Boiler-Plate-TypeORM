// src/users/dto/update-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

/**
 * DTOS for Register User
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Min(10)
  username?: string;

  @IsString()
  age?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  @Min(10)
  bio?: string;

  @IsString()
  address?: string;

  @IsString()
  @Length(10)
  phone?: string;
}

/**
 * DTOS for Upating an user information
 */
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
