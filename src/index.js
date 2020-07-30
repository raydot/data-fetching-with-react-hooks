import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HookTrigger from './HookTrigger';
import ErrorHandling from './ErrorHandling';
import DataAndForms from './DataAndForms';
import CustomDataFetchHook from './CustomDataFetchHook';
import CustomDataFetchHookGeneric from './CustomDataFetchHookGeneric';

ReactDOM.render(
  <React.StrictMode>
    {/*<App /> */}
    {/*<HookTrigger />*/}
    {/*<ErrorHandling />*/}
    {/*<DataAndForms />*/}
    {/*<CustomDataFetchHook />*/}
    <CustomDataFetchHookGeneric />
  </React.StrictMode>,
  document.getElementById('root')
);
