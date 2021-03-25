import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CoursesComponent } from 'src/app/shared/dialogs/courses/courses.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(){
    
  
  }
  openDialog() {
    const dialogRef = this.dialog.open(CoursesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



