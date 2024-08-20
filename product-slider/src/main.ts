import { bootstrapApplication } from '@angular/platform-browser';
import { ProductSliderComponent } from './app/product-slider.component';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};
bootstrapApplication(ProductSliderComponent, appConfig)
  .catch((err) => console.error(err));
