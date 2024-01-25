import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteractionarticleService } from './interactionarticle.service';
import { CreateInteractionarticleDto } from './dto/create-interactionarticle.dto';
import { UpdateInteractionarticleDto } from './dto/update-interactionarticle.dto';
import { ReactionType } from '../enums/reaction-type';

@Controller('interactionarticle')
export class InteractionarticleController {
  constructor(private readonly interactionarticleService: InteractionarticleService) {}

  @Post()
  create(@Body() createInteractionarticleDto: CreateInteractionarticleDto) {
    return this.interactionarticleService.create(createInteractionarticleDto);
  }

  @Get()
  findAll() {
    return this.interactionarticleService.findAll();
  }

  @Get('comment/:idArticle')
  getComments(@Param('idArticle') idArticle: number) {
    return this.interactionarticleService.getCommentsByArticleId(idArticle);
  }

  @Get('note/:idArticle')
  getNotes(@Param('idArticle') idArticle: number) {
    return this.interactionarticleService.getNotesByArticleId(idArticle);
  }

  @Get('reaction/:idArticle')
  getReactions(@Param('idArticle') idArticle: number) {
    return this.interactionarticleService.getReactionsByArticleId(idArticle);
  }

  @Get('general/:idArticle')
  getGeneralNote(@Param('idArticle') idArticle: number) {
    return this.interactionarticleService.calculateGeneralNoteForArticle(idArticle);
  }

  @Get('likes/:idArticle')
  getLikes(@Param('idArticle') idArticle: number) {
    return this.interactionarticleService.getTotalLikes(idArticle);
  }

  @Get('dislikes/:idArticle')
  getDislikes(@Param('idArticle') idArticle: number) {
    return this.interactionarticleService.getTotalDislikes(idArticle);
  }

  @Get('totaldislikes')
  getTotalDislikes() {
    return this.interactionarticleService.getDislikes();
  }

  @Get('totallikes')
  getTotallikes() {
    return this.interactionarticleService.getLikes();
  }

  @Get('totalcomments')
  getTotalComments() {
    return this.interactionarticleService.getTotalComments();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionarticleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteractionarticleDto: UpdateInteractionarticleDto) {
    return this.interactionarticleService.update(+id, updateInteractionarticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionarticleService.remove(+id);
  }
  
  @Post('comment/:idArticle/:idVisiteur')
  async ajouterCommentaire(
    @Param('idArticle') idArticle: number,
    @Param('idVisiteur') idVisiteur: number,
    @Body() createDto: Omit<CreateInteractionarticleDto, 'article_id' | 'user_id'>
    ) {
      const fullCreateDto = {
        ...createDto,
        article_id: idArticle,
        user_id: idVisiteur
      };
      return this.interactionarticleService.ajouterCommentaire(fullCreateDto);
    }

  @Post('note/:idArticle/:idVisiteur')
  async addNote(
    @Param('idArticle') idArticle: number,
    @Param('idVisiteur') idVisiteur: number,
    @Body() createDto: Omit<CreateInteractionarticleDto, 'article_id' | 'user_id'>
    ) {
      const fullCreateDto = {
        ...createDto,
        article_id: idArticle,
        user_id: idVisiteur
      };
    return this.interactionarticleService.addNote(fullCreateDto);
  }

  @Post('like/:idArticle/:idVisiteur')
  async addlike(
    @Param('idArticle') idArticle: number,
    @Param('idVisiteur') idVisiteur: number,
    @Body() createDto: Omit<CreateInteractionarticleDto, 'article_id' | 'user_id'>
    ) {
      const fullCreateDto = {
        ...createDto,
        article_id: idArticle,
        user_id: idVisiteur
      };
    return this.interactionarticleService.addLike(fullCreateDto);
  }
  

}

