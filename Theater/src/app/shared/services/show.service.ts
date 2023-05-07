import { Injectable } from '@angular/core';
import { Show } from '../models/Show';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  collectionName: string = "Shows";

  constructor(
    private afs: AngularFirestore
  ) { }

  getShows() {
    return this.afs.collection<Show>(this.collectionName, ref => ref.orderBy('date', 'asc').limit(10)).valueChanges();
  }

  getShow(id: string) {
    return this.afs.collection<Show>(this.collectionName).doc(id).valueChanges();
  }
}
