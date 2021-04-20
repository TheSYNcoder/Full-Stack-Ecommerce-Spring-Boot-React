package com.flamup.spring.Models;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;





@Entity
@NoArgsConstructor
@Data
public class ApplicationUser implements UserDetails {


    public enum Gender{
        MALE,
        FEMALE
    }

    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String firstName;
    private String lastName;
    private String username;

    private String password;
    private String email;
    @Enumerated(EnumType.STRING)
//    @Column(name="role")
    private AppUserRole appUserRole;
    @Enumerated(EnumType.STRING)
    private Gender gender;


    public ApplicationUser(String firstName,
                           String lastName,
                           String username,
                           String password,
                           String email,
                           AppUserRole appUserRole,
                           Gender gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.appUserRole = appUserRole;
        this.gender = gender;
    }

    public Long getId(){
        return  id;
    }
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getEmail() { return username; }

    public void setEmail(String email) { this.email = email; }




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword( String password){
        this.password = password;
    }

    public void setUsername( String username ){
        this.username = username;
    }



}

