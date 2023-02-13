export interface IFolder {
    id: string;
    name: string;
    activeTodos: ITodo[];
    completedTodos: ITodo[];
}

export interface ITodo {
    id: string;
    name: string;
    description: string;
    isCompleted?: boolean;
}