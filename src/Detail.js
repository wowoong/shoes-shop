import React, { useEffect, useState, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import './Detail.scss';
import { countContext } from './App';
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';


let Box = styled.div`
  padding : 20px;
`;
const Hh4 = styled.h4`
  font-size : 30px;
`;

function Detail(props) {

  const newCount = useContext(countContext);

  const [out, setOut] = useState(true);
  const [input, setInput] = useState('');
  const [tab, setTab] = useState(0);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setOut(false) }, 2000);
    return ()=>{clearTimeout(timer)}
  },[]);
  

  const { id } = useParams();
  const history = useHistory();
  const match = props.shoes.find((a) => { return a.id == id });
 
  return(
    <div className="container">
      <Box><Hh4 className="red">상세 페이지</Hh4></Box>

      <input onChange={ ((e) => setInput(e.target.value) )}/>

      {
        out === true
        ? (<div className="alert-yellow" >
            <p>품절 임박!! 재고가 얼마 남지 않았습니다!</p>
          </div>)
        : null}
      

      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (Number(id)+1) + ".jpg"} alt="shoes" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{ match.title }</h4>
          <p>{ match.content }</p>
          <p>{match.price}원</p>

          <Info count={props.count}></Info>


          <button className="btn btn-danger" onClick={() => {
            const newCount = [...props.count];
            newCount[0] = newCount[0] - 1;
            props.setCount(newCount);

            props.dispatch({type:'항목추가', payload: {id:match.id, name: match.title, quan:1, price: match.price}})
            history.push('/cart');
          }}>주문하기</button>
          <button className="btn btn-danger" onClick={()=>{history.goBack()}}>뒤로가기</button> 
        </div>
      </div>

    <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => { setChange(false); setTab(0)}}>Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { setChange(false); setTab(1)}}>Option 2</Nav.Link>
      </Nav.Item>
    </Nav>

    <CSSTransition in={change} classNames="wow" timeout={500}>
    <TabContent tab={tab} setChange={setChange}></TabContent>
    </CSSTransition>

    </div>
  )
}

function TabContent(props) {
  useEffect(() => {
    props.setChange(true);
  })
  if (props.tab === 0) {
    return <div>0번째 내용입니다</div>
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다</div>
  }
}

function Info(props) {
  return (
    <p>재고 : {props.count[0]}</p>
  )
}



function 함수명(state) {
  return {
    state: state.reducer,
    alertState: state.reducer2
  }
}
export default connect(함수명)(Detail);