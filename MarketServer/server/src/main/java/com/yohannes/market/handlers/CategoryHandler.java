package com.yohannes.market.handlers;

import com.yohannes.market.query_handlers.CategoryQuery;

import io.vertx.core.Future;
import io.vertx.core.MultiMap;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;

public class CategoryHandler {
    public CategoryQuery sql;

    public CategoryHandler(CategoryQuery newsql) {
        sql = newsql;
    }

    public void createCategory(RoutingContext routingContext) {
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String name = jsonObject.getString("name");
        String description = jsonObject.getString("description");
        Future<RowSet<Row>> output = sql.createCategory(username, name, description);
        output.onSuccess(arr -> {
            routingContext.json(new JsonObject().put("success", true));

        }).onFailure(err -> {
            System.out.print(err.getMessage());
            String error = "";
            if (err.getMessage().contains("23503")) {
                error = "You are not authenticated";
            } else {
                error = "name is already token";
            }
            routingContext
                    .json(new JsonObject().put("success", false).put("error", error));
        });
    }

    public void getCategory(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        Future<RowSet<Row>> output = sql.getCategory(username, name);
        output.onSuccess(arr -> {
            try {
                routingContext
                        .json(new JsonObject().put("success", true).mergeIn(arr.iterator().next().toJson()));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "No category with this name"));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void fetchCategories(RoutingContext routingContext) {
        JsonArray jsonArray = new JsonArray();
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        Future<RowSet<Row>> output = sql.fetchCategories(username);
        output.onSuccess(arr -> {
            try {
                arr.forEach(item -> jsonArray.add(item.toJson()));
                routingContext
                        .json(new JsonObject().put("success", true).put("data", jsonArray));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "No category with this name"));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void updateCategory(RoutingContext routingContext) {
        String pName = routingContext.request().getParam("name");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String name = jsonObject.getString("name");
        String description = jsonObject.getString("description");
        Future<RowSet<Row>> output = sql.updateCategory(pName, username, name, description);
        output.onSuccess(arr -> {
            if (arr.rowCount() == 0) {
                routingContext.json(new JsonObject().put("success", false).put("error", "You are not authenticated"));
            } else {
                routingContext.json(new JsonObject().put("success", true));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", "name is already token")));
    }

    public void deleteCategory(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        Future<RowSet<Row>> output = sql.deleteCategory(username, name);
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
