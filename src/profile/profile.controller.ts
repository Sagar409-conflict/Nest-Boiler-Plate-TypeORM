import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/update-user.dto';
import { commonResponse } from 'src/utils';
import { LANGUAGE_CODE } from 'src/utils/constants';
import { metaDataForPaginations } from 'src/utils/commonFunction';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Register a new user
   * @param profileData
   * @returns
   */
  @Post()
  create(@Body() profileData: CreateUserDto): Promise<Profile> {
    return this.profileService.createProfile(profileData);
  }

  /**
   * Get All Users Data
   * @param req
   * @param res
   * @param page
   * @param limit
   * @param search
   * @returns
   */
  @Get()
  async findAll(
    @Req() req,
    @Res() res,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = null,
  ): Promise<Profile[]> {
    let languagecode = req.headers.languagecode || LANGUAGE_CODE.EN;
    try {
      const { data, count } = await this.profileService.finadAllUsers(
        search,
        page,
        limit,
      );
      return commonResponse.success(languagecode, res, 200, 'PROFILE_SUCCESS', {
        data,
        meta: await metaDataForPaginations(page, limit, count),
      });
    } catch (error) {
      console.log(error);
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
