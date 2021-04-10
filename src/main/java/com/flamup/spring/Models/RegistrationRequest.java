package com.flamup.spring.Models;


import com.flamup.spring.auth.ApplicationUser.Gender;
import lombok.*;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String email;
    private String gender;
}
