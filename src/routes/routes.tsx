import { FC } from 'react';
import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCotegory';
import EditCategory from '../components/admin/category/EditCategory';
import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';
import ViewBrand from '../components/admin/brand/ViewBrand.tsx';
import AddBrand from '../components/admin/brand/AddBrand.tsx';
import EditBrand from "../components/admin/brand/EditBrand.tsx";
import ViewColor from "../components/admin/color/ViewColor.tsx";
import AddColor from "../components/admin/color/AddColor.tsx";
import EditColor from "../components/admin/color/EditColor.tsx";
import ViewSize from "../components/admin/size/ViewSize.tsx";
import AddSize from "../components/admin/size/AddSize.tsx";
import EditSize from "../components/admin/size/EditSize.tsx";
import AddCollection from "../components/admin/collection/AddCollection.tsx";
import ViewCollection from "../components/admin/collection/ViewCollection.tsx";
import EditCollection from "../components/admin/collection/EditCollection.tsx";
import EditCoupon from "../components/admin/coupon/EditCoupon.tsx";
import AddCoupon from "../components/admin/coupon/AddCoupon.tsx";
import ViewCoupon from "../components/admin/coupon/ViewCoupon.tsx";
import AddSlider from "../components/admin/slider/AddSlider.tsx";
import ViewSlider from "../components/admin/slider/ViewSlider.tsx";
import EditSlider from "../components/admin/slider/EditSlider.tsx";

interface RouteConfig {
    path: string;
    exact: boolean;
    name: string;
    component: FC;
}

const routes: RouteConfig[] = [
    {path: '/dashboard',exact: true,name: 'Dashboard',component: Dashboard},
    {path: '/add-category', exact: true,name: 'Category',component: Category},
    {path: '/view-category',exact: true,name: 'ViewCategory',component: ViewCategory},
    {path: '/edit-category/:id',exact: true,name: 'EditCategory',component: EditCategory},
    {path: '/profile',exact: true,name: 'Profile',component: Profile},
    {path:'/add-product',exact:true,name:'AddProduct',component: AddProduct},
    {path:'/view-product',exact:true,name:'ViewProduct',component: ViewProduct},
    {path:'/edit-product/:id',exact:true, name:'EditProduct', component: EditProduct},
    {path:'/view-brand',exact:true, name:'ViewBrand',component: ViewBrand},
    {path:'/add-brand',exact:true, name:'AddBrand',component: AddBrand},
  {path:'/edit-brand/:id',exact:true, name:'EditBrand',component: EditBrand},
  {path:'/view-color',exact:true,name:'ViewColor', component:ViewColor},
  {path:'/add-color', exact:true, name:'AddColor', component:AddColor},
  {path:'/edit-color/:id', exact:true, name:'EditColor', component:EditColor},
  {path:'/view-size', exact:true, name:'ViewSize', component:ViewSize},
  {path:'/add-size', exact:true, name:'AddSize', component:AddSize},
  {path:'/edit-size/:id', exact:true, name:'EditSize', component:EditSize},
  {path:'/add-collection', exact:true,name:'AddCollection',component:AddCollection},
  {path:'/view-collection', exact:true, name:'ViewCollection',component:ViewCollection},
  {path:'/edit-collection/:id',exact:true,name:'EditCollection',component:EditCollection},

  {path:'/add-coupon', exact:true,name:'AddCoupon',component:AddCoupon},
  {path:'/view-coupon', exact:true, name:'ViewCoupon',component:ViewCoupon},
  {path:'/edit-coupon/:id',exact:true,name:'EditCoupon',component:EditCoupon},

  {path:'/add-slider', exact:true,name:'AddSlider',component:AddSlider},
  {path:'/view-slider', exact:true, name:'ViewSlider',component:ViewSlider},
  {path:'/edit-slider/:id',exact:true,name:'EditSlider',component:EditSlider},


];
export default routes;
