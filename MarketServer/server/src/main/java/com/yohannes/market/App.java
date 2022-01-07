package com.yohannes.market;

import com.yohannes.market.handlers.CategoryHandler;
import com.yohannes.market.handlers.ProductHandler;
import com.yohannes.market.handlers.SubcategoryHandler;
import com.yohannes.market.handlers.UserHandler;
import com.yohannes.market.query_handlers.CategoryQuery;
import com.yohannes.market.query_handlers.ProductQuery;
import com.yohannes.market.query_handlers.SubcategoryQuery;
import com.yohannes.market.query_handlers.UserQuery;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;

/**
 * Hello world!
 *
 */
public class App {
    static Vertx vertx;
    static Connect connect;

    public static void main(String[] args) {
        vertx = Vertx.vertx();

        Connect connect = new Connect(vertx);

        UserQuery userSql = new UserQuery(connect.client);
        CategoryQuery categorySql = new CategoryQuery(connect.client);
        SubcategoryQuery subcategorySql = new SubcategoryQuery(connect.client);
        ProductQuery productSql = new ProductQuery(connect.client);

        UserHandler userHandler = new UserHandler(userSql);
        CategoryHandler categoryHandler = new CategoryHandler(categorySql);
        SubcategoryHandler subcategoryHandler = new SubcategoryHandler(subcategorySql);
        ProductHandler productHandler = new ProductHandler(productSql);

        HttpServer httpServer = vertx.createHttpServer();

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.GET));
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.POST));
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.PATCH));
        router.route().handler(CorsHandler.create().allowedMethod(HttpMethod.DELETE));
        router.post("/user/register").handler(routingContext -> userHandler.register(routingContext));
        router.post("/user/login").handler(routingContext -> userHandler.login(routingContext));
        router.patch("/user/:username").handler(routingContext -> userHandler.update(routingContext));
        router.delete("/user/:username").handler(routingContext -> userHandler.delete(routingContext));
        router.post("/category").handler(routingContext -> categoryHandler.createCategory(routingContext));
        router.get("/category/:name").handler(routingContext -> categoryHandler.getCategory(routingContext));
        router.get("/categories").handler(routingContext -> categoryHandler.fetchCategories(routingContext));
        router.patch("/category/:name").handler(routingContext -> categoryHandler.updateCategory(routingContext));
        router.delete("/category/:name").handler(routingContext -> categoryHandler.deleteCategory(routingContext));
        router.post("/subcategory/:category")
                .handler(routingContext -> subcategoryHandler.createSubcategory(routingContext));
        router.get("/subcategory/:category/:name")
                .handler(routingContext -> subcategoryHandler.getSubcategory(routingContext));
        router.get("/subcategories/:category")
                .handler(routingContext -> subcategoryHandler.fetchSubcategories(routingContext));
        router.patch("/subcategory/:category/:name")
                .handler(routingContext -> subcategoryHandler.updateSubcategory(routingContext));
        router.delete("/subcategory/:category/:name")
                .handler(routingContext -> subcategoryHandler.deleteSubcategory(routingContext));
        router.post("/product/:category/:subcategory")
                .handler(routingContext -> productHandler.createProduct(routingContext));
        router.get("/product/:category/:subcategory/:name")
                .handler(routingContext -> productHandler.getProduct(routingContext));
        router.get("/products/:category/:name")
                .handler(routingContext -> productHandler.getProductByCategory(routingContext));
        router.get("/products/:name")
                .handler(routingContext -> productHandler.getProductByBrand(routingContext));
        router.get("/products")
                .handler(routingContext -> productHandler.fetchProducts(routingContext));
        router.patch("/subcategory/:category/:subcategory/:name")
                .handler(routingContext -> productHandler.updateProduct(routingContext));
        router.delete("/subcategory/:category/:subcategory/:name")
                .handler(routingContext -> productHandler.deleteProduct(routingContext));

        httpServer.requestHandler(router).listen(8091);
        System.out.println("The server is ready");
    }
}
