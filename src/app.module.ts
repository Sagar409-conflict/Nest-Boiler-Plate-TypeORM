import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './profile/entities/profile.entity';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [Profile],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Profile]),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProfileService],
})
export class AppModule {}
