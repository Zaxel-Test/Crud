import { Component, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DataListService } from '../services/data-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomerComponent } from '../dialog-customer/dialog-customer.component';
import { Subscription } from 'rxjs';
import { UpperCasePipe } from '../pipe/upper-case.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

export interface ICustomer {
  custId: number;
  name: string;
  mobile: number;
  emailid: number;
  address: string;
}

@Component({
  selector: 'app-show-list',
  imports: [MatButtonModule, MatTableModule, UpperCasePipe, HighlightDirective],
  standalone: true,
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss',
  providers: [DataListService],
})
export class ShowListComponent implements OnDestroy {
  dataCustomers: ICustomer[] = [];

  constructor(
    public service: DataListService,
    private Dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  customerSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.getCustomers();
  }

  displayedColumns: string[] = [
    'custId',
    'name',
    'mobile',
    'emailid',
    'address',
    'button',
  ];

  getCustomers() {
    this.customerSubscription = this.service.getData().subscribe((res: any) => {
      this.dataCustomers = res.data;
    });
  }

  //@ViewChild(MatTable) table!: MatTable<IProducts>;

  openDialog() {
    this.Dialog.open(DialogCustomerComponent, {
      width: '350px',
    });
  }

  onEdit(custId: number) {
    const dialogRef = this.Dialog.open(DialogCustomerComponent, {
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
      this.getCustomers();
    }
  }
}
