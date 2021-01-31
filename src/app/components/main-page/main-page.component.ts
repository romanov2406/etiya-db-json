import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { IUser } from './../../shared/interfaces/user.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  users: IUser[] = [];
  editForm: FormGroup;
  modalRef: BsModalRef;
  user: IUser;
  constructor(private authService: AuthService, private modalService: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getStaticUsers();
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(6)]],
      addressType: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', [Validators.required, Validators.minLength(6)]],
      postalCode: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getStaticUsers(): void {
    this.authService.getJSONUsers().pipe(take(1)).subscribe(
      data => this.users = data
    );
  }

  deleteUser(user: IUser): void {
    this.authService.deleteJSONUser(user.id).pipe(take(1)).subscribe(
      () => {
        this.getStaticUsers();
      },
      err => console.log(err)
    );
  }

  edit(user: IUser): void {
    this.user = user
    this.editForm.controls.firstName.setValue(user.firstName);
    this.editForm.controls.lastName.setValue(user.lastName);
    this.editForm.controls.userName.setValue(user.userName)
    this.editForm.controls.phone.setValue(user.phone)
    this.editForm.controls.email.setValue(user.email)
    this.editForm.controls.addressType.setValue(user.addressType)
    this.editForm.controls.address.setValue(user.address)
    this.editForm.controls.city.setValue(user.city)
    this.editForm.controls.postalCode.setValue(user.postalCode)
  }

  saveUser(): void {
    this.user.firstName = this.editForm.controls.firstName.value
    this.user.lastName = this.editForm.controls.lastName.value
    this.user.userName = this.editForm.controls.userName.value
    this.user.phone = this.editForm.controls.phone.value
    this.user.email = this.editForm.controls.email.value
    this.user.addressType = this.editForm.controls.addressType.value
    this.user.address = this.editForm.controls.address.value
    this.user.city = this.editForm.controls.city.value
    this.user.postalCode = this.editForm.controls.postalCode.value
    this.authService.updateJSONUser(this.user).pipe(take(1)).subscribe(
      () => {
        this.getStaticUsers()
      },
      err => console.log(err)
    );
  }
}
