import { Injectable } from '@angular/core';
import { Subject, scan, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messagesInput!: Subject<Command>;
  messagesOutput!: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      // * NOTE: acc, value is the convention
      scan((messages: Command[], messageContent: Command) => {
        if(messageContent.type === 'clear'){
          return messages.filter((message: { id: number; }) => message.id != messageContent.id)
        } else{
          return [...messages, messageContent];
        }
      }, [])
    );
  }
  getMessages(){

  }

  addSuccess(message: string){
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'success'
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 3000);
  }

  addError(message: string){
    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type: 'error'
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 3000);
  }

  clearMessage(id: number){
    this.messagesInput.next({
      id: id,
      type: 'clear'
    });
  }

  private randomId(){
    return Math.round(Math.random() * 10000);
  }

}

export interface Command{
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}