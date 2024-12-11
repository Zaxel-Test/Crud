import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DataListService } from '../show-list/services/data-list.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-category',
  imports: [
    FormsModule,
    MatIconButton,
    MatIcon,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatSuffix,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf,
  ],
  templateUrl: './dialog-category.component.html',
  standalone: true,
  styleUrl: './dialog-category.component.scss',
})
export class DialogCategoryComponent {
  constructor(
    private service: DataListService,
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.isEditMode = data.isEditMode;
      this.custId = data.custId;
    }
  }

  addProduct = {
    custId: 0,
    name: '',
    mobile: '',
    emailid: '',
    address: '',
    button: '',
  };
  isEditMode!: boolean;
  custId!: number;

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getById(this.custId);
    }
  }

  submit() {
    this.service.postData(this.addProduct).subscribe((res: any) => {
      if (res.result) {
        this.matDialog.closeAll();
        alert('success');
      } else {
        alert(res.message);
      }
    });
  }

  getById(id: number) {
    this.service.getById(this.custId).subscribe((res: any) => {
      debugger;
      if (res.result) {
        this.addProduct.custId = res.data.custId;
        this.addProduct.address = res.data.address;
        this.addProduct.name = res.data.name;
        this.addProduct.mobile = res.data.mobile;
        this.addProduct.emailid = res.data.emailid;
      } else {
        alert(res.message);
      }
    });
  }

  put() {
    this.service.putData(this.addProduct).subscribe((res: any) => {
      if (res.result) {
        this.matDialog.closeAll();
        alert('success');
      } else {
        alert(res.message);
      }
    });
  }
}
