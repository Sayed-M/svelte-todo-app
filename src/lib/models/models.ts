export interface IFolder {
    id: string;
    name: string;
    todos?: ITodo[];
}

export interface ITodo {
    name: string;
    description: string;
}