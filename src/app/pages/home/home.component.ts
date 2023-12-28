import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts: undefined | Product[];
  trendyProduct: undefined | Product[];

  constructor( private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      //console.log(data);
      this.popularProducts=data;
    });

    this.product.treandyProducts().subscribe((data)=>{
      this.trendyProduct=data;
    })
  }
}
