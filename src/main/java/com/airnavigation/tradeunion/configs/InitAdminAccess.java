package com.airnavigation.tradeunion.configs;

import com.airnavigation.tradeunion.Repositories.AdminRepository;
import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.Role;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.services.AdminService;
import com.airnavigation.tradeunion.utilities.EmailServiceImpl;
import com.airnavigation.tradeunion.utilities.TemporaryPasswordGenerator;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashSet;

@Component
class InitAdminAccess {

    private static final Logger LOGGER = Logger.getLogger(AdminService.class);

    private final AdminRepository adminRepository;
    private final TemporaryPasswordGenerator passwordGenerator;
    private final EmailServiceImpl emailService;

    public InitAdminAccess(AdminRepository adminRepository,
                           TemporaryPasswordGenerator passwordGenerator,
                           EmailServiceImpl emailService) {
        this.adminRepository = adminRepository;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
    }

    @PostConstruct
    @Transactional
    protected void createDefaultUsers() {
        User user = adminRepository.save(
                User.builder().username("andrewgubarenko@gmail.com")
                        .password(passwordGenerator.generateTemporaryPassword(30))
                        .firstName("Андрій Сергійович")
                        .lastName("Губаренко")
                        .count(0.00)
                        .gender(Gender.MALE)
                        .roles(new HashSet<>(Arrays.asList(Role.ADMINISTRATOR, Role.USER)))
                        .build()
        );
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
        LOGGER.info("METHOD CREATE: User with username: " + user.getUsername() + " and access level:" + Role.ADMINISTRATOR.name() + " was created");
    }
}
