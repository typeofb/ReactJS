function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return {...state, counter: action.payload};
    case 'DEC':
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
}
const initialState = {
  counter: 0
}
const store = Redux.createStore(reducer, initialState);

function upDateData() {
  document.getElementById('counter').innerText = store.getState().counter;
}
store.subscribe(upDateData);

function Counter() {
  const handleIncrementClick = () => {
    store.dispatch({
      type: 'INC',
      payload: store.getState().counter + 1
    })
  };
  const handleDecrementClick = () => {
    store.dispatch({
      type: 'DEC'
    })
  };
  return (
    <div>
      <div>
        Counter:
        <span id="counter">{initialState.counter}</span>
      </div>
      <button id="inc" onClick={handleIncrementClick}>Increment</button>
      <button id="dec" onClick={handleDecrementClick}>Decrement</button>
    </div>
  );
}
ReactDOM.render(<Counter />, document.getElementById('root'));