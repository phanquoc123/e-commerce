import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantsService } from './services/product-variants.service';
import { ProductVariantsController } from './controllers/product-variants.controller';
import { ProductVariantEntity } from './entities/product-variants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantEntity])],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
