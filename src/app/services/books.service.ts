import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';
import { Resolve } from '@angular/router';
import { reject } from 'q';


@Injectable()
export class BooksService {

  constructor(){}
  
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook:Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book:Book){
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove =  this.books.findIndex(
      (bookE1)=>{
        if(bookE1 === book){
          return true
        }
      }
    );
    this.books.splice(bookIndexToRemove,1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file:File){
  
    return new Promise(
      (resolve,reject) => {
        const almostUniqueFilename = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('images/'+almostUniqueFilename+file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          console.log('chargment...');
        },
      (error)=>{
            console.log('Erreur de chargement ! : grumf '+ error);
            reject();
      },
        ()=>{
            resolve(upload.snapshot.downloadURL);
          }
        );

      }
    )

  }

}