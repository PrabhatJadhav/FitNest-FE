import { Component, OnInit } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { flyInOut } from './toaster-animation';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  animations: [flyInOut],
})
export class ToasterComponent extends Toast implements OnInit {
  constructor(protected override toastrService: ToastrService, public override toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  ngOnInit() {}
}
