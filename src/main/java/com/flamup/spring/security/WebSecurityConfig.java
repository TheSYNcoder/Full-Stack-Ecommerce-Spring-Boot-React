package com.flamup.spring.security;

import com.flamup.spring.Services.CustomLogoutHandler;
import com.flamup.spring.auth.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import javax.sql.DataSource;

//import javax.sql.DataSource;

import static com.flamup.spring.auth.AppUserRole.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final AppUserService appUserService;

    @Autowired
    RestAuthEntryPoint restAuthEntryPoint;

    @Autowired
    DataSource dataSource;

    @Autowired
    private CustomLogoutHandler logoutHandler;



    @Autowired
    public WebSecurityConfig(PasswordEncoder passwordEncoder, AppUserService appUserService) {
        this.passwordEncoder = passwordEncoder;
        this.appUserService = appUserService;
    }



    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());


//        auth.jdbcAuthentication().dataSource(dataSource)
//                .usersByUsernameQuery("SELECT EMAIL AS PRINCIPAL, PASSWORD AS CREDENTIALS, true FROM APPLICATION_USER WHERE EMAIL=?")
//                .authoritiesByUsernameQuery("SELECT EMAIL AS PRINCIPAL, APP_USER_ROLE AS ROLE FROM APPLICATION_USER WHERE EMAIL=?")
//                .passwordEncoder(passwordEncoder).rolePrefix("ROLE_");

//        auth.jdbcAuthentication().dataSource(dataSource)
    }




    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                csrf().disable()
                .authorizeRequests()
                .antMatchers("/","/static/**", "index*", "/css/*", "/js/*","/media/*","*.ico","*.png").permitAll()
                .antMatchers("/api/register").permitAll()
                .antMatchers("/api/auth").permitAll()
//                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/persist/**").authenticated()

                .antMatchers("/api/v1/**").authenticated()
                .antMatchers("/admin/api/**").hasRole(ADMIN.name())
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthEntryPoint)
                .and()
                .formLogin()
                    .loginProcessingUrl("/api/login")
                    .permitAll()
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true)
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));

    }


    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }
}
