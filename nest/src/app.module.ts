import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "./article/entities/article.entity";
import {User} from "./user/entities/user.entity";
import { InteractionarticleModule } from './interactionarticle/interactionarticle.module';
import {Interactionarticle} from "./interactionarticle/entities/interactionarticle.entity";
import {ConfigModule} from "@nestjs/config";
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ArticleModule, UserModule, MailModule
  ,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog',
      entities: [Article,User,Interactionarticle],
      synchronize: true,
    }), InteractionarticleModule,
      ConfigModule.forRoot({
          isGlobal: true,

      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
