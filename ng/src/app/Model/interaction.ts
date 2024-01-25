import { ReactionType } from "../enums/reaction-type";
export interface Interactionarticle{
    commentaire: string;
    reaction: ReactionType;
    note: number;
    article_id: number;
    user_id: number;
  }
