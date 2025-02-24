import './App.css';
import './style/all.css';
import Main from './components/main';
import Connect from './components/Connect'
import Layout from './components/Layout';
import LikedBooks from './components/LikedBooks';
import Cart from './components/Cart';
import SearchBooks from './components/searchBooks';
import BookInfo from './components/BookInfo';
import Settings from './components/Settings';
import AdminLogin from './components/AdminLogin';
import AdminSettings from './components/AdminSettings';
import NotFound from './components/NotFound';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginContextProvider from './context/LoginContext';
import BooksContextProvider from './context/BooksContext';




function App() {   
  console.log("started app!!!")
  console.dir(process.env)
  return (
    <div className='app'>
      <BrowserRouter>
        <LoginContextProvider>
          <BooksContextProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<Main></Main>}></Route>
                <Route path='/connect' element={<Connect></Connect>}></Route>
                <Route path='/likedBooks' element={<LikedBooks></LikedBooks>}></Route>
                <Route path='/cart' element={<Cart></Cart>}></Route>
                <Route path='/Settings' element={<Settings></Settings>}></Route>
                <Route path='/SearchBooks/:search' element={<SearchBooks></SearchBooks>}></Route>
                <Route path='/Books/:bookId' element={<BookInfo></BookInfo>}></Route>
                <Route path='/AdminLogin' element={<AdminLogin></AdminLogin>}></Route>
                <Route path='/AdminSettings' element={<AdminSettings></AdminSettings>}></Route>
                <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
              </Routes>
            </Layout>
          </BooksContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
      {/* <div>{arr.map((el,i)=>(
        <div>{`${i} ${el}`}</div>
      ))}
      <button onClick={()=>addNumber('ten')}>click me to add 'ten'</button>
      {possibleNumbers.map((el,i)=>(
        <div ><button className='numberButton' onClick={()=>addNumber(el)}>{`${el}`}</button></div>
      ))}
      </div>*/ }
    </div>
  );
}

export default App;
