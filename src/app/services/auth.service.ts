import { Injectable } from '@angular/core';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, user => this.userSubject.next(user));
  }

  async signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  async registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async sendPasswordReset(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  async signOut() {
    return signOut(auth);
  }

  get currentUser() {
    return this.userSubject.value;
  }
}