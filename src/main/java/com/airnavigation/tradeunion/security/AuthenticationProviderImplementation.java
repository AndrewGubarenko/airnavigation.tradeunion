package com.airnavigation.tradeunion.security;

import com.airnavigation.tradeunion.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationProviderImplementation implements AuthenticationProvider {

    private static final Logger LOGGER = Logger.getLogger(UserService.class);

    private final UserDetailsServiceImplementation userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationProviderImplementation(UserDetailsServiceImplementation userService) {
        this.userService = userService;
        this.passwordEncoder = NoOpPasswordEncoder.getInstance();

    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        if(userService == null) {
            LOGGER.error("AUTHENTICATION PROVIDER: User service is null");
            throw new InternalAuthenticationServiceException("User service is null");
        }

        UserDetails user = userService.loadUserByUsername(username);

        if(user == null) {
            throw new AuthenticationCredentialsNotFoundException("Такого користувача не знайдено");
        }

        if(passwordEncoder.matches(password, user.getPassword())) {
            return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
        } else {
            throw new AuthenticationServiceException("Помилка авторизації. Перевірте eMail та пароль.");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}