import { Router } from '@angular/router';
import { User } from './../model/user.model';
import { Platform, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LockedPage } from '../locked/locked.page';
import { Auth, signInAnonymously, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  loogoutTimer = new BehaviorSubject(0);
  currentUser: User = null;
  auth$: BehaviorSubject<UserCredential> = new BehaviorSubject<UserCredential>(null);

  constructor(
    private afAuth: Auth,
    private firestore: Firestore,
    private router: Router
    ) {}

  async singUp(email: string, password: string, name: string) {
    const credential = await createUserWithEmailAndPassword(
      this.afAuth,
      email,
      password
    );

    const uid = credential.user.uid;

    const userDocRef = doc(this.firestore, `users/${uid}`);

    return setDoc(userDocRef, {
      uid,
      email: credential.user.email,
      displayName: name
    });
  }

  async signIn(email: string, password: string) {
    this.auth$.next(await signInWithEmailAndPassword(this.afAuth, email, password));
  }

  signInwithBiometricAuth() {
    return signInAnonymously(this.afAuth);
  }

  signOut() {
    return signOut(this.afAuth);
  }

  logout(): void {
    this.auth$.next(null);
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/');
  }

  get isLogged$(): Observable<boolean> {
    return this.auth$.pipe(
      map(value => !!value.user)
    );
  }

  get email$(): Observable<string> {
    return this.auth$.pipe(
      map(auth => auth?.user.email)
    );
  }

  get token$(): Observable<Promise<string>> {
    return this.auth$.pipe(
      map(auth => auth?.user.getIdToken())
    );
  }

  get displayName$(): Observable<string> {
    return this.auth$.pipe(
      map(auth => auth?.user.displayName)
    );
  }

  get userUid$(): Observable<string> {
    return this.auth$.pipe(
      map(auth => auth?.user.uid)
    );
  }
}
