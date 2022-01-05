package com.yohannes.marketserver;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.Tuple;

public class Connect {

    static MySQLPool client;

    public Connect(Vertx vertx) {
        MySQLConnectOptions connectOptions = new MySQLConnectOptions().setPort(5432).setHost("localhost")
                .setDatabase("marketserver").setUser("jolaravel").setPassword("st.yohannes");

        PoolOptions poolOptions = new PoolOptions().setMaxSize(5);

        client = MySQLPool.pool(vertx, connectOptions, poolOptions);
    }

    public static void main(String[] args) {
    }

    public Future<RowSet<Row>> createUser(String username, String firstname, String lastname, String password) {
        return client
                .preparedQuery("INSERT INTO user (firstname, lastname, username, password) VALUES (?, ?, ?, ?)")
                .execute(Tuple.of(firstname, lastname, username, password));
    }

    public Future<RowSet<Row>> getUser(String username) {
        return client
                .preparedQuery("SELECT * FROM user WHERE username = ?")
                .execute(Tuple.of(username));
    }

    public Future<RowSet<Row>> updateUser(String username, String firstname, String lastname, String password) {
        return client
                .preparedQuery("UPDATE user SET firstname = ?, lastname = ?, password = ? WHERE username = ?")
                .execute(Tuple.of(firstname, lastname, password, username));
    }

    public Future<RowSet<Row>> deleteUser(String username) {
        return client
                .preparedQuery("DELETE FROM user WHERE username = ?")
                .execute(Tuple.of(username));
    }

    public void createCategory() {

    }

    public void getCategory() {

    }

    public void updateCategory() {

    }

    public void deleteCategory() {

    }

    public void createSubCategory() {

    }

    public void getSubCategory() {

    }

    public void updateSubCategory() {

    }

    public void deleteSubCategory() {

    }

    public void createProduct() {

    }

    public void getProduct() {

    }

    public void updateProduct() {

    }

    public void deleteProduct() {

    }

}
