import { Component , Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

//Interfaces
import { Product } from 'src/app/Interfaces/product';
//Service
import { ProductService } from 'src/app/Services/product.service';
import { HttpHeaders } from '@angular/common/http';
import { elementAt } from 'rxjs';


@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css'],
 
})


export class AddEditDialogComponent {
  [x: string]: any;

formProduct : FormGroup;
titleAction : string= "New";
buttonAction: string ="save";
  productList: Product[] = [];




constructor(
  private dialogReference : MatDialogRef<AddEditDialogComponent>,
  private fb: FormBuilder,
  private _snackBar: MatSnackBar,
  private productService : ProductService,
  @Inject(MAT_DIALOG_DATA) public dataProduct: Product


){
  this.formProduct = this.fb.group({
    
    name:["",Validators.required],
    description:["",Validators.required],
    price:["",Validators.required]
  

})

this.productService.getList().subscribe({
  next: (dataRes) => {
    this.productList =dataRes;
  },error(err) {
    console.log(err);
  },
})


}
  
  ProductsList(dataRes: Product[]) {
    this.productList = dataRes; // Assign the dataRes array to the products property.
  }
showAlert(message: string, action: string) {
  this._snackBar.open(message, action,{
    horizontalPosition:"center",
    verticalPosition:"top",
    duration:3000
  });

  

}


addEditProduct(){
  
  console.log(this.formProduct.value)
  let model : Product ={
    id:0,
    name:this.formProduct.value.name,
    price:this.formProduct.value.price,
    description:this.formProduct.value.description,
  }

  

  if(this.dataProduct == null){
    this.productService.add(model).subscribe({
      next:(resData )=>{
     this.dataProduct = resData;
        
       
        this.showAlert("Created!", "ok")
  
        this.dialogReference.close("created")
      
      
      }, error:(e)=>{
        this.showAlert("cant create item","error")
      }
    })
  }else  {
    this.productService.update(this.dataProduct.id, model).subscribe({
      next:(data)=>{
        this.showAlert("Updated!", "ok")
        this.dialogReference.close("updated")
      }, error:(e)=>{
        this.showAlert("cant update item","error")
      }
    })

    

   
  }



}
ngOnInit():void{
  if(this.dataProduct){
    this.formProduct.patchValue({
    
      name: this.dataProduct.name,
      price:this.dataProduct.price,
      description:this.dataProduct.description
    })
    this.titleAction = "Edit";
    this.buttonAction = "update";
  }
  
  
  }

}
