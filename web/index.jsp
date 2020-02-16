<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Login</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.11.2/lodash.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.5.2/redux.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-with-addons.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.5/react-redux.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js" type="text/javascript"></script>

  <script src="resources/js/counter.jsx" type="text/babel"></script>
  <script src="resources/js/comments.jsx" type="text/babel"></script>
</head>
<body>
<form method="post" action="Login">
  Enter username : <input type="text" name="username" value="xenixstudio"/><br/>
  Enter password : <input type="password" name="password" value="wpslrtm79"/><br/>
  <input type="submit" value="login"/>
</form>

<div id="root"></div>
<div id="content"></div>

</body>
</html>