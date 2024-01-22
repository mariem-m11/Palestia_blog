import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { ArticleService } from '../article/article.service';
import * as bcrypt from 'bcrypt';

import {
  randEmail,
  randPassword,
  randText,
  randUserName,
} from '@ngneat/falso';


import { User } from '../user/entities/user.entity';
import { Article } from '../article/entities/article.entity';

async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const articleService = app.get(ArticleService);

  for (let i = 1; i <= 20; i++) { 
    const article = new Article();
    article.title = `palestine${i}`;
    article.description = randText();
    await articleService.addArticle(article);
  }

  for (let i = 0; i < 10; i++) {
    const user = new User();

    user.email = randEmail();
    user.username = randUserName();
    const plainPassword = randPassword();
    user.password = await bcrypt.hash(plainPassword, 10); // Hashing the password
    await userService.addUser(user);
}

  await app.close();
}
bootstrap();