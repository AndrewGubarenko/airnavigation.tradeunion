
package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.AdminRepository;
import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.PlainDomain.SearchRequest;
import com.airnavigation.tradeunion.domain.Role;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.exceptions.EmptyDataFieldsException;
import com.airnavigation.tradeunion.exceptions.IllegalAccessAttemtException;
import com.airnavigation.tradeunion.services.interfaces.AdminServiceInterface;
import com.airnavigation.tradeunion.utilities.EmailServiceImpl;
import com.airnavigation.tradeunion.utilities.FileProcessor;
import com.airnavigation.tradeunion.utilities.TemporaryPasswordGenerator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@PreAuthorize("hasRole('ADMINISTRATOR')")
public class AdminService implements AdminServiceInterface {

    private static final Logger LOGGER = Logger.getLogger(AdminService.class);

    private final AdminRepository adminRepository;
    private final FileProcessor fileProcessor;
    private final TemporaryPasswordGenerator passwordGenerator;
    private final EmailServiceImpl emailService;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public AdminService (AdminRepository adminRepository,
                         FileProcessor fileProcessor,
                         TemporaryPasswordGenerator passwordGenerator,
                         EmailServiceImpl emailService,
                         BCryptPasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.fileProcessor = fileProcessor;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User createUser(User user) {
        String accessLevel;
        if(user.getUsername() == null
                || user.getUsername().trim().isEmpty()) {
            LOGGER.warn("METHOD CREATE: The username field is empty!");
            throw new EmptyDataFieldsException("Поле email - порожнє!");
        }
        user.setUsername(user.getUsername().trim());
        user.setFirstName(user.getFirstName().trim());
        user.setLastName(user.getLastName().trim());
        if (user.getCount() == null) {
            user.setCount(0.00);
        }
        if (user.getGender() == null) {
            user.setGender(Gender.MALE);
        }
        if(user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(new HashSet<>(Arrays.asList(Role.USER)));
            user.setPassword(passwordEncoder.encode(passwordGenerator.generateTemporaryPassword(15)));
            //TODO: remove this line
            System.out.println(user.getPassword());
            accessLevel = Role.USER.name();
        } else if(user.getRoles().contains(Role.ADMINISTRATOR)) {
            user.setPassword(passwordEncoder.encode(passwordGenerator.generateTemporaryPassword(30)));
            //TODO: remove this line
            System.out.println(user.getPassword());
            accessLevel = Role.ADMINISTRATOR.name();
        } else {
            user.getRoles().add(Role.USER);
            accessLevel = Role.USER.name();
            user.setPassword(passwordEncoder.encode(passwordGenerator.generateTemporaryPassword(15)));
            //TODO: remove this line
            System.out.println(user.getPassword());
        }
        adminRepository.save(user);
        //TODO: Enable this module before production
        /*emailService.sendSimpleMessage(user.getUsername(),
                                        "Реєстрація користувача",
                                        new StringBuilder().append("Вітаю! Вас зареєстровано на сайті профспілки Аеронавігація.\n")
                                                           .append("Ваш тимчасовий пароль для доступу до особистого кабінету: ")
                                                           .append(user.getPassword())
                                                           .append("\n")
                                                           .append("Радимо змінити цей пароль на свій власний. \n")
                                                           .append("Також радимо використовувати надійні паролі, наприклад ті, що генеруються Google.")
                                                           .append("Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.")
                                                .toString());*/
        LOGGER.info("METHOD CREATE: User with username: " + user.getUsername() + " and access level:" + accessLevel + " was created");
        return user;
    }

    @Override
    @Transactional
    public Set<User> updateDB(byte[] file, String fileExtension) throws IOException {
        Set<User> result = new LinkedHashSet<>();
        fileProcessor.readFileForDBCreation(file, fileExtension).forEach(user -> {
            if(user.getUsername() == null || user.getUsername().equals("")) {
                LOGGER.info("METHOD CREATE: User was not created. Username is null or empty");
                return;
            } else if(adminRepository.findByUsername(user.getUsername()).isPresent()) {
                LOGGER.info("METHOD CREATE: User with username " + user.getUsername() + " already exist");
                return;
            }
            User createdUser = this.createUser(user);
            LOGGER.info("METHOD CREATE: User with username " + createdUser.getUsername() + " was successfully created");
            result.add(createdUser);
        });
        return result;
    }

    @Override
    @Transactional
    public ArrayList<String> changeCount(byte[] file, String fileExtension) throws IOException {
        ArrayList<String> report = new ArrayList<>();
        List<String[]> processingResult = fileProcessor.readFileForCountChange(file, fileExtension);
        for(String[] userDataContainer: processingResult) {
            StringBuilder response = new StringBuilder();
            Optional<User> userForUpdateOpt = adminRepository.findByFirstNameAndLastNameIgnoreCase(userDataContainer[0], userDataContainer[1]);
            if(userForUpdateOpt.isPresent()) {
                User userForUpdate = userForUpdateOpt.get();
                userForUpdate.setCount(Double.valueOf(userDataContainer[2]));
                adminRepository.save(userForUpdate);
                response
                        .append("Рахунок для ")
                        .append(userDataContainer[0])
                        .append(" ")
                        .append(userDataContainer[1])
                        .append(" був успішно змінений;");
                report.add(response.toString());
                LOGGER.info(new StringBuilder().append("METHOD CHANGE_COUNT: Count of user with name ")
                                                .append(userDataContainer[0])
                                                .append(" ")
                                                .append(userDataContainer[1])
                                                .append(" has been successfully changed;"));
            } else {
                response
                        .append("Користувач з іменем ")
                        .append(userDataContainer[0])
                        .append(" ")
                        .append(userDataContainer[1])
                        .append(" не був знайдений у базі. Перевірте дані у таблиці;");
                report.add(response.toString());
                LOGGER.warn(new StringBuilder().append("METHOD CHANGE_COUNT: User with name ")
                                                .append(userDataContainer[0])
                                                .append(" ")
                                                .append(userDataContainer[1])
                                                .append(" has been not found in data base. Check input data!"));
            }
        }
        return report;
    }

    @Override
    @Transactional
    public List<User> getListOfUsers() {
        return adminRepository.findAll();
    }

    @Override
    @Transactional
    public User getUser(long id) {
        Optional<User> foundUserOpt = adminRepository.findById(id);
        if(!foundUserOpt.isPresent()) {
            LOGGER.warn("METHOD GET: User with id=" + id + " has been not found!");
            throw new NoSuchElementException("Такого користувача в базі не існує!");
        }
        return foundUserOpt.get();
    }

    @Override
    @Transactional
    public List<User> findUser(SearchRequest request) {
        List<User> foundUsers = adminRepository.findAllByUsernameOrFirstNameOrLastNameIgnoreCase (request.getUsername(), request.getFirstName(), request.getLastName());
        return foundUsers;
    }

    @Override
    @Transactional
    public User updateUser(long id, User updatedUser) {
        if(id != updatedUser.getId()) {
            LOGGER.warn("METHOD UPDATE: Unauthorized access attemption! HTTP request was changed! The id in path variable and user id does not match!");
            throw new IllegalAccessAttemtException("Спроба незаконного доступу до даних!");
        }
        Optional<User> userForUpdateOpt = adminRepository.findById(id);

        if(updatedUser.getFirstName() == null
                || updatedUser.getLastName() == null
                || updatedUser.getFirstName().trim().isEmpty()
                || updatedUser.getLastName().trim().isEmpty()) {
            LOGGER.warn("METHOD UPDATE: The firstName or lastName field , or both are empty!");
            throw new EmptyDataFieldsException("Поля first name або last name, або обидва є порожніми!");
        }
        if(!userForUpdateOpt.isPresent()) {
            LOGGER.warn("METHOD UPDATE: User with username " + updatedUser.getUsername() + " has been not found");
            throw new NoSuchElementException("Такого користувача не знайдено!");
        }

        User userForUpdate = userForUpdateOpt.get();
        userForUpdate.setFirstName(updatedUser.getFirstName().trim());
        userForUpdate.setLastName(updatedUser.getLastName().trim());
        userForUpdate.setGender(updatedUser.getGender());
        userForUpdate.setCount(updatedUser.getCount());

        if(!userForUpdate.getRoles().contains(Role.ADMINISTRATOR) && updatedUser.getRoles().contains(Role.ADMINISTRATOR)) {
            userForUpdate.setRoles(updatedUser.getRoles());
            userForUpdate.setPassword(passwordEncoder.encode(passwordGenerator.generateTemporaryPassword(30)));
            adminRepository.save(userForUpdate);
            /*emailService.sendSimpleMessage(user.getUsername(),
                                            "Встановлення рівня доступу Адміністратор",
                                            new StringBuilder().append("Ваш рівень доступу на сайті профспілки Аеронавігація було підвищено до рівня Адміністратор.\n")
                                                               .append("Ваш пароль на сайті профспілки Аеронавігація було перевстановлено.\n")
                                                               .append("Ваш новий пароль для доступу до особистого кабінету: ")
                                                               .append(userForUpdate.getPassword())
                                                               .append("\n")
                                                               .append("Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.")
                                                    .toString());*/
        } else if(userForUpdate.getRoles().contains(Role.ADMINISTRATOR) && !updatedUser.getRoles().contains(Role.ADMINISTRATOR)) {
            userForUpdate.setRoles(updatedUser.getRoles());
        } else {
            userForUpdate.setRoles(updatedUser.getRoles());
            adminRepository.save(userForUpdate);
            /*emailService.sendSimpleMessage(user.getUsername(),
                                            "Встановлення рівня доступу Адміністратор",
                                            new StringBuilder().append("Ваш рівень доступу на сайті профспілки Аеронавігація було знижено до рівня Користувач.\n")
                                                               .append("\n")
                                                               .append("Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.")
                                                    .toString());*/
        }
        LOGGER.info("METHOD UPDATE: User with username " + updatedUser.getUsername() + " was updated");
        return userForUpdate;
    }

    @Override
    @Transactional
    public String deleteUser(long id) {
        Optional<User> userForDeleteOpt = adminRepository.findById(id);
        StringBuilder response = new StringBuilder();
        if(!userForDeleteOpt.isPresent()) {
            LOGGER.warn(response.append("METHOD DELETE: User with username ")
                                .append(userForDeleteOpt.get().getUsername())
                                .append(" wasn't found"));
            throw new NoSuchElementException("Такого користувача не знайдено!");
        }
        adminRepository.delete(userForDeleteOpt.get());
        response.append("Користувача з email ")
                .append(userForDeleteOpt.get().getUsername())
                .append(" було успішно видалено!");

        return response.toString();
    }
    @Override
    public List<String> getLogs() throws IOException {
        List<String> response = new ArrayList<>();
        Path path = Paths.get("logs/ProjectLog.log");
        Files.readAllLines(path).forEach(str -> response.add(str));
        return response;
    }
}
