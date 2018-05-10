import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    const config = {
      apiKey: "AIzaSyAyl85HzHDPYuxWAHEcHYKRNJ7JeCT2zYs",
      authDomain: "occourseangular2.firebaseapp.com",
      databaseURL: "https://occourseangular2.firebaseio.com",
      projectId: "occourseangular2",
      storageBucket: "occourseangular2.appspot.com",
      messagingSenderId: "197884554989"
    };
    firebase.initializeApp(config);
  }
}
