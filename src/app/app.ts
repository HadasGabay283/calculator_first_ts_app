import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// Com1 and LoginComponent are used via the router, not directly in the App template
import { AuthService } from './services/auth.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  user$;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  signIn() { this.auth.signInWithGoogle(); }
  signOut() { this.auth.signOut(); }
}
