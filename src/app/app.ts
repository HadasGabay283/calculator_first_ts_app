import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Com1 } from "./com1/com1";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Com1],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('my-app');
  constructor() {
    console.log('App component initialized');
  }

}
