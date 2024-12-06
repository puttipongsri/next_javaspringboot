package com.example.TestJavaspringboot.controller;

import com.example.TestJavaspringboot.model.Product;
import com.example.TestJavaspringboot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
        String uploadDir = "E:/next_java/backend/TestJavaspringboot/src/main/resources/product-images";
        Path imagePath = Paths.get(uploadDir, filename);

        if (Files.exists(imagePath)) {
            try {
                byte[] imageBytes = Files.readAllBytes(imagePath);
                return ResponseEntity.ok()
                        .header("Content-Type", Files.probeContentType(imagePath))
                        .body(imageBytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Endpoint สำหรับอัปโหลดสินค้า
    @PostMapping("/upload")
    public ResponseEntity<String> uploadProduct(
            @RequestParam("userid") int userid,
            @RequestParam("file") MultipartFile file,
            @RequestParam("describe") String describe) {

        String uploadDir = "E:/next_java/backend/TestJavaspringboot/src/main/resources/product-images";

        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                return new ResponseEntity<>("Failed to create directory.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        String fileName = userid + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadFilePath = path.resolve(fileName);

        try {
            file.transferTo(uploadFilePath.toFile());

            productService.saveProduct(userid, fileName, describe);

            return new ResponseEntity<>("Product uploaded successfully!", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload product.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
