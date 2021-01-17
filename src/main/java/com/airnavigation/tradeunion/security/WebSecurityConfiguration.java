package com.airnavigation.tradeunion.security;

import com.airnavigation.tradeunion.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AuthenticationProviderImplementation authenticationProvider;
    private final UserDetailsServiceImplementation userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final RESTAuthenticationSuccessHandler authenticationSuccessHandler;
    private final RESTAuthenticationEntryPoint authenticationEntryPoint;
    private final RESTAuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    public WebSecurityConfiguration (AuthenticationProviderImplementation authenticationProvider,
                                     UserDetailsServiceImplementation userDetailsService,
                                     RESTAuthenticationSuccessHandler authenticationSuccessHandler,
                                     RESTAuthenticationEntryPoint authenticationEntryPoint,
                                     RESTAuthenticationFailureHandler authenticationFailureHandler) {
        this.authenticationProvider = authenticationProvider;
        this.userDetailsService = userDetailsService;
        //TODO: Change password encoder
        this.passwordEncoder = NoOpPasswordEncoder.getInstance();
        this.authenticationSuccessHandler = authenticationSuccessHandler;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.authenticationFailureHandler = authenticationFailureHandler;
    }

    @SuppressWarnings("SpellCheckingInspection")
    @Value("11")
    private int bcryptStrength;


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider)
            .eraseCredentials(false);
    }

    @Override
    public void configure(WebSecurity web){
        web.debug(false);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .authorizeRequests()
                //TODO: Repair this before production
                .antMatchers("/css/**", "/js/**", "/index*", "/json/**", "/*.ico", "/images/**", "/h2/**", "/console/**").permitAll()
                .antMatchers(HttpMethod.GET, "/main").permitAll()
                .antMatchers(HttpMethod.GET, "/adop").permitAll()
                .antMatchers(HttpMethod.PUT, "/password").permitAll()

                .antMatchers(HttpMethod.GET, "/user/**").hasRole(Role.USER.name())
                .antMatchers(HttpMethod.GET, "/user/**").authenticated()
                .antMatchers(HttpMethod.PUT, "/user/**").hasRole(Role.USER.name())
                .antMatchers(HttpMethod.PUT, "/user/**").authenticated()

                .antMatchers(HttpMethod.GET, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.GET, "/administrator/**").authenticated()
                .antMatchers(HttpMethod.POST, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.POST, "/administrator/**").authenticated()
                .antMatchers(HttpMethod.PUT, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.PUT, "/administrator/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.DELETE, "/administrator/**").authenticated()

            .and()
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
            .and()
                .formLogin()
                .loginPage("/main")
                .loginProcessingUrl("/user/authentication").permitAll()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler)
            .and()
                .rememberMe()
                .key("SuperSecretKey")
                //TODO: Repair time
                .tokenValiditySeconds(6000)
            .and()
                .logout()
                .logoutUrl("/user/logout")
            .and()
                //TODO: Remove this on production
                .headers()
                    .frameOptions().disable()
            .and()
                .csrf().disable()
                .cors().configurationSource(corsConfiguration())
        ;
    }

    @Bean
    CorsConfigurationSource corsConfiguration() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("*"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

}
