import { Project } from '../models/Project';

const STORAGE_KEY = 'todo-projects';

export class ProjectRepository {
    getAll(): Project[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return parsed.map((p: any) => new Project(p.id, p.name, p.color));
        } catch {
            return [];
        }
    }

    saveAll(projects: Project[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    add(project: Project): void {
        const projects = this.getAll();
        projects.push(project);
        this.saveAll(projects);
    }

    update(updated: Project): void {
        const projects = this.getAll().map(project =>
            project.id === updated.id ? updated : project
        );
        this.saveAll(projects);
    }

    delete(projectId: string): void {
        const projects = this.getAll().filter(project => project.id !== projectId);
        this.saveAll(projects);
    }

    clearAll(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}
