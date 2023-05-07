import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.email.addValidators([Validators.required]);
    this.password.addValidators([Validators.required]);
  }

  async login() {
    this.loading = true;

    let promise = this.authService.login(this.email.value as string, this.password.value as string);
    promise.then((userCredential: any) => {
      console.log(userCredential);
      this.router.navigateByUrl('/home');
    }).catch((error: any) => {
      console.error("Login failed.");
      this.loading = false;
    }).finally(() => {
      console.log('finally');
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
