import { Component, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DataListService } from './services/data-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { Subscription } from 'rxjs';

export interface ICustomer {
  custId: number;
  name: string;
  mobile: number;
  emailid: number;
  address: string;
}

@Component({
  selector: 'app-show-list',
  imports: [MatButtonModule, MatTableModule],
  standalone: true,
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss',
  providers: [DataListService],
})
export class ShowListComponent implements OnDestroy {
  dataProducts: ICustomer[] = [];

  constructor(
    public service: DataListService,
    private Dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  productSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.getProducts();
  }

  displayedColumns: string[] = [
    'custId',
    'name',
    'mobile',
    'emailid',
    'address',
    'button',
  ];

  getProducts() {
    this.productSubscription = this.service.getData().subscribe((res: any) => {
      this.dataProducts = res.data;
    });
  }

  //@ViewChild(MatTable) table!: MatTable<IProducts>;

  openDialog() {
    this.Dialog.open(DialogCategoryComponent, {
      width: '350px',
    });
  }

  onEdit(custId: number) {
    this.Dialog.open(DialogCategoryComponent, {
      data: { custId: custId, isEditMode: true },
      width: '350px',
    });
  }

  onDelete(custId: number) {
    const OnDelete = confirm('hazf shavad?');
    if (OnDelete) {
      this.service.deleteData(custId).subscribe((res: any) => {
        if (res.result) {
          alert('success');
        } else {
          alert(res.message);
        }
      });
      this.getProducts();
    }
  }
}
