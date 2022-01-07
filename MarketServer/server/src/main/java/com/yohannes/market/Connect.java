package com.yohannes.market;

import io.vertx.core.Vertx;
import io.vertx.pgclient.PgConnectOptions;
import io.vertx.pgclient.PgPool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.SqlClient;

public class Connect {

    public SqlClient client;

    public Connect(Vertx vertx) {

        PgConnectOptions pgConnectOptions = new PgConnectOptions().setPort(5432).setHost("localhost")
                .setDatabase("marketserver").setUser("postgres").setPassword("John*1234");

        PoolOptions poolOptions = new PoolOptions().setMaxSize(5);

        client = PgPool.client(vertx, pgConnectOptions, poolOptions);

        System.out.println("It is connected to database");
    }

}
