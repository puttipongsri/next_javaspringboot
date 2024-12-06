package com.example.TestJavaspringboot.service;

import com.example.TestJavaspringboot.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private RowMapper<Product> productRowMapper = new RowMapper<>() {
        @Override
        public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
            String baseUrl = "http://localhost:8080/products/images/";
            return new Product(
                    rs.getInt("id"),
                    rs.getInt("userid"),
                    baseUrl + rs.getString("img"),
                    rs.getString("describe")
            );
        }
    };

    public List<Product> getAllProducts() {
        String sql = "SELECT * FROM product";
        return jdbcTemplate.query(sql, productRowMapper);
    }
    public int saveProduct(int userid, String fileName, String describe) {
        System.out.println(userid+fileName+describe);
        String sql = "INSERT INTO product (userid, img, `describe`) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, userid, fileName, describe);
    }
    
}
