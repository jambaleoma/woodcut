import { Utensil } from './../model/utensil.model';
import { Tool } from './../model/tool.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public toolChange$: BehaviorSubject<Tool> = new BehaviorSubject<Tool>(null);
  public utensilChange$: BehaviorSubject<Utensil> = new BehaviorSubject<Utensil>(null);

  constructor() { }

  sendIsToolChange(tool: Tool) {
    this.toolChange$.next(tool);
  }

  getIsToolChange() {
    return this.toolChange$.asObservable();
  }

  sendIsUtensilChange(utensil: Utensil) {
    this.utensilChange$.next(utensil);
  }

  getIsUtensilChange() {
    return this.utensilChange$.asObservable();
  }
}
