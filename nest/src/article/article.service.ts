import { Injectable } from '@nestjs/common';
import { AddArticleDto } from './dto/add-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "./entities/article.entity";
import {Repository} from "typeorm";


@Injectable()
export class ArticleService {

  constructor(
      @InjectRepository(Article)
      private readonly ArticleRepository : Repository<Article>,
      //private userService : UserService
  ) {}

  //Création d'article == ajout article

  async addArticle(article: Article) {
    return await this.ArticleRepository.save(article);
    console.log('m in addUser')
  }

  async create(createArticleDto: AddArticleDto) : Promise<Article>{
    const article = this.ArticleRepository.create(createArticleDto);
    return await this.ArticleRepository.save(article);
  }


  async getArticles(): Promise<Article[]> {
    return await this.ArticleRepository.find()
  }

  // async findAll() {
  //   return `This action returns all article`;
  // }

  async findOne(id: number) {
    return await this.ArticleRepository.findOneBy({ id: id });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.ArticleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.ArticleRepository.delete(id);
  }
}
