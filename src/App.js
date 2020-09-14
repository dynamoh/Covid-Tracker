import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Container from '@material-ui/core/Container';
import HomePage from './components/Home/HomePage';
import 'leaflet/dist/leaflet.css'

class App extends Component {

  render () {
    return (
      <div className="App">
        <Header />

        <div className="app-body">
          <Container maxwidth="lg">
            <HomePage />
          </Container>
        </div>

      </div>
    );
  }
}

export default App;
