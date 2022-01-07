package com.yohannes.market.handlers;

import com.yohannes.market.query_handlers.UserQuery;

import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;

public class UserHandler {
    public UserQuery sql;

    public UserHandler(UserQuery newsql) {
        sql = newsql;
    }

    public void register(RoutingContext routingContext) {
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String firstname = jsonObject.getString("firstname");
        String lastname = jsonObject.getString("lastname");
        String password = jsonObject.getString("password");
        Future<RowSet<Row>> output = sql.createUser(username, firstname, lastname, password);
        output.onSuccess(arr -> {
            routingContext.json(new JsonObject().put("success", true));
        }).onFailure(err -> {
            routingContext
                    .json(new JsonObject().put("success", false).put("error", "Username is already token"));
        });
    }

    public void login(RoutingContext routingContext) {
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        Future<RowSet<Row>> output = sql.getUser(username, password);
        output.onSuccess(arr -> {
            try {
                routingContext
                        .json(new JsonObject().put("success", true).mergeIn(arr.iterator().next().toJson()));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "Invalid Username/Password"));
            }

        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void update(RoutingContext routingContext) {
        String pUsername = routingContext.request().getParam("username");
        System.out.println(pUsername);
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String firstname = jsonObject.getString("firstname");
        String lastname = jsonObject.getString("lastname");
        String password = jsonObject.getString("password");
        Future<RowSet<Row>> output = sql.updateUser(pUsername, username, firstname, lastname, password);
        output.onSuccess(arr -> {
            if (arr.rowCount() == 0) {
                routingContext.json(new JsonObject().put("success", false).put("error", "You are not authenticated"));
            } else {
                routingContext.json(new JsonObject().put("success", true));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", "Username is already token")));
    }

    public void delete(RoutingContext routingContext) {
        {
            String username = routingContext.request().getParam("username");
            Future<RowSet<Row>> output = sql.deleteUser(username);
            output.onSuccess(arr -> {
                if (arr.rowCount() == 0) {
                    routingContext
                            .json(new JsonObject().put("success", false).put("error", "You are not authenticated"));
                } else {
                    routingContext.json(new JsonObject().put("success", true));
                }
            }).onFailure(err -> routingContext
                    .json(new JsonObject().put("success", false).put("error", err.getMessage())));
        }
    }
}
