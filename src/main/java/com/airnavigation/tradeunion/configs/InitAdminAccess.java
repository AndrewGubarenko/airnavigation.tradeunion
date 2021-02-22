package com.airnavigation.tradeunion.configs;

import com.airnavigation.tradeunion.Repositories.AdminRepository;
import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.Role;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.services.AdminService;
import com.airnavigation.tradeunion.utilities.EmailServiceImpl;
import com.airnavigation.tradeunion.utilities.TemporaryPasswordGenerator;
import org.apache.log4j.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

@Component
class InitAdminAccess {

    private static final Logger LOGGER = Logger.getLogger(AdminService.class);

    private final AdminRepository adminRepository;
    private final TemporaryPasswordGenerator passwordGenerator;
    private final EmailServiceImpl emailService;
    private final PasswordEncoder passwordEncoder;

    public InitAdminAccess(AdminRepository adminRepository,
                           TemporaryPasswordGenerator passwordGenerator,
                           EmailServiceImpl emailService,
                           PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    @Transactional
    protected void createDefaultUsers() {
        //TODO: Repair this row
        String password = "123"/*passwordGenerator.generateTemporaryPassword(30)*/;
        User user = adminRepository.save(
                //TODO: Repair this row
                User.builder().username("123")
                        .password(passwordEncoder.encode(password))
                        .firstName("Андрій Сергійович")
                        .lastName("Губаренко")
                        .count(0.00)
                        .gender(Gender.MALE)
                        .roles(new HashSet<>(Arrays.asList(Role.ADMINISTRATOR, Role.USER)))
                        .build()
        );
        //TODO: Enable this module before production
/*        try {
            emailService.sendMimeMessage(user.getUsername(),
                    "Реєстрація користувача",
                    "andrewgubarenko@gmail.com",
                    new StringBuilder().append("<H2>Вітаю! Вас зареєстровано на сайті профспілки Аеронавігація.</H2>\n")
                            .append("<p>Ваш тимчасовий пароль для доступу до особистого кабінету: ")
                            .append(password)
                            .append("</p>")
                            .append("\n")
                            .append("<p>Радимо змінити цей пароль на свій власний. </p>\n")
                            .append("<p>Також радимо використовувати надійні паролі, наприклад ті, що генеруються Google.</p>")
                            .append("<p>Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.</p>").toString(),
                    new ArrayList<>());
        } catch (MessagingException ex) {
            LOGGER.info("Something wrong with email. Unable to send an email to " + user.getUsername() + "\n" + ex.getLocalizedMessage());
        }*/
        LOGGER.info("METHOD CREATE: User with username: " + user.getUsername() + " and access level:" + Role.ADMINISTRATOR.name() + " was created");
    }
}
