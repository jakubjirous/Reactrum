import React, { Component } from 'react';

import NavigationBar from '../Navigation/NavigationBar';
import FlashMessageList from '../Flash/FlashMessageList';


import './App.scss';


/**
 * App component
 */
class App extends Component {

    render() {
        return (
            <div>
                <NavigationBar />
                <FlashMessageList />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;