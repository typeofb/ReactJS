// 함수형 컴포넌트
const Comment = ({fakeNm, realNm, editing, onUpdateClick, onDeleteClick, onEditClick, onCancelClick, onChange}) => {
  if (!editing) {
    return (
      <ul>
        <li>
          <div>
            <span>가상경로 : {fakeNm}</span>
          </div>
          <div>
            <span><p>실제경로 : {realNm}</p></span>
            <button onClick={() => onEditClick()}>Update</button>
            <button onClick={() => onDeleteClick()}>Delete</button>
          </div>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>
          <div>
            <span>가상경로 : {fakeNm}</span>
          </div>
          <div>
            <textarea value={realNm} onChange={(e) => onChange(e.target.value)}/>
            <button onClick={() => onUpdateClick()}>수정</button>
            <button onClick={() => onCancelClick()}>취소</button>
          </div>
        </li>
      </ul>
    );
  }
};

// 클래스형 컴포넌트
class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let commentNodes = this.props.items.map((element, index) =>
      <Comment key={index}
               fakeNm={element.fakeNm}
               realNm={element.realNm}
               editing={element.editing}
               onUpdateClick={() => this.props.onUpdateComment(element.id, element.realNm)}
               onDeleteClick={() => this.props.onDeleteComment(element.id)}
               onEditClick={() => this.props.onEditComment(element.id)}
               onCancelClick={() => this.props.onCancelComment(element.id)}
               onChange={(e) => this.props.onChangeComment(element.id, e)}/>
    );
    return (
      <div>
        {commentNodes}
        <button>더보기</button>
      </div>
    );
  }
}

let mapStateToPropsList = (state) => {
  return {items: state.items}
}

let mapDispatchToPropsList = (dispatch) => {
  return {
    onUpdateComment: (id, realNm) => dispatch(updateComment(id, realNm)),
    onDeleteComment: (id) => dispatch(deleteComment(id)),
    onEditComment: (id) => dispatch(editComment(id)),
    onCancelComment: (id) => dispatch(cancelComment(id)),
    onChangeComment: (id, realNm) => dispatch(changeComment(id, realNm))
  }
}

CommentList = ReactRedux.connect(mapStateToPropsList, mapDispatchToPropsList)(CommentList);

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
    this.props.onInsertComment(data);
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

let mapDispatchToPropsForm = (dispatch) => {
  return {onInsertComment: (data) => dispatch(insertComment(data))}
}

CommentForm = ReactRedux.connect(undefined, mapDispatchToPropsForm)(CommentForm);

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    axios.get('Login', {
      params: {foo: 'bar'}
    }).then(response => {
      this.props.onSelectComment(response.data)
    }).catch(response => {
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

let mapDispatchToPropsBox = (dispatch) => {
  return {onSelectComment: (data) => dispatch(selectComment(data))}
}

CommentBox = ReactRedux.connect(undefined, mapDispatchToPropsBox)(CommentBox);

// action types
const SELECT = 'SELECT';
const INSERT = 'INSERT';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const CANCEL = 'CANCEL';
const CHANGE = 'CHANGE';

// action creators
function selectComment(data) {
  return {type: SELECT, data};
}

function insertComment(data) {
  return {type: INSERT, data};
}

function updateComment(id, realNm) {
  return {type: UPDATE, id, realNm};
}

function deleteComment(id) {
  return {type: DELETE, id};
}

function editComment(id) {
  return {type: EDIT, id};
}

function cancelComment(id) {
  return {type: CANCEL, id};
}

function changeComment(id, realNm) {
  return {type: CHANGE, id, realNm};
}

const initialState = {
  items: [
    {
      id: '',
      fakeNm: '',
      realNm: '',
      editing: ''
    }
  ]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        items: action.data
      };
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
        items: state.items.map(item => item.id === action.id ? {...item, editing: false, realNm: action.realNm} : item)
      };
    case DELETE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case EDIT:
      return {
        ...state,
        items: state.items.map(item => item.id === action.id ? {...item, editing: true} : item)
      };
    case CANCEL:
      return {
        ...state,
        items: state.items.map(item => item.id === action.id ? {...item, editing: false} : item)
      };
    case CHANGE:
      return {
        ...state,
        items: state.items.map(item => item.id === action.id ? {...item, realNm: action.realNm} : item)
      };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);
ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <CommentBox/>
  </ReactRedux.Provider>,
  document.getElementById('content')
);