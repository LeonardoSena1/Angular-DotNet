import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductComponent },
    { path: 'users', component: UserComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'order', component: OrderComponent },
];
