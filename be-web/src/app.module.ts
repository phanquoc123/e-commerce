import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configTypeORM } from './configs/typeorm.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ColorsModule } from './modules/colors/colors.module';
import { SizesModule } from './modules/sizes/sizes.module';
import { ProductVariantsModule } from './modules/product-variants/product-variants.module';
import { ProductImagesModule } from './modules/product-images/product-images.module';
import { CollectionsModule } from './modules/collections/collections.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configTypeORM),
    CategoriesModule,
    ProductsModule,
    ColorsModule,
    SizesModule,
    ProductVariantsModule,
    ProductImagesModule,
    CollectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
