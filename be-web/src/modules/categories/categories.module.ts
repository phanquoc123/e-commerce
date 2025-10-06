import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';
import { CategoryEntity } from './entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
// import { CatsController } from './cats.controller';
// import { CatsService } from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
