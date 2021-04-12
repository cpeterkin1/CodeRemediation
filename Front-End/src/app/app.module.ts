import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user-components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/user-components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApplicationDashboardComponent } from './components/dashboards/application-dashboard/application-dashboard.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-components/user-profile/user-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppDialogComponent } from './components/dialogs/app-dialog/app-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DetailsDialogComponent } from './components/dialogs/details-dialog/details-dialog.component';
import { ModifyDialogComponent } from './components/dialogs/modify-dialog/modify-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UserDashboardComponent,
    ApplicationDashboardComponent,
    UserProfileComponent,
    AppDialogComponent,
    DetailsDialogComponent,
    ModifyDialogComponent
  ],
  entryComponents: [AppDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule.forRoot([{
      path: '' , redirectTo:'/login',pathMatch:'full'
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
