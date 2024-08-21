export class Post {
  _id?: string;
  title: string;
  content: string;
  date?: Date;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.date = new Date();
  }
}
