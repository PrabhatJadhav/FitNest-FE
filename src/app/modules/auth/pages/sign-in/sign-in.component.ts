import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LOCALSTORAGE_CONSTANTS } from 'src/app/core/constants/local-storage.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LOGIN_API } from 'src/app/core/constants/api-routes';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { GENERAL_ERROR, INVALID_FORM_ERROR, NO_SESSION_ERROR } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  rememberMe: boolean = false;
  passwordTextType!: boolean;
  loading: boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this._router.navigate(['/']);
      this.toasterService.showError(NO_SESSION_ERROR);
      return;
    }

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

    // stop here if form is invalid
    if (this.form.invalid) {
      this.toasterService.showError(INVALID_FORM_ERROR);
      return;
    }

    this.loading = true;
    this.form?.disable();

    this.apiService.post(LOGIN_API, { email, password }).subscribe(
      (response) => {
        console.log(response);
        if (response?.token && response?.refreshToken) {
          this.authService.setRefreshToken(response.refreshToken);
          this.authService.setToken(response.token);
          this._router.navigate(['/']);
          this.loading = false;
          this.form?.enable();
        } else {
          this.toasterService.showError(GENERAL_ERROR);
          this.loading = false;
          this.form?.enable();
          // Handle error
        }
      },
      (error: any) => {
        console.log('error', error);
        this.toasterService.showError(error?.errorMessage ?? GENERAL_ERROR);
        this.loading = false;
        this.form?.enable();
        // Handle error
      },
    );

    // this._router.navigate(['/']);
  }
}
