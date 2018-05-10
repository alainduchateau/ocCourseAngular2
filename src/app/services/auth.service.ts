import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve, reject } from 'q';

@Injectable()
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  siginInUser(email:string,password:string){
    return new Promise(
      (resolve, reject) =>{
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email,password).then(
          ()=>{
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(){
    firebase.auth().signOut();
  }
}
