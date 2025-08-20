import { Component, OnInit } from '@angular/core';
import { TaskFormComponentComponent } from '../task-form-component/task-form-component.component';
import { CommonModule } from '@angular/common';
import { TaskItemComponentComponent } from "../task-item-component/task-item-component.component";
import { Task } from '../task-item-component/task-item-component.component';

@Component({
  selector: 'app-task-list-component',
  imports: [TaskFormComponentComponent, CommonModule, TaskItemComponentComponent],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.scss'
})
export class TaskListComponentComponent implements OnInit {
  isOpen: boolean = false;
  storageKey: string = 'tasks';

  columns: Task['status'][] = ['todo', 'inprogress', 'done'];

  colLabels: Record<Task['status'], string> = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done'
  }

  tasks: Task[] = []
  grouped: Record<Task['status'], Task[]> = { todo: [], inprogress: [], done: []}

  ngOnInit(): void {
    this.tasks = this.loadTasksFromStorage();
    this.groupTasks();
  }

  groupTasks() {
    this.grouped = { todo: [], inprogress: [], done: []}
    for (const t of this.tasks) {
      this.grouped[t.status].push(t);
    }
  }

  saveTask(payload: any) {
    const status = payload?.status ?? 'todo';

    const task: Task = {
      id: (Date.now() + Math.floor(Math.random() * 1000)).toString(),
      title: payload?.title ?? 'Untitled',
      description: payload?.description ?? 'without desc',
      status,
      duedate: payload?.dueDate ?? payload?.duedate ?? ''
    }

    this.tasks.push(task);
    this.groupTasks();
    this.saveTasksToStorage();
    this.isOpen = false;
  }

  openEdit(task: Task) {
    console.log('edit', task);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.groupTasks();
    this.saveTasksToStorage();
  }

  updateTaskStatus(task: Task, status: Task['status']) {
    const idx = this.tasks.findIndex(t => t.id === task.id);

    if(idx > -1) {
      this.tasks[idx].status = status;
      this.groupTasks();
      this.saveTasksToStorage();
    }
  }

  trackById(_: number, t: Task) {
    return t.id;
  }

  openForm() {
    this.isOpen = true;
  }

  private loadTasksFromStorage(): Task[] {
    try {
        const raw = localStorage.getItem(this.storageKey);
        if(!raw) return this.defaultTasks();
        const parsed = JSON.parse(raw);
        if(!Array.isArray(parsed)) return this.defaultTasks();
        return parsed as Task[];
    } catch {
      return this.defaultTasks();
    }
  }

  private saveTasksToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch {
      // ignore sotrage Errors
    }
  }


    private defaultTasks(): Task[] {
    return [
      { id: '1', title: 'Buy groceries', status: 'todo', duedate: '' },
      { id: '2', title: 'Design UI', status: 'inprogress', duedate: '' },
      { id: '3', title: 'Deploy', status: 'done', duedate: '' },
    ];
  } 
}
