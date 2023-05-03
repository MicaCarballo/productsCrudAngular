import { Component, OnInit } from '@angular/core';
import { Inject
 } from '@angular/core';
 import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})


export class DeleteDialogComponent implements OnInit{

constructor(
  private dialogReference : MatDialogRef<DeleteDialogComponent>,
  private productService : ProductService,
  private _snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public dataProduct: Product
){

}
ngOnInit():void{

}

showAlert(message: string, action: string) {
  this._snackBar.open(message, action,{
    horizontalPosition:"center",
    verticalPosition:"top",
    duration:3000
  });

  

}


confirmDelete(){
  let login ="";
  if(this.dataProduct){
    this.productService.delete(this.dataProduct.id).subscribe({
      next: (data) => {
        
       
        this.dialogReference.close("deleted")
        
      },
      error: (e) => 
      
      {console.log(e);
        this.showAlert(e.statusText, "Error");
      }
    });
    
    //this.dialogReference.close("deleted")

    
  }
}
}
