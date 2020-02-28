// 함수형 컴포넌트
const Comment = ({fakeNm, realNm, onUpdateCommentClick, onDeleteCommentClick}) => {
  return (
    <ul>
      <li>
        <div>
          <span>가상경로 : {fakeNm}</span>
        </div>
        <div>
          <span><p>실제경로 : {realNm}</p></span>
          <button onClick={() => onUpdateCommentClick()}>수정</button>
          <button onClick={() => onDeleteCommentClick()}>삭제</button>
        </div>
      </li>
    </ul>
  );
};

// 클래스형 컴포넌트
class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdateClick(fakeNm, realNm) {
    this.props.store.dispatch(updateComment(fakeNm, realNm));
  }

  handleDeleteClick(id) {
    this.props.store.dispatch(deleteComment(id));
  }

  render() {
    let commentNodes = this.props.store.getState().items.map((element, index) =>
      <Comment store={this.props.store}
               key={index}
               fakeNm={element.fakeNm}
               realNm={element.realNm}
               onUpdateCommentClick={() => this.handleUpdateClick(element.fakeNm, element.realNm)}
               onDeleteCommentClick={() => this.handleDeleteClick(element.id)}/>
    );
    return (
      <div>
        {commentNodes}
        <button>더보기</button>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      id: new Date(),
      fakeNm: e.target.elements.fakeNm.value,
      realNm: e.target.realNm.value,
      editing: false
    };
    this.props.store.dispatch(insertComment(data));
    e.target.elements.fakeNm.value = '';
    e.target.realNm.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="fakeNm" placeholder="Your ID"/>
        <input type="text" name="realNm" placeholder="Say something..."/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    axios.get('Login', {
      params: {foo: 'bar'}
    }).then(response => {
      this.props.store.dispatch(selectComment(response.data))
    }).catch(response => {
      console.log(response.data);
    });
  }

  render() {
    return (
      <div>
        <CommentList store={this.props.store}/>
        <CommentForm store={this.props.store}/>
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
function selectComment(data) {
  return {type: SELECT, data};
}

function insertComment(data) {
  return {type: INSERT, data};
}

function updateComment(fakeNm, realNm) {
  let data = {
    fakeNm: fakeNm,
    realNm: realNm
  };
  return {type: UPDATE, data};
}

function deleteComment(id) {
  return {type: DELETE, id};
}

const initialState = {
  items: [
    {
      id: '',
      fakeNm: '',
      realNm: ''
    }
  ]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        items: action.data
      }
    case INSERT:
      return Object.assign({}, state, {
        items: state.items.concat({
          id: action.data.id,
          fakeNm: action.data.fakeNm,
          realNm: action.data.realNm,
          editing: action.data.editing
        })
      });
    case UPDATE:
      return {
        ...state,
        items: state.items.map(item => item.fakeNm === action.data.fakeNm ? {...item, realNm: '수정됨'} : item)
      }
    case DELETE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);
const render = () => {
  ReactDOM.render(<CommentBox store={store}/>,
    document.getElementById('content')
  );
}
store.subscribe(render);
render();