import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BtnCardComponent } from './btn-card/btn-card.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        BtnCardComponent,
        ItemEditComponent
    ],
    exports: [
        BtnCardComponent,
        ItemEditComponent
    ],
    entryComponents: [

    ],
})
export class ComponentsModule {}
