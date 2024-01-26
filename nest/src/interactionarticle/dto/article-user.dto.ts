import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ArticleUserDto {

    @IsInt()
    article_id: number;

    @IsInt()
    user_id: number;


}
