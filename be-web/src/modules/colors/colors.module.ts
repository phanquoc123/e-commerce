import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsService } from './services/colors.service';
import { ColorsController } from './controllers/colors.controller';
import { ColorEntity } from './entities/colors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
