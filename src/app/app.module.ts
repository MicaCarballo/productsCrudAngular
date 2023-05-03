import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';


import {MatGridListModule} from '@angular/material/grid-list';
import { AddEditDialogComponent } from './modals/add-edit-dialog/add-edit-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './modals/delete-dialog/delete-dialog.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import {MatCard, MatCardModule} from '@angular/material/card';




const appRoutes : Routes =[
  { path: '', component: HomeComponent },
  {path:"product/:id", component:ProductComponent}
  
]




@NgModule({
  declarations: [
    AppComponent,
    
    AddEditDialogComponent,
         DeleteDialogComponent,
         HomeComponent
       
    
    
  
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
   MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    
    

    
    ],
    
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
