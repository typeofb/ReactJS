import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/Login")
public class Login extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if ("xenixstudio".equals(request.getParameter("username")) && "wpslrtm79".equals(request.getParameter("password")))
            response.sendRedirect("welcome.jsp");
        else
            response.sendRedirect("index.jsp");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print("[{\"id\":\"0\",\"fakeNm\":\"/mobile/file/download/0/1466388349809\",\"realNm\":\"Chrysanthemum.jpg\"},{\"id\":\"1\",\"fakeNm\":\"/mobile/file/download/0/1466388310261\",\"realNm\":\"Desert.jpg\"},{\"id\":\"2\",\"fakeNm\":\"/mobile/file/download/0/1466387904304\",\"realNm\":\"Hydrangeas.jpg\"}]");
    }
}
