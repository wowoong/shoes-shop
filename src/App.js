import React, { useState, useContext, lazy, Suspense } from 'react';
import { Button,Navbar,Container,Nav } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import axios from 'axios';
import { Route, Link, Switch } from "react-router-dom";
import Cart from './Cart';
let Detail = lazy(() => import('./Detail.js'))

export const countContext = React.createContext();




function App() {

  const [shoes, setShoes] = useState(Data);
  const [count, setCount] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand as={Link} to="/">woongdidas</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/detail/1">Detail</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Switch>
      <Route exact path="/">
        <div className="jumbo">
          <h1>80% Season off</h1>
            <p>
              This is on-line shop.
            </p>
          <Button variant="primary">More</Button>
        </div>

          <div className="container">
            
          <countContext.Provider value={count}>

          <div className="row">
            {
              shoes.map((a, i) => {
                return (
                  <List shoes={shoes[i]} i={i} key={i}></List>
                )
              })
            }
            </div>

            </countContext.Provider>

            <button className="btn btn-primary" onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {setShoes([...shoes, ...result.data]) })
              .catch(()=>{console.log('fail')})
            } }>더보기</button>
        </div>
      </Route>

        <Route path="/detail/:id">
          <countContext.Provider value={count}>
            <Suspense fallback={<div>로딩중입니다</div>}>
              <Detail shoes={shoes} count={count} setCount={setCount}></Detail>
            </Suspense>
          </countContext.Provider>
      </Route>

        <Route path="/cart">
          <Cart></Cart>
      </Route>

      </Switch>
    </div>
  );
}

function List(props) {

  const newCount = useContext(countContext);

  return(
    <div className="col-md-4" >
      <Link to={"/detail/" + ( props.shoes.id)}>
        <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} alt="shoes" width="100%" />
      </Link>
      <h4>{ props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <Test></Test>
    </div>
  )
}

function Test(props) {

  const 재고 = useContext(countContext)

  return (
    <p>재고: {재고[0]}</p>
  )
}


export default App;
