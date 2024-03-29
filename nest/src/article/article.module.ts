import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {Article} from "./entities/article.entity";
import {TypeOrmModule} from "@nestjs/typeorm" ;
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
@Module({
  imports :[TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
