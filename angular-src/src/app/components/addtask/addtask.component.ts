import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  taskid: Number;
  taskname: String;
  taskdescription: String;
  taskhandler: String;
  taskclientname: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onTaskSubmit() {
    const task = {
      taskid: this.taskid,
      taskname: this.taskname,
      taskdescription: this.taskdescription,
      taskhandler: this.taskhandler,
      taskclientname: this.taskclientname
    }

    // Add task
    this.authService.addTask(task).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
  });
  }
}
