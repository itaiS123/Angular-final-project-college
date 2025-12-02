import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'users', component: ListUsersComponent },
	{ path: 'add-user', component: EditUserComponent },
	{ path: 'edit/:id', component: EditUserComponent },
	{ path: '**', redirectTo: '/login' },
];
