package com.example.TestJavaspringboot.model;

public class User {
    private int userid; 
    private String username;
    private String password;

    // Constructor
    public User(int userid, String username, String password) {
        this.userid = userid;      
        this.username = username;   
        this.password = password;
    }

    // Getters and Setters
    public int getUserid() { return userid; } 
    public void setUserid(int userid) { this.userid = userid; } 

    public String getUsername() { return username; } 
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
