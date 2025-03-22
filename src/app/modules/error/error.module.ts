import { NgModule } from '@angular/core';
import { ErrorRoutingModule } from './error-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [], imports: [ErrorRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ErrorModule {}
