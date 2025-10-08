import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionProductsService } from './services/collection-products.service';
import { CollectionProductsController } from './controllers/collection-products.controller';
import { CollectionProductEntity } from './entities/collection-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionProductEntity])],
  controllers: [CollectionProductsController],
  providers: [CollectionProductsService],
  exports: [CollectionProductsService],
})
export class CollectionProductsModule {}
