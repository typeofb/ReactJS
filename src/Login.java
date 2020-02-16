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
        Map<String, String> map1 = new HashMap<String, String>();
        map1.put("1", "2");
        Map<String, String> map2 = new HashMap<String, String>();
        map2.put("2", "2");
        Map<String, String> map3 = new HashMap<String, String>();
        map3.put("1", "1");
        Map<String, String> map4 = new HashMap<String, String>();
        map4.put("30", "test");
        Map<String, String> map5 = new HashMap<String, String>();
        map5.put("30", "hello");

        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        list.add(map1);
        list.add(map2);
        list.add(map3);
        list.add(map4);
        list.add(map5);

        PrintWriter out = response.getWriter();
        out.print(list);
        out.close();
    }
}
