import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AppBarComponent} from "../app-bar/app-bar.component";
import {Task, TaskService} from "../service/task.service";
import {AuthService} from "../service/auth.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AppBarComponent,
    MatCheckbox,
    MatIcon,
    MatFormField,
    MatInputModule,
    MatButton,
    FormsModule,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  taskList: Array<Task> = [];
  description = "";
  isLoading=true;

  constructor(titleService: Title,
              private authService: AuthService,
              protected taskService: TaskService) {
    titleService.setTitle("To-do List App");
    taskService.getTasks(authService.getPrincipalEmail()!)
      .subscribe(taskList =>
      {
        this.isLoading=false,
        this.taskList = taskList,
        this.taskList.sort(
          (task1:Task,task2:Task)=>{
            if(task1.timestamp.toMillis()<task2.timestamp.toMillis())
              return 1
            else if(task1.timestamp.toMillis() === task2.timestamp.toMillis())
              return 0
            else
              return  -1;
          }
        )

      });
  }

  addTask(txt: HTMLInputElement) {
    if (!this.description.trim().length) {
      txt.select();
      txt.focus();
      return;
    } else {
      try {
        this.taskService.createNewTask(this.description, this.authService.getPrincipalEmail()!);
        this.description = "";
      } catch (e) {
        console.log(e);
        alert("Failed to save the Task, try again!");
      }

    }
  }
}
