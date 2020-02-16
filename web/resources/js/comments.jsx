class Comment extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <div>
            <span>아이디</span>
          </div>
          <div>
            <span><p>메시지</p></span>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
      </ul>
    );
  }
}

class CommentList extends React.Component {
  render() {
    return (
      <div>
        <Comment></Comment>
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
        console.log(response.data);
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

ReactDOM.render(<CommentBox/>,
  document.getElementById('content')
);