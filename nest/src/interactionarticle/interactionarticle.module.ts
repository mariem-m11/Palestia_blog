import { Module } from '@nestjs/common';
import { InteractionarticleService } from './interactionarticle.service';
import { InteractionarticleController } from './interactionarticle.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "../article/entities/article.entity";
import {Interactionarticle} from "./entities/interactionarticle.entity";

@Module({
  imports :[TypeOrmModule.forFeature([Interactionarticle])],

  controllers: [InteractionarticleController],
  providers: [InteractionarticleService],
})
export class InteractionarticleModule {}
