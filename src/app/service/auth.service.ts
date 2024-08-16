import {Injectable} from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  GithubAuthProvider
} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private initialized = false;
  private user: User | null = null;

  constructor(private auth: Auth, routerService: Router) {
    authState(auth).subscribe(
      (user: User | null) => {
        this.user = user;
        this.initialized = true;
        if (user) {
          routerService.navigateByUrl("/");
        } else {
          routerService.navigateByUrl("/sign-in");
        }
      });
  }

  isInitialized() {
    return this.initialized;
  }

  getPrincipal() {
    return this.user;
  }

  signInWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signInWithGitHub() {
    signInWithPopup(this.auth, new GithubAuthProvider());
  }

  signOut() {
    signOut(this.auth);
  }

  getPrincipalEmail() {
    return this.user?.email ?? this.user?.providerData?.at(0)?.email;
  }

}
