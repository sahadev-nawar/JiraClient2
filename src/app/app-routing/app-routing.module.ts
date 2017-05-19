import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BulkCreateJiraComponent } from '../bulk-create-jira/bulk-create-jira.component';
import { AuthorizeComponent } from '../authorize/authorize.component';
import {CSVToJsonComponent } from '../csvto-json/csvto-json.component';
import {ComingSoonComponent} from '../coming-soon/coming-soon.component';


const appRoutes: Routes = [
  { path: '', component: AuthorizeComponent },
  { path: 'bulkCreate', component: BulkCreateJiraComponent },
  { path: '\login', component: AuthorizeComponent },
  { path: '\get', component: CSVToJsonComponent },
  { path: '\comingsoon', component: ComingSoonComponent }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [BulkCreateJiraComponent];