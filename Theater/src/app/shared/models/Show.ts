import { Comment } from "./Comment";

export interface Show {
  id: string;
  title: string;
  date: string;
  description: string;
  comments: Comment[];
}
