package com.yohannes.market.query_handlers;

import io.vertx.core.Future;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.SqlClient;
import io.vertx.sqlclient.Tuple;

public class UserQuery {

    static SqlClient client;

    public UserQuery(SqlClient newClient) {
        client = newClient;
    }

    public Future<RowSet<Row>> createUser(String username, String firstname, String lastname, String password) {
        return client
                .preparedQuery("INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)")
                .execute(Tuple.of(firstname, lastname, username, password));
    }

    public Future<RowSet<Row>> getUser(String username, String password) {
        return client
                .preparedQuery("SELECT * FROM users WHERE username = $1 AND password = $2")
                .execute(Tuple.of(username, password));
    }

    public Future<RowSet<Row>> updateUser(String pUsername, String username, String firstname, String lastname,
            String password) {
        return client
                .preparedQuery(
                        "UPDATE users SET firstname = $1, lastname = $2, password = $3, username=$4 WHERE username = $5")
                .execute(Tuple.of(firstname, lastname, password, username, pUsername));
    }

    public Future<RowSet<Row>> deleteUser(String username) {
        return client
                .preparedQuery("DELETE FROM users WHERE username = $1")
                .execute(Tuple.of(username));
    }
}
