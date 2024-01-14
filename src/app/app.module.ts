import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NouveauUserComponent } from './components/nouveau-user/nouveau-user.component';
import { ClientService } from './services/client.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NouveauClientComponent } from './components/nouveau-client/nouveau-client.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
//import { AgmCoreModule } from '@agm/core';
import { NouveauCompagnComponent } from './components/nouveau-compagn/nouveau-compagn.component';
import { DetailsCompagnComponent } from './components/details-compagn/details-compagn.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NouveauProductTypeComponent } from './components/nouveau-product-type/nouveau-product-type.component';
import { ListProductTypesComponent } from './components/list-product-types/list-product-types.component';
import { DatePipe, UpperCasePipe, registerLocaleData } from '@angular/common';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';
import { EditCampaignProductsComponent } from './components/edit-campaign-products/edit-campaign-products.component';
import { EditCampaignTownsComponent } from './components/edit-campaign-towns/edit-campaign-towns.component';
import { EditCampaignBusinessTypesComponent } from './components/edit-campaign-business-types/edit-campaign-business-types.component';
import { EditCampaignGlobalParamsComponent } from './components/edit-campaign-global-params/edit-campaign-global-params.component';
import localeFr from '@angular/common/locales/fr';
import { CampaignTownDetailsComponent } from './components/campaign-town-details/campaign-town-details.component';
import { ListCampaignComponent } from './components/list-campaign/list-campaign.component';
import { ListDevisComponent } from './components/list-devis/list-devis.component';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AuthGuard } from './_helpers/auth.guard';
import { MenusComponent } from './components/menus/menus.component';
import { DetailedDevisCampaignComponent } from './components/detailed-devis-campaign/detailed-devis-campaign.component';


import { SelectComposExampleComponent } from './components/select-compos-example/select-compos-example.component';
import { DetailsProductTypeComponent } from './components/details-product-type/details-product-type.component';
import { DevisDetailsComponent } from './components/devis-details/devis-details.component';
import { ListCampaignBusinessesComponent } from './components/list-campaign-businesses/list-campaign-businesses.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListFactureComponent } from './components/list-facture/list-facture.component';
import { DetailsFactureComponent } from './components/details-product-type/details-facture/details-facture.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    ListUserComponent,
    NouveauUserComponent,
    NouveauClientComponent,
    ListClientComponent,
    DetailsClientComponent,
    EditUserComponent,
    NouveauCompagnComponent,
    DetailsCompagnComponent,
    NouveauProductTypeComponent,
    ListProductTypesComponent,
    EditCampaignComponent,
    EditCampaignProductsComponent,
    EditCampaignTownsComponent,
    EditCampaignBusinessTypesComponent,
    EditCampaignGlobalParamsComponent,
    CampaignTownDetailsComponent,
    ListCampaignComponent,
    ListDevisComponent,
    MenusComponent,
    DetailedDevisCampaignComponent,
    SelectComposExampleComponent,
    DetailsProductTypeComponent,
    DevisDetailsComponent,
    ListCampaignBusinessesComponent,
    ListFactureComponent,
    DetailsFactureComponent,
    GalleryComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    ColorPickerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MDBBootstrapModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
     
    
    /*,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBarLEdbGw8JnHOz6hRceCP8vyRRklFxr8',
      libraries: ['places']
    })*/

  ],
  providers: [    
    DatePipe,
    ClientService,
    {
      provide: localeFr,
      useValue: 'fr'
    },
    AuthGuard,    
    UpperCasePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
