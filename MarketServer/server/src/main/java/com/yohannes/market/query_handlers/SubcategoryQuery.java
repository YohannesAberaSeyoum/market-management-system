package com.yohannes.market.query_handlers;

import io.vertx.core.Future;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.SqlClient;
import io.vertx.sqlclient.Tuple;

public class SubcategoryQuery {
        static SqlClient client;

        public SubcategoryQuery(SqlClient newClient) {
                client = newClient;
        }

        public Future<RowSet<Row>> createSubcategory(String username, String category_name, String name,
                        String description) {
                return client
                                .preparedQuery(
                                                "INSERT INTO subcategories (username, category_name, name, description) VALUES ($1, $2, $3, $4)")
                                .execute(Tuple.of(username, category_name, name, description));
        }

        public Future<RowSet<Row>> getSubcategory(String username, String category_name, String name) {
                return client
                                .preparedQuery("SELECT * FROM subcategories WHERE username = $1 AND category_name = $2 AND name = $3")
                                .execute(Tuple.of(username, category_name, name));
        }

        public Future<RowSet<Row>> fetchSubcategories(String username) {
                return client.preparedQuery("SELECT * FROM subcategories WHERE username = $1")
                                .execute(Tuple.of(username));
        }

        public Future<RowSet<Row>> updateSubcategory(String pName, String pCategoryName, String username,
                        String category_name,
                        String name,
                        String description) {
                return client
                                .preparedQuery(
                                                "UPDATE subcategories SET name = $1, description = $2, category_name = $3 WHERE name = $4 AND username = $5 AND category_name = $6")
                                .execute(Tuple.of(name, description, category_name, pName, username, pCategoryName));
        }

        public Future<RowSet<Row>> deleteSubcategory(String username, String category_name, String name) {
                return client
                                .preparedQuery("DELETE FROM subcategories WHERE name = $1 AND username = $2 AND category_name = $3")
                                .execute(Tuple.of(name, username, category_name));
        }
}
