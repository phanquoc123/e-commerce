import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesService } from './services/product-images.service';
import { ProductImagesController } from './controllers/product-images.controller';
import { ProductImageEntity } from './entities/product-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImageEntity])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [ProductImagesService],
})
export class ProductImagesModule {}
