import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collectionData, deleteDoc, doc, Firestore, where } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { collection, orderBy, query } from 'firebase/firestore';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { Tool } from '../model/tool.model';
import { Utensil } from '../model/utensil.model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  currentUser: User = null;

  constructor(
    private afAuth: Auth,
    private firestore: Firestore,
    public loadingService: LoadingService,
  ) {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user as User;
    });
  }

  getToolsData() {
    const toolsRef = collection(this.firestore, 'Tool');
    const q = query(toolsRef, where('userUID', '==', this.currentUser.uid), orderBy('name'));
    return collectionData(q, {idField: 'id'}) as Observable<Tool[]>;
  }

  getUtensilsData() {
    const utensilRef = collection(this.firestore, 'Utensil');
    const q = query(utensilRef, where('userUID', '==', this.currentUser.uid), orderBy('name'));
    return collectionData(q, {idField: 'id'}) as Observable<Utensil[]>;
  }

  addUtensil(utensil: Utensil) {
    const utensilDocRef = collection(this.firestore, 'Utensil');
    utensil.userUID = this.currentUser.uid;
    return addDoc(utensilDocRef, utensil);
  }

  addTool(tool: Tool) {
    const toolDocRef = collection(this.firestore, 'Tool');
    tool.userUID = this.currentUser.uid;
    return addDoc(toolDocRef, tool);
  }

  deleteTool(tool: Tool) {
    const toolDocRef = doc(this.firestore, `Tool/${tool.id}`);
    deleteDoc(toolDocRef);
  }

  deleteUtensil(utensil: Utensil) {
    const utensilDocRef = doc(this.firestore, `Utensil/${utensil.id}`);
    deleteDoc(utensilDocRef);
  }
}
