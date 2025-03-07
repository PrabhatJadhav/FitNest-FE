import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LOCALSTORAGE_CONSTANTS } from 'src/app/core/constants/local-storage.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LOGIN_API, REFRESH_TOKEN_API } from 'src/app/core/constants/api-routes';
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
  passwordTextType!: boolean;
  loading: boolean = false;
  hidePasswordField: boolean = false;
  isRefreshTokenSignIn: boolean = false;
  refreshTokenValue: string = '';

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
      return;
    }

    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    const refreshToken = localStorage.getItem(LOCALSTORAGE_CONSTANTS.REFRESH_TOKEN) ?? null;
    const user: any = this.authService.getUserObject();

    if (refreshToken && user?.id) {
      this.hidePasswordField = true;
      this.isRefreshTokenSignIn = true;
      this.refreshTokenValue = refreshToken;

      this.toggleFieldEnableDisable('password', true);
      this.patchFieldValue('email', user?.email);
      this.patchFieldValue('rememberMe', true);
    }

    this.form?.valueChanges?.subscribe((values) => {
      // console.log('Form changed:', values);
      console.log('Form:', this.form);

      if (!this.form?.pristine) {
        this.isRefreshTokenSignIn = false;
        this.hidePasswordField = false;
        this.toggleFieldEnableDisable('password', false);
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleFieldEnableDisable(fieldName: string, disable: boolean): void {
    if (disable) {
      this.form?.controls[fieldName]?.disable();
    } else {
      this.form?.controls[fieldName]?.enable();
    }
  }

  patchFieldValue(fieldName: string, value: any): void {
    this.form?.controls[fieldName]?.patchValue(value);
  }

  setFormValues(values: any): void {
    this.form?.setValue(values);
  }

  signInWithRefreshToken() {
    try {
      this.apiService.post(REFRESH_TOKEN_API, { refreshToken: this.refreshTokenValue }).subscribe(
        (response) => {
          // console.log(response);
          if (response?.token && response?.refreshToken) {
            this.handleAuthRequestResponse(response, false);
          } else {
            this.toasterService.showError(GENERAL_ERROR);
            this.loading = false;
            this.form?.enable();
            // Handle error
          }
        },
        (error: any) => {
          console.log('error', error);
          this.toasterService.showError(error?.error?.message ?? GENERAL_ERROR);
          this.loading = false;
          this.form?.enable();
          // Handle error
        },
      );
    } catch (e) {
      console.debug('e', e);
      this.toasterService.showError(GENERAL_ERROR);
      this.loading = false;
    }
  }

  signInWithPassword() {
    const { email, password } = this.form?.value;

    try {
      this.apiService.post(LOGIN_API, { email, password }).subscribe(
        (response) => {
          // console.log(response);
          if (response?.token && response?.refreshToken && response?.user?.id) {
            this.handleAuthRequestResponse(response, true);
          } else {
            this.toasterService.showError(GENERAL_ERROR);
            this.loading = false;
            this.form?.enable();
            // Handle error
          }
        },
        (error: any) => {
          console.log('error', error);
          this.toasterService.showError(error?.error?.message ?? GENERAL_ERROR);
          this.loading = false;
          this.form?.enable();
          // Handle error
        },
      );
    } catch (e) {
      console.debug('e', e);
      this.toasterService.showError(GENERAL_ERROR);
      this.loading = false;
    }
  }

  handleAuthRequestResponse(response: any, setUser: boolean) {
    try {
      this.authService.setRefreshToken(response.refreshToken);
      this.authService.setToken(response.token);
      if (setUser) {
        this.authService.setUserObject(response.user);
      }
      this._router.navigate(['/']);
      this.loading = false;
      this.form?.enable();
    } catch (e) {
      console.debug('e', e);
      this.toasterService.showError(GENERAL_ERROR);
      this.loading = false;
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.toasterService.showError(INVALID_FORM_ERROR);
      return;
    }

    this.loading = true;
    this.form?.disable();

    if (this.isRefreshTokenSignIn) {
      this.signInWithRefreshToken();
      return;
    }

    this.signInWithPassword();

    // this._router.navigate(['/']);
  }
}
