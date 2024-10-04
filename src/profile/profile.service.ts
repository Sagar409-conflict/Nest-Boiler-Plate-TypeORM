import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(profileData: Partial<Profile>): Promise<Profile> {
    const profile = this.profileRepository.create({ ...profileData });
    return this.profileRepository.save(profile);
  }
}
