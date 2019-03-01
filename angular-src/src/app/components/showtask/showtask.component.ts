import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { Task } from '../../task';
@Component({
  selector: 'app-showtask',
  templateUrl: './showtask.component.html',
 //template: `<app-search [searchData]="data"></app-search>`,
 
  styleUrls: ['./showtask.component.css']
})
export class ShowtaskComponent implements OnInit {
tasks : Object;
search : Object;
data : Object;
  constructor(private authService:AuthService, private router:Router,private flashMessage: FlashMessagesService) { }


  ngOnInit() {
    this.getTask(this.search);
  }

 
  getTask(search)
  {
    this.authService.getTask(search).subscribe(tasks =>
      {
        this.tasks = tasks;
      })
  }

  ondeleteClick(task_id) {
    this.authService.deletetask(task_id).subscribe(data =>
      {
        if(data.success)
        {
        this.getTask(this.search); 
        }
        else
        {
        this.router.navigate(['/addtask']);
        }
       
      })
  }

  onSearchSubmit()
  {
    const search=this.search;
    console.log(search);
    this.authService.getTask(search).subscribe(tasks => {
      // if(data) {
        // console.log("In search user");
         console.log(tasks);
         this.tasks=tasks
           
    //   } else {
    //    console.log("Not in search user");
    //   }
    // });
    })
  }
  
   }

