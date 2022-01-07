package com.yohannes.market;

import com.yohannes.market.handlers.UserHandler;
import com.yohannes.market.query_handlers.UserQuery;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;

/**
 * Hello world!
 *
 */
public class App {
    static Vertx vertx;
    static Connect connect;

    public static void main(String[] args) {
        vertx = Vertx.vertx();

        Connect connect = new Connect(vertx);
        UserQuery sql = new UserQuery(connect.client);
        UserHandler userHandler = new UserHandler(sql);

        HttpServer httpServer = vertx.createHttpServer();

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.GET));
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.POST));
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.PATCH));
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.DELETE));
        router.post("/user/register")
                .handler(routingContext -> userHandler.register(routingContext));
        router.post("/user/login").handler(routingContext -> userHandler.login(routingContext));
        router.patch("/user/:username").handler(routingContext -> userHandler.update(routingContext));
        router.delete("/user/:username").handler(routingContext -> userHandler.delete(routingContext));

        httpServer.requestHandler(router).listen(8091);
        System.out.println("The server is ready");
    }
}
