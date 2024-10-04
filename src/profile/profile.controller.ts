import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() profileData: Partial<Profile>): Promise<Profile> {
    return this.profileService.createProfile(profileData);
  }

  @Get()
  async findAll(): Promise<Profile[]> {
    return await this.profileService.finadAllUsers();
  }

  @Get('/:id')
  async findUser(@Param('id') userId: number): Promise<Profile> {
    return await this.profileService.findUser(userId);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Profile> {
    const updatedRecord = await this.profileService.update(
      userId,
      updateUserDto,
    );
    return updatedRecord;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    await this.profileService.removeUser(userId);
  }
}
