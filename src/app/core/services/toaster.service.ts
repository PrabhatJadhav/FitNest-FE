import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  public showSuccess(title: string, msg?: string): void {
    this.toastr.success(msg, title);
  }

  public showError(title: string, msg?: string): void {
    this.toastr.error(msg, title);
  }

  public showInfo(title: string, msg?: string): void {
    this.toastr.info(msg, title);
  }

  public showWarning(title: string, msg?: string): void {
    this.toastr.warning(msg, title);
  }
}
