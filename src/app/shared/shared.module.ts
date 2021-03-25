import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './dialogs/courses/courses.component';




@NgModule({
  declarations: [HeaderComponent, CoursesComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule, RouterModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
