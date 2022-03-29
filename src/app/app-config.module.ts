import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  isProduction: boolean;
  apiEndpoint: string;
  fileEndpoint:string;
  getClientIPEndpoint:string;
}

export const APP_DI_CONFIG: AppConfig = {
  isProduction: environment.production,
  apiEndpoint: environment.apiEndpoint,
  fileEndpoint: environment.fileEndpoint,
  getClientIPEndpoint: environment.getClientIPEndpoint
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }