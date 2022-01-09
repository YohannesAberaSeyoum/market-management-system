package com.yohannes.market.handlers;

import com.yohannes.market.query_handlers.ProductQuery;

import io.vertx.core.Future;
import io.vertx.core.MultiMap;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;

public class ProductHandler {
    public ProductQuery sql;

    public ProductHandler(ProductQuery newsql) {
        sql = newsql;
    }

    public void createProduct(RoutingContext routingContext) {
        String category_name = routingContext.request().getParam("category");
        String subcategory_name = routingContext.request().getParam("subcategory");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String name = jsonObject.getString("name");
        int quantity = jsonObject.getInteger("quantity");
        String description = jsonObject.getString("description");
        Future<RowSet<Row>> output = sql.createProduct(username, category_name, subcategory_name, name, description,
                quantity);
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

    public void getProduct(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        String category_name = routingContext.request().getParam("category");
        String subcategory_name = routingContext.request().getParam("subcategory");
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        Future<RowSet<Row>> output = sql.getProduct(username, category_name, subcategory_name, name);
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

    public void getProductByCategory(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        String category_name = routingContext.request().getParam("category");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        JsonArray jsonArray = new JsonArray();
        String username = jsonObject.getString("username");
        Future<RowSet<Row>> output = sql.getProductByCategory(username, category_name, name);
        output.onSuccess(arr -> {
            try {
                arr.forEach(item -> jsonArray.add(item.toJson()));
                routingContext
                        .json(new JsonObject().put("success", true).put("data", jsonArray));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "No Product with this name"));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void getProductByBrand(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        JsonArray jsonArray = new JsonArray();
        String username = jsonObject.getString("username");
        Future<RowSet<Row>> output = sql.getProductByBrand(username, name);
        output.onSuccess(arr -> {
            try {
                arr.forEach(item -> jsonArray.add(item.toJson()));
                routingContext
                        .json(new JsonObject().put("success", true).put("data", jsonArray));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "No product with this name"));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void fetchProducts(RoutingContext routingContext) {
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        JsonArray jsonArray = new JsonArray();
        Future<RowSet<Row>> output = sql.fetchProducts(username);
        output.onSuccess(arr -> {
            try {
                arr.forEach(item -> jsonArray.add(item.toJson()));
                routingContext
                        .json(new JsonObject().put("success", true).put("data", jsonArray));
            } catch (Exception e) {
                routingContext
                        .json(new JsonObject().put("success", false).put("error", "No product with this name"));
            }
        }).onFailure(err -> routingContext
                .json(new JsonObject().put("success", false).put("error", err.getMessage())));
    }

    public void updateProduct(RoutingContext routingContext) {
        String pName = routingContext.request().getParam("name");
        String pCategoryName = routingContext.request().getParam("category");
        String pSubcategoryName = routingContext.request().getParam("subcategory");
        JsonObject jsonObject = routingContext.getBodyAsJson();
        String username = jsonObject.getString("username");
        String name = jsonObject.getString("name");
        String description = jsonObject.getString("description");
        String category_name = jsonObject.getString("category_name");
        String subcategory_name = jsonObject.getString("subcategory_name");
        int quantity = jsonObject.getInteger("quantity");
        Future<RowSet<Row>> output = sql.updateProduct(pName, pCategoryName, pSubcategoryName, username,
                category_name, subcategory_name, name, description, quantity);
        output.onSuccess(arr -> {
            if (arr.rowCount() == 0) {
                routingContext.json(new JsonObject().put("success", false).put("error", "You are not authenticated"));
            } else {
                routingContext.json(new JsonObject().put("success", true));
            }
        }).onFailure(err -> {
            System.out.println(err.getMessage());
            routingContext
                    .json(new JsonObject().put("success", false).put("error", "name is already token"));
        });
    }

    public void deleteProduct(RoutingContext routingContext) {
        String name = routingContext.request().getParam("name");
        String category_name = routingContext.request().getParam("category");
        String subcategory_name = routingContext.request().getParam("subcategory");
        MultiMap headers = routingContext.queryParams();
        String username = headers.get("username");
        Future<RowSet<Row>> output = sql.deleteProduct(username, category_name, subcategory_name, name);
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
