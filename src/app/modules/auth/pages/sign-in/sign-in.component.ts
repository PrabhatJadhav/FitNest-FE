import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  rememberMe: boolean = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private apiService: ApiService,
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onRememberMeClick(event: any) {
    this.rememberMe = event.target.checked ?? false;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    this.apiService.get('/api/test').subscribe(
      (response) => {
        console.log('test response', response);
        // localStorage.setItem('token', response.token);  // Unsafe
        // this._router.navigate(['/']);
      },
      (error: any) => {
        console.log('error', error);
      },
    );

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.apiService.post('/api/v1/auth/login', { email, password }).subscribe(
      (response) => {
        console.log(response);
        // localStorage.setItem('token', response.token);  // Unsafe
        // this._router.navigate(['/']);
      },
      (error: any) => {
        console.log('error', error);
      },
    );

    // this._router.navigate(['/']);
  }
}
