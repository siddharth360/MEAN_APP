import { Component, OnInit , Input} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute} from '@angular/router';
import { Task} from '../../taskmodel';
@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  @Input() task: Task;
  constructor(private authService:AuthService,  private route : ActivatedRoute,private router:Router,  private flashMessage: FlashMessagesService) {  
  }
  ngOnInit(){
    this.getTask();
    
  }
  getTask(){
    var id = this.route.snapshot.params['_id'];
    this.authService.detailtask(id).subscribe(tasks=> {
    this.task = tasks;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  updateTask(id,info){
    var id = this.route.snapshot.params['_id'];
    this.authService.updateTask(id,this.task).subscribe( (tasks) => {
      this.router.navigate(['/showtask']);
    });
  }
}