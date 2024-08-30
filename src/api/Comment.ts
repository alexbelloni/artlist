export type Comment = {
    id: number;
    name: string;
    email: string;
    text: string;
}

export type CommentOnForm = Partial<Comment>