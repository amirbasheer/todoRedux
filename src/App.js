import React, { Component } from 'react';
import { Provider } from "react-redux";
import { store } from '../src/redux/store';
import Todo from '../src/component/todo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Provider store={store}>
              <Todo/>
          </Provider>
      </div>
    );
  }
}

export default App;
