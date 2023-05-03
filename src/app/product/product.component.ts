import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: any;

constructor(
  private router: Router,
  private route:ActivatedRoute,
  

){
 
}



ngOnInit() {
  this.route.queryParams.subscribe(params => {
    
    this.product = JSON.parse(params['product']);
  });
}

}
