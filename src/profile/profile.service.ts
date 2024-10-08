import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  async finadAllUsers(
    search: string,
    page: number,
    limit: number,
  ): Promise<{ data: Profile[]; count: number }> {
    //NOTE: Here we will create a query builder:
    const qb = await this.profileRepository.createQueryBuilder('profile');
    if (search) {
      qb.where('profile.bio ILIKE :search', { search: `%${search}%` }).orWhere(
        'profile.address ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const [data, count] = await qb
      .select(['profile.id', 'profile.bio', 'profile.address'])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('profile.id', 'ASC')
      .getManyAndCount();

    return { data, count };
  }

  async findUser(id: number): Promise<Profile> {
    return await this.profileRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`profile with ID ${id} not found`);
    }
    const updatedProfile = Object.assign(profile, updateUserDto);
    return this.profileRepository.save(updatedProfile);
  }

  async removeUser(id: number): Promise<void> {
    const result = await this.profileRepository.delete({ id });

    console.log(
      '🚀 ~ file: profile.service.ts:39 ~ ProfileService ~ removeUser ~ result:',
      result,
    );

    if (!result.affected) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }
}
