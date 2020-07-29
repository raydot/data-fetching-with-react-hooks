import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HookTrigger from './HookTrigger';
import ErrorHandling from './ErrorHandling';
import DataAndForms from './DataAndForms';

ReactDOM.render(
  <React.StrictMode>
    {/*<App /> */}
    {/*<HookTrigger />*/}
    {/*<ErrorHandling />*/}
    <DataAndForms />
  </React.StrictMode>,
  document.getElementById('root')
);
