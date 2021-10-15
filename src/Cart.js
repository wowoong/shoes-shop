import React from 'react';
import {Table} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

function Cart(props) {

  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();
  
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>금액</th>
            <th>변경</th>
          </tr>
          </thead>
          <tbody>
            {
              state.reducer.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{ a.id + 1 }</td>
                    <td>{a.name}</td>
                    <td>{a.quan}</td>
                    <td>{a.price}</td>
                    <td>
                      <button onClick={() => { dispatch({ type: '수량증가', data: a.id }) }}>+</button>
                      <button onClick={() => { dispatch({ type: '수량감소', data: a.id }) }}>-</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </Table>
      {
        props.alertState === true
        ? (<div className="alert-yellow">
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={() => { props.dispatch({ type: 'close' }) }}>닫기</button>
        </div>)
        : null
      }


    </div>
  )
}

// function 함수명(state) {
//   return {
//     state: state.reducer,
//     alertState: state.reducer2
//   }
// }
// export default connect(함수명)(Cart)

export default Cart;