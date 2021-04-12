import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/user-components/register/register.component';
import { LoginComponent } from './components/user-components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { ApplicationDashboardComponent } from './components/dashboards/application-dashboard/application-dashboard.component';
import { UserProfileComponent } from './components/user-components/user-profile/user-profile.component';


const routes: Routes = [{path: 'home', component: HomeComponent},
                        {path: 'register', component: RegisterComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'userDash', component: UserDashboardComponent},
                        {path: 'appDash', component: ApplicationDashboardComponent},
                        {path: 'profile', component: UserProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
