package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.domain.PlainDomain.ChangePassword;
import com.airnavigation.tradeunion.domain.PlainDomain.Feedback;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Andrii Hubarenko
 * The REST controller for processing user`s requests
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserServiceInterface userService;

    @Autowired
    public UserController (UserServiceInterface userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<User> getUser (@PathVariable long id) {
        User response = userService.getUser(id);
        response.setPassword("");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/{id}/password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePassword changePassword,
                                                 @PathVariable long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.changePassword(changePassword, id));
    }

    /**
     * Controller for getting a feedback from user
     */
    @PostMapping(path = "/feedback", consumes = "application/json")
    public ResponseEntity<String> getEmail (@RequestBody Feedback feedback) {
        String result = userService.receiveEmailFromUser(feedback);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /**
     * email service
     */
    @PostMapping(path = "/{id}/questionnaire", consumes = "application/json")
    public ResponseEntity<Questionnaire> saveQuestionnaire (@RequestBody Questionnaire questionnaire,
                                                            @PathVariable long id) {
        Questionnaire result = userService.saveQuestionnaire(id, questionnaire);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
