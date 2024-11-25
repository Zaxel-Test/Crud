import { Component, ViewChild } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { DataListService } from './services/data-list.service';


export interface IProducts{
  productId: number;
  productName:string;
  unitPrice:number;
  categoryId:number;
  categoryName:string;
  supplierId:number;
  supplierName:string
}

@Component({
  selector: 'app-show-list',
  imports: [MatButtonModule, MatTableModule],
  standalone:true,
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss',
  providers:[DataListService]
})


export class ShowListComponent {
  dataProducts:IProducts[]=[]
  constructor(public service:DataListService){}
  ngOnInit(){
    this.getProducts();
  }
  displayedColumns: string[] = ['productId', 'productName', 'unitPrice', 'categoryId','categoryName','supplierId','supplierName'];
  getProducts(){
    this.service.getData().subscribe((res:any)=>{
      this.dataProducts = res
    })
  }
  @ViewChild(MatTable) table!: MatTable<IProducts>;

}
