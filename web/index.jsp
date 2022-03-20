<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Login</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-with-addons.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.5.2/redux.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.5/react-redux.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.8.1/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.11.2/lodash.min.js"></script>

  <script type="text/babel" src="resources/js/counter.jsx"></script>
  <script type="text/babel" src="resources/js/comments.jsx"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js" integrity="sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script type="text/javascript" src="resources/js/gaearon.js"></script>
</head>
<body>
  <form method="post" action="Login">
    Enter username : <input type="text" name="username" value="xenixstudio"/><br/>
    Enter password : <input type="password" name="password" value="wpslrtm79"/><br/>
    <input type="submit" value="login"/>
  </form>

  <div id="root"></div>
  <div id="content"></div>
  <div id="gaearon">
    <div class="game">
      <div class="game-board">
        <div>
          <div class="board-row">
            <button class="square" num=0></button>
            <button class="square" num=1></button>
            <button class="square" num=2></button>
          </div>
          <div class="board-row">
            <button class="square" num=3></button>
            <button class="square" num=4></button>
            <button class="square" num=5></button>
          </div>
          <div class="board-row">
            <button class="square" num=6></button>
            <button class="square" num=7></button>
            <button class="square" num=8></button>
          </div>
        </div>
      </div>
      <div class="game-info">
        <div id="status">Next player: X</div>
        <ol id="moves">
          <li key=0><button class='jump'>Go to game start</button></li>
        </ol>
      </div>
    </div>
  </div>
</body>
</html>