import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

const alertValue = true;
function reducer2(state = alertValue, action) {
  if (action.type === 'close') {
    state = false;
    return state;
  } else {
    return state;
  }
    
}

const oneState = [
    { id: 0, name: 'White and Black', quan: 2, price: 1500 },
    { id: 1, name: 'Red Knit', quan: 4, price: 4000 },
    { id: 2, name: 'Grey Yordan', quan: 8, price: 13000 }
  ]
function reducer(state = oneState, action) {
  if (action.type === '항목추가') {

      // state안에 id: action.data가 있는지 확인 
    let found = state.findIndex((a)=>{return a.id === action.payload.id})
    if (found >= 0) {
      const copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      const copy = [...state];
      copy.push(action.payload);
      return copy;
    }

  } else if (action.type === '수량증가') {
    let found = state.findIndex((a)=>{return a.id === action.data})
    const copy = [...state];
    copy[found].quan++;
    return copy
  } else if (action.type === '수량감소') {
    let found = state.findIndex((a)=>{return a.id === action.data})
    const copy = [...state];
    copy[found].quan--;
    return copy
  } else {
    return state
  }
}
const store = createStore(combineReducers({reducer, reducer2}));





ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
