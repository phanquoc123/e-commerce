import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesService } from './services/sizes.service';
import { SizesController } from './controllers/sizes.controller';
import { SizeEntity } from './entities/sizes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity])],
  controllers: [SizesController],
  providers: [SizesService],
  exports: [SizesService],
})
export class SizesModule {}
