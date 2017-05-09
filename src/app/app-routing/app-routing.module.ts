import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BulkCreateJiraComponent } from '../bulk-create-jira/bulk-create-jira.component';


const appRoutes: Routes = [
  { path: '', component: BulkCreateJiraComponent },
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