import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMassage:string|undefined;
  constructor(private product: ProductService){ }

  ngOnInit(): void {
    
  }

  submit(data: Product){
    //console.log(data);
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.addProductMassage="product is added succesfully";
      }
      setTimeout(()=>(this.addProductMassage=undefined),3000);
    });
  }

}
