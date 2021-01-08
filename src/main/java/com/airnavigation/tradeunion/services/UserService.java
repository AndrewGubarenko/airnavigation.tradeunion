package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.UserRepository;
import com.airnavigation.tradeunion.domain.PlainDomain.ChangePassword;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.exceptions.EmptyDataFieldsException;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import com.airnavigation.tradeunion.utilities.EmailServiceImpl;
import com.airnavigation.tradeunion.utilities.TemporaryPasswordGenerator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService implements UserServiceInterface {

    private static final Logger LOGGER = Logger.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final TemporaryPasswordGenerator passwordGenerator;
    private final EmailServiceImpl emailService;

    @Autowired
    public UserService (UserRepository userRepository,
                        TemporaryPasswordGenerator passwordGenerator,
                        EmailServiceImpl emailService) {
        this.userRepository = userRepository;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public String changePassword(ChangePassword changePassword, long id) {
        String response;
        Optional<User> userForUpdateOpt = userRepository.findById(id);

        if(!userForUpdateOpt.isPresent()) {
            response = "Користувача не було знайдено";
            LOGGER.warn(response);
            throw new NoSuchElementException(response);
        } else if (changePassword.getNewPassword() == null || changePassword.getNewPassword().trim().isEmpty()) {
            LOGGER.warn("METHOD CHANGE_PASSWORD: New password field is empty");
            throw new EmptyDataFieldsException("ОТ ХАЛЕПА! Поле Новий пароль порожнє");
        } else if(changePassword.getCurrentPassword() == null || changePassword.getCurrentPassword().trim().isEmpty()) {
            LOGGER.warn("METHOD CHANGE_PASSWORD: Current password field is empty");
            throw new EmptyDataFieldsException("ОТ ХАЛЕПА! Поле Поточний пароль порожнє");
        } else if(!userForUpdateOpt.get().getPassword().equals(changePassword.getCurrentPassword())) {
            LOGGER.warn("METHOD CHANGE_PASSWORD: Wrong current password");
            throw new EmptyDataFieldsException("Неправильний поточний пароль");
        } else {
            User userForUpdate = userForUpdateOpt.get();
            userForUpdate.setPassword(changePassword.getNewPassword());
            userRepository.save(userForUpdate);
            response = "УСПІШНО! Пароль було успішно змінено!";
            return response;
        }
    }

    @Override
    @Transactional
    public User getUser(long id) {
        Optional<User> foundUserOpt = userRepository.findById(id);
        if(!foundUserOpt.isPresent()) {
            LOGGER.warn("METHOD GET_USER: User with id=" + id + " has been not found!");
            throw new NoSuchElementException("Користувача не було знайдено!");
        }
        return foundUserOpt.get();
    }

    @Transactional
    public String resetPassword(String email) {
        Optional<User> foundUserOpt = userRepository.findByUsername(email);
        StringBuilder response = new StringBuilder();
        if(foundUserOpt.isPresent()) {
            User user = foundUserOpt.get();
            user.setPassword(passwordGenerator.generateTemporaryPassword());
            userRepository.save(user);
            /*emailService.sendSimpleMessage(user.getUsername(),
                                            "Відновлення паролю",
                                            new StringBuilder().append("Вітаю! Ваш пароль на сайті профспілки Аеронавігація було перевстановлено.\n")
                                                               .append("Ваш новийтимчасовий пароль для доступу до особистого кабінету: ")
                                                               .append(user.getPassword())
                                                               .append("\n")
                                                               .append("Якщо ви не виконували цієї дії, негайно зверніться до адміністратора. \n")
                                                               .append("Радимо змінити цей пароль на свій власний. \n")
                                                               .append("Також радимо використовувати надійні паролі, наприклад ті, що генеруються Google.")
                                                               .append("Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.")
                                                    .toString());*/
            response.append("УСПІШНО: На ваш email ")
                    .append(email)
                    .append(" було відправлено листа. Перевірте пошту.");
            LOGGER.info(response);
        } else {
            response.append("Користувача з email ")
                    .append(email)
                    .append(" не було знайдено!");
            LOGGER.warn(response);
            throw new NoSuchElementException(response.toString());
        }

        return response.toString();
    }

}
