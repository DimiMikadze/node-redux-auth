import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
