package com.yohannes.market.handlers;

import com.yohannes.market.query_handlers.SubcategoryQuery;

import io.vertx.core.Future;
import io.vertx.core.MultiMap;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;

public class SubcategoryHandler {
    public SubcategoryQuery sql;

    public SubcategoryHandler(SubcategoryQuery newsql) {
        sql = newsql;
    }

    public void createSubcategory(RoutingContext routingContext) {
        String category_name = routingContext.request().getParam("category");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String name = jsonObject.getString("name");
        String description = jsonObject.getString("description");
        Future<RowSet<Row>> output = sql.createSubcategory(username, category_name, name, description);
        output.onSuccess(arr -> {
            routingContext.json(new JsonObject().put("success", true));

        }).onFailure(err -> {
            System.out.println(err.getMessage());
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

    public void getSubcategory(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        String category_name = routingContext.request().getParam("category");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        Future<RowSet<Row>> output = sql.getSubcategory(username, category_name, name);
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

    public void fetchSubcategories(RoutingContext routingContext) {
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        JsonArray jsonArray = new JsonArray();
        Future<RowSet<Row>> output = sql.fetchSubcategories(username);
        output.onSuccess(arr -> {
            try {
                arr.forEach(item -> jsonArray.add(item.toJson()));
                routingContext
                        .json(new JsonObject().put("success", true).put("data", jsonArray));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "No subcategory with this name"));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void updateSubcategory(RoutingContext routingContext) {
        String category_name = routingContext.request().getParam("category");
        String pName = routingContext.request().getParam("name");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String name = jsonObject.getString("name");
        String description = jsonObject.getString("description");
        String pCategoryName = jsonObject.getString("previous_category_name");
        if (pCategoryName == null) {
            pCategoryName = category_name;
        }
        Future<RowSet<Row>> output = sql.updateSubcategory(pName, pCategoryName, username, category_name, name,
                description);
        output.onSuccess(arr -> {
            if (arr.rowCount() == 0) {
                routingContext.json(new JsonObject().put("success", false).put("error", "You are not authenticated"));
            } else {
                routingContext.json(new JsonObject().put("success", true));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", "name is already token")));
    }

    public void deleteSubcategory(RoutingContext routingContext) {
        String category_name = routingContext.request().getParam("category");
        String name = routingContext.request().getParam("name");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        Future<RowSet<Row>> output = sql.deleteSubcategory(username, category_name, name);
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
