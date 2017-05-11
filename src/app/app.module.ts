import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';

import { BulkCreateJiraComponent } from './bulk-create-jira/bulk-create-jira.component';
import { AuthorizeComponent } from './authorize/authorize.component';


@NgModule({
  declarations: [
    AppComponent,
    BulkCreateJiraComponent,
    routingComponents,
    AuthorizeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule, MdCheckboxModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

