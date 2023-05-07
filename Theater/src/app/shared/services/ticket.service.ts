import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ticket } from '../models/Ticket';
import { Show } from '../models/Show';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  collectionName: string = "Tickets";

  constructor(private afs: AngularFirestore) {

  }

  getSpecific(show_id: string, user_id: string): Observable<firebase.default.firestore.QuerySnapshot<Ticket>> {
    return this.afs.collection<Ticket>(this.collectionName, ref => ref.where('show_id', '==', show_id).where('user_id', '==', user_id).limit(1)).get();
  }

  getAllForUser(user_id: string) {
    return this.afs.collection<Ticket>(this.collectionName, ref => ref.where('user_id', '==', user_id)).valueChanges();
  }

  getAll() {
    return this.afs.collection<Ticket>(this.collectionName).valueChanges();
  }

  addTicket(show: Show, user: User) {
    let ticket: Ticket = {
      id: this.afs.createId(),
      show_id: show.id,
      user_id: user.id,
      number: 1,
    }
    return this.afs.collection<Ticket>(this.collectionName).doc(ticket.id).set(ticket);
  }

  update(ticket: Ticket) {
    return this.afs.collection<Ticket>(this.collectionName).doc(ticket.id).update(ticket);
  }

  delete(id: string) {
    return this.afs.collection<Ticket>(this.collectionName).doc(id).delete();
  }
}
