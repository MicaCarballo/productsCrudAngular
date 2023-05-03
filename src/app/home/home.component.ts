import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';


import {MatGridListModule} from '@angular/material/grid-list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Product } from '../Interfaces/product'; 
import { ProductService } from '../Services/product.service'; 
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '../modals/add-edit-dialog/add-edit-dialog.component'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../modals/delete-dialog/delete-dialog.component'; 
import { NavigationExtras, Router } from '@angular/router';

export interface ProductsList {
  id: number
  name: string;
 
  price: number;
  description: string;
}
const ELEMENT_DATA: ProductsList[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private ProductService : ProductService,
    public dialog : MatDialog,
    private _snackBar :MatSnackBar,
    private router: Router
   
    ){}

    showProducts(){
      this.ProductService.getList().subscribe({
        next:(dataRes: ProductsList[])=>{
          console.log(dataRes)
          this.data = dataRes
        },error:(e: any)=>{
         console.log(e);
         
        }
  
        
        
      })
    }
    navigateToProductDetails(element: { id: string; }) {
      const navigationExtras: NavigationExtras = {
        queryParams: { product: JSON.stringify(element) },
        skipLocationChange: true // set this option to true to skip updating the browser URL
      };
      this.router.navigate(['/product', element.id], navigationExtras);
    }
    openDialog() {
      this.dialog.open(AddEditDialogComponent,{
        disableClose:true,
        width:"400px"
        
        
  
      }).afterClosed().subscribe(result =>{
        if(result == "created"){
          this.showProducts()
        }
      });
    }
  
    showAlert(message: string, action: string) {
      this._snackBar.open(message, action,{
        horizontalPosition:"center",
        verticalPosition:"top",
        duration:3000
      });
    
      
    
    }
  
    
  
  
    title = 'products-app';
    displayedColumns: string[] = ['name', 'price', 'description', 'actions' ];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: ProductsList[] = ELEMENT_DATA;
  
   
  
   ngOnInit(): void {
     this.showProducts()
   }
  
   editProductDialog(dataProduct: Product) {
    this.dialog.open(AddEditDialogComponent,{
      disableClose:true,
      data:dataProduct,
      width:"400px"
      
      
  
    }).afterClosed().subscribe(result =>{
      if(result == "updated"){
        this.showProducts()
      }
    });
  
  }
  
  deleteProductDialog(dataProduct: Product) {
    this.dialog.open(DeleteDialogComponent, {
      disableClose: true,
      data: dataProduct
    }).afterClosed().subscribe(result => {
      if (result == "deleted") {
        this.showAlert("Product was deleted", "Success");
        this.showProducts();
      }
    });
  }
  

 
}
