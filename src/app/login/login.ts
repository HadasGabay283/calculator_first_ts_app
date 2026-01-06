import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  user$;
  email = signal('');
  password = signal('');

  private returnUrl: string | null = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user$ = this.auth.user$;
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  // signInGoogle implemented below with redirect handling
  signOut() { this.auth.signOut().catch(e => console.error(e)); }

  async signInEmail() {
    try {
      await this.auth.signInWithEmail(this.email(), this.password());
      if (this.returnUrl) await this.router.navigateByUrl(this.returnUrl);
    } catch (e) { console.error(e); }
  }

  async registerEmail() {
    try {
      await this.auth.registerWithEmail(this.email(), this.password());
      if (this.returnUrl) await this.router.navigateByUrl(this.returnUrl);
    } catch (e) { console.error(e); }
  }

  async signInGoogle() {
    try {
      await this.auth.signInWithGoogle();
      if (this.returnUrl) await this.router.navigateByUrl(this.returnUrl);
    } catch (e) { console.error(e); }
  }
}
