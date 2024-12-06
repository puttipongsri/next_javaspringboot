package com.example.TestJavaspringboot.model;

public class Product {
    private int id;
    private int userid;
    private String img;
    private String describe;

    public Product(int id, int userid, String img, String describe) {
        this.id = id;
        this.userid = userid;
        this.img = img;
        this.describe = describe;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserid() { return userid; }
    public void setUserid(int userid) { this.userid = userid; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }

    public String getDescribe() { return describe; }
    public void setDescribe(String describe) { this.describe = describe; }
}
