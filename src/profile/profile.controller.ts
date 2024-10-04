import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { commonResponse } from 'src/utils';
import { LANGUAGE_CODE } from 'src/utils/constants';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() profileData: Partial<Profile>): Promise<Profile> {
    return this.profileService.createProfile(profileData);
  }

  @Get()
  async findAll(@Req() req, @Res() res): Promise<Profile[]> {
    let languagecode = req.headers.languagecode || LANGUAGE_CODE.EN;
    try {
      const records = await this.profileService.finadAllUsers();
      return commonResponse.success(
        languagecode,
        res,
        200,
        'PROFILE_SUCCESS',
        records,
      );
    } catch (error) {
      return commonResponse.error(
        languagecode,
        res,
        500,
        'INTERVAL_SERVER_ERROR',
        null,
      );
    }
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
