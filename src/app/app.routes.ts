import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShowListComponent } from './show-list/show-list.component';

export const routes: Routes = [
    {
        path:'',
        component:MainComponent 
    },{
        path:'list',
        component:ShowListComponent
    }
];
