export interface IFolder {
    id: string;
    name: string;
    todos: ITodo[];
}

export interface ITodo {
    id: string;
    name: string;
    description: string;
    isCompleted?: boolean;
}