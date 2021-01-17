package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.domain.File;
import com.airnavigation.tradeunion.domain.News;
import com.airnavigation.tradeunion.domain.PlainDomain.SearchRequest;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.services.FileService;
import com.airnavigation.tradeunion.services.NewsService;
import com.airnavigation.tradeunion.services.interfaces.AdminServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Andrii Hubarenko
 * Controller for administrator
 */
@RestController
@RequestMapping("/administrator")
public class AdminController {

    private final AdminServiceInterface adminService;
    private final FileService fileService;
    private final NewsService newsService;

    @Autowired
    public AdminController(AdminServiceInterface adminService,
                           FileService fileService,
                           NewsService newsService) {
        this.adminService = adminService;
        this.fileService = fileService;
        this.newsService = newsService;
    }

    /**
     * Data base section
     */

    @PutMapping(path = "/data_base", consumes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<Set<User>> updateDatabaseXLSX (@RequestBody byte[] file) throws IOException {
        Set<User> response = adminService.updateDB(file, "xlsx");
        response.forEach(user -> user.setPassword(""));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/data_base", consumes = "application/vnd.ms-excel")
    public ResponseEntity<Set<User>> updateDatabaseXLS (@RequestBody byte[] file) throws IOException {
        Set<User> response = adminService.updateDB(file, "xls");
        response.forEach(user -> user.setPassword(""));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * Finance section
     */

    @PutMapping(path = "/finance_data", consumes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<ArrayList<String>> updateFinancialDataXLSX (@RequestBody byte[] file) throws IOException {
        ArrayList<String> response = adminService.changeCount(file, "xlsx");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/finance_data", consumes = "application/vnd.ms-excel")
    public ResponseEntity<ArrayList<String>> updateFinancialDataXLS (@RequestBody byte[] file) throws IOException {
        ArrayList<String> response = adminService.changeCount(file, "xls");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * User section
     */

    @PostMapping(path = "/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User response = adminService.createUser(user);
        response.setPassword("");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(path = "/users_list")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = adminService.getListOfUsers();
        response.forEach(user -> user.setPassword(""));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(path = "/user/filter")
    public ResponseEntity<List<User>> getUser(@RequestBody SearchRequest request) {
        List<User> response = adminService.findUser(request);
        response.forEach(user -> user.setPassword(""));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user) {
        User response = adminService.updateUser(id, user);
        response.setPassword("");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id) {
        String response = adminService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * File section
     */

    @PostMapping(path = "/file")
    public ResponseEntity<File> saveFile(@RequestBody File file) {
        File response = fileService.addFile(file);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/files_list")
    public ResponseEntity<List<File>> getFiles() {
        List<File> response = fileService.getFiles();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/file/{id}")
    public ResponseEntity<File> getSingleFile(@PathVariable long id) {
        File response = fileService.getSingleFile(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/file/{id}")
    public ResponseEntity<File> updateFile(@RequestBody File file, @PathVariable long id) {
        File response = fileService.changeFile(file, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/file/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable long id) {
        String response = fileService.deleteFile(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * News section
     */

    @PostMapping(path = "/news")
    public ResponseEntity<News> createNews(@RequestBody News news) {
        News response = newsService.createNews(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(path = "/news_list")
    public ResponseEntity<List<News>> getListOfNews() {
        List<News> response = newsService.getListOfNews();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/news/{id}")
    public ResponseEntity<News> getSingleNews(@PathVariable long id) {
        News response = newsService.getSingleNews(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/news/{id}")
    public ResponseEntity<News> updateNews(@RequestBody News news, @PathVariable long id) {
        News response = newsService.changeNews(news, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/news/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable long id) {
        String response = newsService.deleteNews(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/logs")
    public ResponseEntity<List<String>> getLogs() throws IOException {
        List<String> response = adminService.getLogs();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
