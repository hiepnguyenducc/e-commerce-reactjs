
import { Link } from "react-router-dom";
import React, { useState } from 'react';

import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
ProductOutlined,
    SettingOutlined,
  } from '@ant-design/icons';
  import { Divider, Menu, Switch } from 'antd';
  import type { GetProp, MenuProps } from 'antd';
import SubMenu from "antd/es/menu/SubMenu";

  type MenuTheme = GetProp<MenuProps, 'theme'>;

  type MenuItem = GetProp<MenuProps, 'items'>[number];

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: 'Profile',
    },
    {
      key: 'sub1',
      label: 'Category',
      icon: <AppstoreOutlined />,
      children: [
        { key: '3', label: (
          <Link to="/admin/add-category">Add Category</Link>
          ) },
        { key: '4',  label:(
            <Link to="/admin/view-category">View Category</Link>
        )},
        {
          key: 'sub1-2',
          label: 'Submenu',
          children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Product',
      icon: <ProductOutlined />,
      children: [
        { key: '7', label: (<Link to="/admin/add-product">Add Product</Link>) },
        { key: '8', label: (<Link to="/admin/view-product">View Product</Link>) },
      ],
    },
    {
      key:'brand',
      label: 'Brand',
      icon: <SettingOutlined />,
      children:[
        {key:'9', label: (<Link to="/admin/add-brand">Add Brand</Link>)},
        {key:'10', label: (<Link to="/admin/view-brand">View Brand</Link>)}
      ]
    },
    {
      key:'color',
      label: 'Color',
      icon: <SettingOutlined />,
      children:[
        {key:'11', label: (<Link to="/admin/add-color">Add Color</Link>)},
        {key:'12', label: (<Link to="/admin/view-color">View Color</Link>)}
      ]
    },
    {
      key:'size',
      label: 'Size',
      icon: <SettingOutlined />,
      children:[
        {key:'13', label: (<Link to="/admin/add-color">Add Size</Link>)},
        {key:'14', label: (<Link to="/admin/view-color">View Size</Link>)}
      ]
    },
    {
      key:'collection',
      label: 'Collection',
      icon: <SettingOutlined />,
      children:[
        {key:'15', label: (<Link to="/admin/add-collection">Add Collection</Link>)},
        {key:'16', label: (<Link to="/admin/view-collection">View Collection</Link>)}
      ]
    },
    {
      key:'coupon',
      label: 'Coupon',
      icon: <SettingOutlined />,
      children:[
        {key:'17', label: (<Link to="/admin/add-coupon">Add Coupon</Link>)},
        {key:'18', label: (<Link to="/admin/view-coupon">View Coupon</Link>)}
      ]
    },
    {
      key:'slider',
      label: 'Slider',
      icon: <SettingOutlined />,
      children:[
        {key:'19', label: (<Link to="/admin/add-slider">Add Slider</Link>)},
        {key:'20', label: (<Link to="/admin/view-slider">View Slider</Link>)}
      ]
    }
  ];

const Sidebar: React.FC = () => {
    const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<MenuTheme>('light');
  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };


	return (
		<>


      <Menu
        style={{ width: 200 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={items}
      />
      <Divider type="vertical" />
      <br/>
      <Switch onChange={changeTheme} /> Change Style

      <br />

        </>)
}
export default Sidebar;
