package com.yohannes.marketserver;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;

/**
 * Hello world!
 *
 */
public class App {
    static Vertx vertx;

    public static void main(String[] args) {
        vertx = Vertx.vertx();

        HttpServer httpServer = vertx.createHttpServer();

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        router.get("/hello/:name").handler(routingContext -> {
            String name = routingContext.request().getParam("name");
            HttpServerResponse response = routingContext.response();
            response.setChunked(true);
            response.write("Hi " + name);
            response.end();
        });
        router.post("/user/register").consumes("*/json").handler(routingContext -> {
            JsonObject jsonObject = routingContext.getBodyAsJson();
            Connect connect = new Connect(vertx);
            String username = jsonObject.getString("username");
            String firstname = jsonObject.getString("firstname");
            String lastname = jsonObject.getString("lastname");
            String password = jsonObject.getString("password");
            HttpServerResponse response = routingContext.response();
            response.headers().set("content-type", "application/json; charset=UTF-8");
            Future<RowSet<Row>> output = connect.createUser(username, firstname, lastname, password);
            output.onSuccess(arr -> {
                response.end("Successed");
            }).onFailure(err -> response.end("error" + err.getMessage()));
        });
        router.get("/user/:username").handler(routingContext -> {
            String username = routingContext.request().getParam("username");
            Connect connect = new Connect(vertx);
            HttpServerResponse response = routingContext.response();
            response.headers().set("content-type", "application/json; charset=UTF-8");
            Future<RowSet<Row>> output = connect.getUser(username);
            output.onSuccess(arr -> {
                System.out.println(arr.iterator().next().deepToString());
                response.end("Successed");
            }).onFailure(err -> response.end("error" + err.getMessage()));
        });
        router.patch("/user/:username").handler(routingContext -> {
            String username = routingContext.request().getParam("username");
            JsonObject jsonObject = routingContext.getBodyAsJson();
            String firstname = jsonObject.getString("firstname");
            String lastname = jsonObject.getString("lastname");
            String password = jsonObject.getString("password");
            Connect connect = new Connect(vertx);
            HttpServerResponse response = routingContext.response();
            response.headers().set("content-type", "application/json; charset=UTF-8");
            Future<RowSet<Row>> output = connect.updateUser(username, firstname, lastname, password);
            output.onSuccess(arr -> {
                System.out.println(arr.rowCount());
                response.end("Successed");
            }).onFailure(err -> response.end("error" + err.getMessage()));
        });
        router.delete("/user/:username").handler(routingContext -> {
            String username = routingContext.request().getParam("username");
            Connect connect = new Connect(vertx);
            HttpServerResponse response = routingContext.response();
            response.headers().set("content-type", "application/json; charset=UTF-8");
            Future<RowSet<Row>> output = connect.deleteUser(username);
            output.onSuccess(arr -> {
                System.out.println(arr.rowCount());
                response.end("Successed");
            }).onFailure(err -> response.end("error" + err.getMessage()));
        });

        httpServer.requestHandler(router).listen(8091);
    }
}
