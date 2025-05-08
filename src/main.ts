import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser'
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { TokenInterceptor } from './token/token.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch()), 
              provideProtractorTestingSupport(), 
              provideRouter(routes),
              provideHttpClient(withInterceptors([TokenInterceptor])),
              provideEnvironmentNgxMask(),
              provideAnimationsAsync()]
}).catch(err => console.error(err));
