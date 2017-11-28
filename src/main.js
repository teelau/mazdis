import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';

import MapPage from './views/MapPage';

const MainRouter = DrawerNavigator(
    {
        MapPage: { screen: MapPage },
    }
);

class Main extends Component {
    render() {
        return (
            <MainRouter />
        );
    }
}

export default Main;
