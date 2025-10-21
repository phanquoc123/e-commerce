import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './controllers/collections.controller';
import { CollectionEntity } from './entities/collections.entity';
import { CollectionProductEntity } from '../collection-products/entities/collection-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity, CollectionProductEntity])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
