import React from 'react';
import { Routes, Route} from "react-router-dom";
import Navbar from './Navbar';

import Sidebar from './Sidebar';
import Footer from './Footer';

import '../../assests/admin/css/styles.css';
import '../../assests/admin/js/scripts';

import routes from '../../routes/routes';


const MasterLayout: React.FC = () => {

    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar/>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Routes >
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<route.component />}
                                />
                            ))}
                        </Routes>

                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MasterLayout;
