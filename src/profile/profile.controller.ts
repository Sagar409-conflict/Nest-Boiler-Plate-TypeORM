import { Body, Controller, Param, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() profileData: Partial<Profile>): Promise<Profile> {
    return this.profileService.createProfile(profileData);
  }
}
