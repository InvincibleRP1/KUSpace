import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './dialogs/courses/courses.component';
import { FacultyComponent } from './dialogs/faculty/faculty.component';
import { SocietyComponent } from './dialogs/society/society.component';
import { MessagesComponent } from './dialogs/messages/messages.component';




@NgModule({
  declarations: [HeaderComponent, CoursesComponent, FacultyComponent, SocietyComponent, MessagesComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule, RouterModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
