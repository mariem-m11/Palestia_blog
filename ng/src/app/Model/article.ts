export class Article {
  id: number;
  title: string;
  content: string;
  date: Date;

  constructor(
    id: number = 1,
    title: string = 'Default Title',
    content: string = 'Default Content',
    date: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date;
  }
}
