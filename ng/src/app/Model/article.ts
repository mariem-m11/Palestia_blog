export interface Article {
  id: number;
  title: string;
  content: string;
  date: Date;
  likes?: number;
  dislikes?: number;
  // Other properties as needed
}
