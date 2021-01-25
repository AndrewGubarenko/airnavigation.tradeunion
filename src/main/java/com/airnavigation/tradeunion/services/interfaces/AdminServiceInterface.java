package com.airnavigation.tradeunion.services.interfaces;

import com.airnavigation.tradeunion.domain.PlainDomain.SearchRequest;
import com.airnavigation.tradeunion.domain.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Andrii Hubarenko
 * Interface for Administrator Service class
 */
public interface AdminServiceInterface {

    /**
     * Method for creating user in data base
     * @param user
     * @return created user or throw exception
     */
    User createUser (User user);

    /**
     * Method for initial creation and further updating of data base
     * @param file
     * @param fileExtension
     * @return
     * @throws IOException
     */
    Set<User> updateDB(byte[] file, String fileExtension) throws IOException;

    /**
     * Method for changing the amount of money in the account of user
     * @param file
     * @throws IOException
     * @return Array of String messages with status of the operation
     */
    ArrayList<String> changeCount(byte[] file, String fileExtension) throws IOException;

    /**
     * Method for retrieving of all users from the data base
     * @return List of users
     */
    List<User> getListOfUsers();

    /**
     * Method for retrieving a single user
     * @param id
     * @return user
     */
    User getUser(long id);

    /**
     * Method for serching user by it`s username, firstName or lastName, that request contains
     * @param request
     * @return List of found users
     */
    List<User> findUser(SearchRequest request);

    /**
     * Method for updating of user`s first name and last name
     * @param id
     * @param updatedUser
     * @return the updated user or throw exception
     */
    User updateUser (long id, User updatedUser);

    /**
     * Method for removing user from data base by it`s Id
     * @param id
     * @return String message with a status of operation
     */
    String deleteUser (long id);

    /**
     * Method for retrieving server logs
     * @param amountOfLogs
     * @return list of logs with length equals amountOfLogs
     * @throws IOException
     */
    List<String> getLogs(int amountOfLogs) throws IOException;
}
