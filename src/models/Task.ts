import { Priority } from './Priority';
import { Project } from './Project';

export class Task {
    constructor(
        public id: string,
        public title: string,
        public description: string = '',
        public completed: boolean = false,
        public priority: Priority = Priority.Medium,
        public dueDate: string | null = null,
        public project: Project | null = null,
        public createdAt: string = new Date().toISOString()
    ) {}
}
