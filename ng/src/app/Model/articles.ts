export interface Article {
    id: number;
    title: string;
    content: string;
    date: Date;
    likes?: number;
    dislikes?: number;
    dislikePercentage?: number;
    likePercentage?: number;
    gnote?: number;
    // Other properties as needed
  }