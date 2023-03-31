import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus, heroUserPlus, heroUsers } from '@ng-icons/heroicons/outline';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NavComponent } from './shared/nav/nav.component';
import { PageComponent } from './shared/page/page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { ApiInterceptor } from './api.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const allIcons = {
  heroUsers,
  heroPlus,
  heroUserPlus,
};

const AppInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [AppConfigService],
  useFactory: (appConfigService: AppConfigService) => () => appConfigService.load(),
};

const ApiHttpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons(allIcons),
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    NavComponent,
    PageComponent,
    HttpClientModule,
  ],
  providers: [AppInitializerProvider, ApiHttpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
