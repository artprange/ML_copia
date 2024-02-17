<!DOCTYPE html>
<html lang="pt-br">
  <!--Include head-->
  <% include("partials/head" , {title:"Início Admin"}) %>
  <body>
    <!--Header-->
    <% include("partials/headerNavBar") %>
    <!--/Header-->

    <!--Banner -->

    <div class="banner"></div>
    <!--/Banner -->

    <h1>Olá admin <%=user%></h1>

    <!--Footer -->

    <% include("partials/footer")

    <!--Footer -->
  </body>
</html>
