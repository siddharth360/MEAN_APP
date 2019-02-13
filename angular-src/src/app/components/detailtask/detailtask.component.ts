import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute} from '@angular/router';
import {Task} from '../../taskmodel';
 

@Component({
  selector: 'app-detailtask',
  templateUrl: './detailtask.component.html',
  styleUrls: ['./detailtask.component.css']
})
export class DetailtaskComponent implements OnInit {
 
   task: Object;
   errorMessage = '';
  constructor(private authService:AuthService,private route : ActivatedRoute,  private router:Router,  private flashMessage: FlashMessagesService) { }
  
  // ngOnInit() {
  //   var id = this.route.snapshot.params['_id'];
  //   console.log(id);
  //   this.authService.detailtask(id).subscribe(tasks=> {
  //     this.task = tasks.task;
  //   },
  //    err => {
  //      console.log(err);
  //      return false;
  //    });
  // }

  ngOnInit() {
    var param = this.route.snapshot.params['_id'];
    if (param) {
      const id = param;
      this.detailtask(id);
    }
  }

  detailtask(id) {
    console.log("vars" + id);
    this.authService.detailtask(id).subscribe(tasks=> {
          this.task = tasks;
          // console.log("dgfggfg " +  JSON.stringify(tasks[0].taskName));
        },
         err => {
           console.log(err);
           return false;
         });
  }




}


