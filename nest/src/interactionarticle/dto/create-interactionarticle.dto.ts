import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ReactionType } from '../../enums/reaction-type';

export class CreateInteractionarticleDto {
    @IsOptional()
    @IsString()
    commentaire: string;

    @IsOptional()
    @IsEnum(ReactionType)
    reaction: ReactionType;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    note: number;

    article_id: number;

    user_id: number;


}
