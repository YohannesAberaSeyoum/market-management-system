package com.yohannes.market.query_handlers;

import io.vertx.core.Future;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.SqlClient;
import io.vertx.sqlclient.Tuple;

public class ProductQuery {
    static SqlClient client;

    public ProductQuery(SqlClient newClient) {
        client = newClient;
    }

    public Future<RowSet<Row>> createProduct(String username, String category_name, String subcategory_name,
            String name,
            String description, int quantity) {
        return client
                .preparedQuery(
                        "INSERT INTO products (username, category_name, subcategory_name, name, description, quantity) VALUES ($1, $2, $3, $4, $5, $6)")
                .execute(Tuple.of(username, category_name, subcategory_name, name, description, quantity));
    }

    public Future<RowSet<Row>> getProduct(String username, String category_name, String subcategory_name, String name) {
        return client
                .preparedQuery(
                        "SELECT * FROM products WHERE username = $1 AND category_name = $2 AND subcategory_name = $3 AND name = $4")
                .execute(Tuple.of(username, category_name, subcategory_name, name));
    }

    public Future<RowSet<Row>> getProductByCategory(String username, String category_name, String name) {
        return client
                .preparedQuery("SELECT * FROM products WHERE username = $1 AND category_name = $2 AND name = $3")
                .execute(Tuple.of(username, category_name, name));
    }

    public Future<RowSet<Row>> getProductByBrand(String username, String name) {
        return client
                .preparedQuery("SELECT * FROM products WHERE username = $1 AND name = $2")
                .execute(Tuple.of(username, name));
    }

    public Future<RowSet<Row>> fetchProducts(String username) {
        return client.preparedQuery("SELECT * FROM products WHERE username = $1")
                .execute(Tuple.of(username));
    }

    public Future<RowSet<Row>> updateProduct(String pName, String pCategoryName, String pSubcategoryName,
            String username, String category_name, String subcategory_name, String name, String description,
            int quantity) {
        return client
                .preparedQuery(
                        "UPDATE products SET name = $1, description = $2, category_name = $3, subcategory_name = $4 WHERE name = $5 AND username = $6 AND category_name = $7 AND subcategory_name = $8")
                .execute(Tuple.of(name, description, category_name, pName, username, pCategoryName, pSubcategoryName));
    }

    public Future<RowSet<Row>> deleteProduct(String username, String category_name, String subcategory_name,
            String name) {
        return client
                .preparedQuery(
                        "DELETE FROM products WHERE name = $1 AND username = $2 AND category_name = $3 AND subcategory_name = $4")
                .execute(Tuple.of(name, username, category_name, subcategory_name));
    }
}
