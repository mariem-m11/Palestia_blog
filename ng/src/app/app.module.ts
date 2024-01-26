import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ColorComponent } from './color/color.component';
import { LoginComponent } from './login/login.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RainbowDirective } from './directives/rainbow.directive';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { FilsComponent } from './fils/fils.component';
import { CardComponent } from './card/card.component';
import { CustomDirective } from './custom-directive.directive';
import {CvComponent} from "./cvTech/cv/cv.component";
import {ListeCvComponent} from "./cvTech/liste-cv/liste-cv.component";
import {ItemCvComponent} from "./cvTech/item-cv/item-cv.component";
import {DetailCvComponent} from "./cvTech/detail-cv/detail-cv.component";
import { EmbaucheComponent } from './cvTech/embauche/embauche.component';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DetailComponent } from './cvTech/detail/detail.component';
import { DeleteCvComponent } from './cvTech/delete-cv/delete-cv.component';
import {ObservableComponent} from "./observable/observable.component";
import { HttpComponent } from './http/http.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ArticlesComponent } from './articles/articles.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AccessGuard } from './guards/access.guard';
import { PalestineMapComponent } from './palestine-map/palestine-map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzTineComponent } from './quizz-tine/quizz-tine.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ColorComponent,
    LoginComponent,
    TaskManagerComponent,
    DefaultImagePipe,
    RainbowDirective,
    MiniWordComponent,
    FilsComponent,
    CardComponent,
    CustomDirective,
    DetailComponent,
    DeleteCvComponent,
    ObservableComponent,
    HttpComponent,
    AboutUsComponent,
    HighlightDirective,
    ArticlesComponent,
    LogoutComponent,
    ContactComponent,
    UserComponent,
    RegisterComponent,
    PalestineMapComponent,
    DashboardComponent,
    QuizzTineComponent,
    FilterPipe,
    ArticleDetailComponent,
    //EmbaucheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ListeCvComponent,
    DetailCvComponent,
    ItemCvComponent,
    HttpClientModule,
    EmbaucheComponent,
    CvComponent,
    NgxPaginationModule,
    NgIf,
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
    }),
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
