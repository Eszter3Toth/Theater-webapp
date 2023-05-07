import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.signUpForm.get('email')?.addValidators([Validators.email, Validators.required]);
    this.signUpForm.get('password')?.addValidators([Validators.required, Validators.minLength(6)]);
    this.signUpForm.get('rePassword')?.addValidators([Validators.required, Validators.minLength(6)]);
    this.signUpForm.get('name.firstname')?.addValidators([Validators.required]);
    this.signUpForm.get('name.lastname')?.addValidators([Validators.required]);
  }

  onSubmit() {
    let form =this.signUpForm;
    console.log(form.value);
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      let promise = this.authService.signup(form.get('email')?.value  as string, form.get('password')?.value as string)
      promise.then((cred) => {
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          email: cred.user?.email as string,
          username: cred.user?.email?.split('@')[0] as string,
          name: {
            firstname: form.get('name.firstname')?.value as string,
            lastname: form.get('name.lastname')?.value as string
          }
        };
        console.log(user);

        this.userService.create(user).then((_) => {
          console.log('User created.');
        }).catch((error) => {
          console.log(error);
        });
      }).then((error) => {
        console.log(error);
      });
    }

  }

  goBack() {
    this.location.back();
  }

}
