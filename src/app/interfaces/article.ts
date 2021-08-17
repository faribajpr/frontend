import { Category } from "./category";

export interface Article {
    id: number;
    title: string;
    slug:string;
    author: number;
    category: Category;
    content: string;
    description: string;
    image: {
        id:number;
        name: string;
    };
    created_at: string;
    published_at: string;
    publishedAt: string;
    updated_at: string;
}
