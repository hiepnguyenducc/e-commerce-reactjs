import { FC } from 'react';

import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCotegory';
import EditCategory from '../components/admin/category/EditCategory';

import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';
import ViewBrand from '../components/admin/brand/css/ViewBrand';
import AddBrand from '../components/admin/brand/css/AddBrand';

interface RouteConfig {
    path: string;
    exact: boolean;
    name: string;
    component: FC;
}

const routes: RouteConfig[] = [
    {
        path: '/dashboard',
        exact: true,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/add-category',
        exact: true,
        name: 'Category',
        component: Category
    },
    {
        path: '/view-category',
        exact: true,
        name: 'ViewCategory',
        component: ViewCategory
    },
    {
        path: '/edit-category/:id',
        exact: true,
        name: 'EditCategory',
        component: EditCategory
    },
    {
        path: '/profile',
        exact: true,
        name: 'Profile',
        component: Profile
    },
    {
        path:'/add-product',
        exact:true,
        name:'AddProduct',
        component: AddProduct
    },
    {
        path:'/view-product',
        exact:true,
        name:'ViewProduct',
        component: ViewProduct
    },
    {path:'/edit-product/:id',exact:true, name:'EditProduct', component: EditProduct},
    {path:'/view-brand',exact:true, name:'ViewBrand',component: ViewBrand},
    {path:'/add-brand',exact:true, name:'AddBrand',component: AddBrand},
];
export default routes;
