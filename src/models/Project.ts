export class Project {
    constructor(
        public id: string,
        public name: string,
        public color: string = '#2196f3' // по умолчанию синий, можно как у Todoist
    ) {}
}
