import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


type taskStatus = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done';
  duedate: string;
  createdAt?: string;
}


@Component({
  selector: 'app-task-item-component',
  imports: [CommonModule],
  templateUrl: './task-item-component.component.html',
  styleUrl: './task-item-component.component.scss'
})

export class TaskItemComponentComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() changeStatus = new EventEmitter<{ task: Task, status: Task['status'] }>();

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task);
  }

  onChangeStatus(status: Task['status']) {
    this.changeStatus.emit({ task: this.task, status});
  }
}
