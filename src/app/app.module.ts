import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InfoWinComponent } from './info-win/info-win.component';
import { AppComponent } from './app.component';
import {ImageService} from './service/image.service';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
import {APP_BASE_HREF} from '@angular/common';
import { CommonService } from './service/common.service';
import { Storage } from './service/storage';
import { ImageComponent } from './image/image.component';
import { ImagedetailComponent } from './imagedetail/imagedetail.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoWinComponent,
    ImageComponent,
    ImagedetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCVp48NCfljl9OXyzGuS4VY8VBJM0DKz6Y',
      libraries: ["places"]
    })
  ],
  providers: [Storage,CommonService,GoogleMapsAPIWrapper,{provide: APP_BASE_HREF, useValue : '/' }, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
