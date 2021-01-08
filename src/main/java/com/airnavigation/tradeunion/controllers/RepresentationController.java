package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.domain.PlainDomain.RepresentationContainer;
import com.airnavigation.tradeunion.services.RepresentationService;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Andrii Hubarenko
 * Controller for Main Page
 */
@RestController
public class RepresentationController {

    private final RepresentationService service;
    private final UserServiceInterface userService;

    @Autowired
    public RepresentationController(RepresentationService service,
                                    UserServiceInterface userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping(path = "/main")
    public ResponseEntity<RepresentationContainer> getFiles() {
        RepresentationContainer result = service.createRepresentation();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @PutMapping(path = "/password")
    public ResponseEntity<String> resetPassword(@RequestBody String email) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.resetPassword(email));
    }
}
