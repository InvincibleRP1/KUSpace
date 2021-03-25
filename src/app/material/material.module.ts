import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';


const MaterialComponent = [ MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatRadioModule, MatGridListModule, MatDialogModule, MatProgressSpinnerModule, MatMenuModule,MatStepperModule, MatTableModule]


@NgModule({
  
  imports: [MaterialComponent, CommonModule],

  exports: [MaterialComponent]
})
export class MaterialModule { }
