import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form-component',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-component.component.html',
  styleUrl: './task-form-component.component.scss'
})
export class TaskFormComponentComponent {


  successMessage: string = 'Form submitted successfully!';
  errorMessage: string = 'Form submission failed. Please try again.';

  taskForm =  new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();


  closeForm() {
    this.close.emit();
    this.resetForm();
  }


  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const raw = this.taskForm.value;

    const payload = {
      title: raw.title,
      description: raw.description,
      dueDate: raw.dueDate,
      priority: raw.priority,
      status: raw.status ?? 'todo'
    };

    this.save.emit(payload);
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset();
  }

  get title() {
    return this.taskForm.get('title') as FormControl;
  }

  get description() {
    return this.taskForm.get('description') as FormControl;
  }

  get dueDate() {
    return this.taskForm.get('dueDate') as FormControl;
  }

  get priority() {
    return this.taskForm.get('priority') as FormControl;
  }

  get status() {
    return this.taskForm.get('status') as FormControl;
  }
}
