import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BulkCreateJiraComponent } from '../components/bulk-create-jira/bulk-create-jira.component';
import { AuthorizeComponent } from '../components/authorize/authorize.component';
import {CSVToJsonComponent } from '../components/csvto-json/csvto-json.component';
import {ComingSoonComponent} from '../components/coming-soon/coming-soon.component';
import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';


const appRoutes: Routes = [
  { path: '', component: AuthorizeComponent },
  { path: 'bulkCreate', component: BulkCreateJiraComponent },
  { path: '\login', component: AuthorizeComponent },
  { path: '\get', component: CSVToJsonComponent },
  { path: '\comingsoon', component: DragAndDropComponent }

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