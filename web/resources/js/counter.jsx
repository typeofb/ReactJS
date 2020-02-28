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
};
const store = Redux.createStore(reducer, initialState);

function updateData() {
  document.getElementById('counter').innerText = store.getState().counter;
}
store.subscribe(updateData);

function incAction() {
  return {
    type: 'INC',
    payload: store.getState().counter + 1
  };
}
function decAction() {
  return {
    type: 'DEC'
  };
}

function Counter() {
  const handleIncrementClick = () => {
    store.dispatch(incAction());
  };
  const handleDecrementClick = () => {
    store.dispatch(decAction());
  };
  return (
    <div>
      <div>
        Counter:
        <span id="counter">{initialState.counter}</span>
      </div>
      <button onClick={handleIncrementClick}>Increment</button>
      <button onClick={handleDecrementClick}>Decrement</button>
    </div>
  );
}
ReactDOM.render(<Counter />, document.getElementById('root'));