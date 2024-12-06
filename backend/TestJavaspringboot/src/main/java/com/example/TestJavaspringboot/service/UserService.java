package com.example.TestJavaspringboot.service;

import com.example.TestJavaspringboot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private RowMapper<User> userRowMapper = new RowMapper<>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new User(
                    rs.getInt("userid"),
                    rs.getString("username"),
                    rs.getString("password")
            );
        }
    };

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    @SuppressWarnings("deprecation")
    public User getUserById(int userid) {
        String sql = "SELECT * FROM users WHERE userid = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{userid}, userRowMapper);
    }

    public int createUser(User user) {
        String sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        return jdbcTemplate.update(sql, user.getUsername(), hashedPassword);
    }

    public int updateUser(int userid, User user) {
        String sql = "UPDATE users SET username = ?, password = ? WHERE userid = ?";
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        return jdbcTemplate.update(sql, user.getUsername(), hashedPassword, userid);
    }

    public int deleteUser(int userid) {
        String sql = "DELETE FROM users WHERE userid = ?";
        return jdbcTemplate.update(sql, userid);
    }

    public User login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ?";
        @SuppressWarnings("deprecation")
        List<User> users = jdbcTemplate.query(sql, new Object[]{username}, userRowMapper);
        if (users.isEmpty()) {
            return null;
        }
        User user = users.get(0); 
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }
    
    
}
