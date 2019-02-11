import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-showtask',
  templateUrl: './showtask.component.html',
  styleUrls: ['./showtask.component.css']
})
export class ShowtaskComponent implements OnInit {
//  task: Array<Object>;
//  tasks : Task;
tasks : Object;
  constructor(private authService:AuthService, private router:Router,private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.getTask();
  }

 
  getTask()
  {
    this.authService.getTask().subscribe(tasks =>
      {
        this.tasks = tasks;
      })
  }
}
