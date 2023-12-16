import React from 'react';
import './App.css';
import Page from 'components/Application/Page/Page';
import {Provider} from 'react-redux';
import store from './rdx/store';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <Provider store={store}>
        <Page/>
      </Provider>
    </div>
  );
}

export default App;
