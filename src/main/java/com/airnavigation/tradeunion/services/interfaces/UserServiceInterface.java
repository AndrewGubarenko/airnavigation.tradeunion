package com.airnavigation.tradeunion.services.interfaces;

import com.airnavigation.tradeunion.domain.PlainDomain.ChangePassword;
import com.airnavigation.tradeunion.domain.User;

/**
 * @author Andrii Hubarenko
 * The interface for User Service class
 */
public interface UserServiceInterface {

    /**
     * Method for changing of user`s password
     * @param changePassword
     * @param id
     * @return String message with a status of operation
     */
    String changePassword(ChangePassword changePassword, long id);

    /**
     * Method for extraction of user by it`s Id
     * @param id
     * @return extracted user or throw exception
     */
    User getUser (long id);

    /**
     * Method that allow to reset the forgotten password for user.
     * @param email
     * @return
     */
    String resetPassword(String email);

}
