import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { LoginComponent } from './components/login/login.component';
import { NouveauUserComponent } from './components/nouveau-user/nouveau-user.component';

import { ListClientComponent } from './components/list-client/list-client.component';
import { NouveauClientComponent } from './components/nouveau-client/nouveau-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NouveauCompagnComponent } from './components/nouveau-compagn/nouveau-compagn.component';
import { NouveauProductTypeComponent } from './components/nouveau-product-type/nouveau-product-type.component';
import { ListProductTypesComponent } from './components/list-product-types/list-product-types.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';
import { ListCampaignComponent } from './components/list-campaign/list-campaign.component';
import { ListDevisComponent } from './components/list-devis/list-devis.component';
import { DetailsCompagnComponent } from './components/details-compagn/details-compagn.component';
import { AuthGuard } from './_helpers/auth.guard';
import { DetailedDevisCampaignComponent } from './components/detailed-devis-campaign/detailed-devis-campaign.component';
import { DetailsProductTypeComponent } from './components/details-product-type/details-product-type.component';
import { DevisDetailsComponent } from './components/devis-details/devis-details.component';
import { ListCampaignBusinessesComponent } from './components/list-campaign-businesses/list-campaign-businesses.component';
import { ListFactureComponent } from './components/list-facture/list-facture.component';
import { DetailsFactureComponent } from './components/details-product-type/details-facture/details-facture.component';


const routes: Routes = [
  { path : 'login', component : LoginComponent },  
  { path: 'tableauDeBord' , component : DashboardComponent}, 
  
  { path: 'Nve_Client', component : NouveauClientComponent},
  { path: 'Lst_Client', component : ListClientComponent},
  { path: 'Details_Client/:CustomerId', component : DetailsClientComponent},  

  { path: 'Nve_Utilisateur', component : NouveauUserComponent},
  { path: 'Lst_Utilisateur', component : ListUserComponent},
  { path: 'editUser/:UserId', component: EditUserComponent},

  { path: 'Nve_Compagne', component : NouveauCompagnComponent},
  { path: 'Lst_Compagne', component : ListCampaignComponent},
  { path: 'Edit_Compagne/:CampaignId', component : EditCampaignComponent},
  { path: 'Details_File_Compagne/:CampaignId', component : DetailsCompagnComponent},
  {path:'DetailedDevisCampaign/:CampaignId', component: DetailedDevisCampaignComponent},
  
  {path:'Lst_Devis_Compagnes', component: ListDevisComponent},  
  {path:'Frm_devis_details/:DevisId', component: DevisDetailsComponent},

  { path: 'Nve_Type_Produit', component : NouveauProductTypeComponent},
  { path: 'Lst_Types_Produits', component : ListProductTypesComponent},
  {path: 'Details_ProductType/:ProductTypeId', component: DetailsProductTypeComponent},
  
  {path: 'LstCampaign_Businesses/:CampaignId', component: ListCampaignBusinessesComponent},

  {path: 'Lst_Factures_Compagnes', component: ListFactureComponent},
  {path: 'Frm_Facture_details/:CampaignId', component: DetailsFactureComponent},
  
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
