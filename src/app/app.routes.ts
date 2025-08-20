import { Routes } from '@angular/router';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: 'todo', component: TaskListComponentComponent},
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent}
];
