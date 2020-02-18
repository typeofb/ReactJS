class Comment extends React.Component {
  render() {
    let commentNodes = store.getState().items.map((item) =>
      <ul key={item.fakeNm}>
        <li>
          <div>
            <span>아이디 : {item.fakeNm}</span>
          </div>
          <div>
            <span><p>메시지 : {item.realNm}</p></span>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
      </ul>
    );
    return (
      <div>
        {commentNodes}
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
    return (
      <div>
        <Comment/>
        <button>더보기</button>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Your ID"/>
        <input type="text" placeholder="Say something..."/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}

class CommentBox extends React.Component {
  componentDidMount() {
    axios.get('Login', {
      params: {foo: 'bar'}
    })
      .then(response => {
        response.data.map(mail => ({
          fakeNm: '${mail.fakeNm}',
          realNm: '${mail.realNm}'
        }))
      })
      .catch(response => {
        console.log(response.data);
      });
  }

  render() {
    return (
      <div>
        <CommentList/>
        <CommentForm/>
      </div>
    );
  }
}

// action types
const SELECT = 'SELECT';
const INSERT = 'INSERT';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

// action creators
function selectComment() {
  return {type: SELECT};
}

function insertComment() {
  return {type: INSERT};
}

function updateComment() {
  return {type: UPDATE};
}

function deleteComment(comment) {
  return {
    type: DELETE,
    payload: comment
  };
}

function reducer(state = [], action) {
  switch (action.type) {
    case SELECT:
      return Object.assign({}, state, {fakeNm: state.fakeNm});
    case INSERT:
      return Object.assign({}, state, {fakeNm: state.fakeNm});
    case UPDATE:
      return Object.assign({}, state, {fakeNm: state.fakeNm});
    case DELETE:
      return [...state, action.payload];
    default:
      return state;
  }
}

const initialState = {
  items: [
    {
      fakeNm: 0,
      realNm: '홍길동'
    },
    {
      fakeNm: 1,
      realNm: '콩쥐'
    },
    {
      fakeNm: 2,
      realNm: '팥쥐'
    }
  ]
};
const store = Redux.createStore(reducer, initialState);
const render = () => {
  ReactDOM.render(<CommentBox store={store}/>,
    document.getElementById('content')
  );
}
store.subscribe(render);
render();