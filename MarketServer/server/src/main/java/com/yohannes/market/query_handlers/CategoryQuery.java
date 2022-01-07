package com.yohannes.market.query_handlers;

import io.vertx.core.Future;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.SqlClient;
import io.vertx.sqlclient.Tuple;

/**
 * CategoryQuery
 */
public class CategoryQuery {
    static SqlClient client;

    public CategoryQuery(SqlClient newClient) {
        client = newClient;
    }

    public Future<RowSet<Row>> createCategory(String username, String name, String description) {
        return client
                .preparedQuery("INSERT INTO categories (username, name, description) VALUES ($1, $2, $3)")
                .execute(Tuple.of(username, name, description));
    }

    public Future<RowSet<Row>> getCategory(String username, String name) {
        return client.preparedQuery("SELECT * FROM categories WHERE username = $1 AND name = $2")
                .execute(Tuple.of(username, name));
    }

    public Future<RowSet<Row>> fetchCategories(String username) {
        return client.preparedQuery("SELECT * FROM categories WHERE username = $1")
                .execute(Tuple.of(username));
    }

    public Future<RowSet<Row>> updateCategory(String pName, String username, String name, String description) {
        return client
                .preparedQuery("UPDATE categories SET name = $1, description = $2 WHERE name = $3 AND username = $4")
                .execute(Tuple.of(name, description, pName, username));
    }

    public Future<RowSet<Row>> deleteCategory(String username, String name) {
        return client.preparedQuery("DELETE FROM categories WHERE name = $1 AND username = $2")
                .execute(Tuple.of(name, username));
    }

}