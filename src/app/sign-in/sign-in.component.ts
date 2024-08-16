import {Component} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(protected authService: AuthService,
              titleService: Title) {
    titleService.setTitle("Sign In - To-do List App");
  }
}
