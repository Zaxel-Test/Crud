import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DataListService } from '../services/data-list.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-customer',
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
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-customer.component.html',
  standalone: true,
  styleUrl: './dialog-customer.component.scss',
})
export class DialogCustomerComponent {
  isEditMode!: boolean;
  custId!: number;
  cusomerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

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

  ngOnInit(): void {
    if (this.isEditMode) {
      this.cusomerForm.addControl('custId', new FormControl());
      this.getById(this.custId);
    }
  }

  submit() {
    this.service.postData(this.cusomerForm.value).subscribe((res: any) => {
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
      if (res.result) {
        this.cusomerForm.patchValue({
          custId: res.data.custId,
          address: res.data.address,
          name: res.data.name,
          mobile: res.data.mobile,
          email: res.data.emailid,
        });
      } else {
        alert(res.message);
      }
    });
  }

  put() {
    this.service.putData(this.cusomerForm.value).subscribe((res: any) => {
      if (res.result) {
        this.matDialog.closeAll();
        alert('success');
      } else {
        alert(res.message);
      }
    });
  }
}
