//tells angular to start up application and boostraps platform to AppModule
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule).catch(err => console.error(err, 'sdsd'));
