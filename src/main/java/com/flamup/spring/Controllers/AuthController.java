package com.flamup.spring.Controllers;


import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;

@RestController
@RequestMapping(path = "api/")
public class AuthController {

    @GetMapping(path = "auth")
    public HashMap<String, Boolean> isAuthenticated(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String , Boolean >  hs = new HashMap<>();

        if ( auth!= null && auth.getPrincipal() != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken) ){
            hs.put("AUTHENTICATED",  true);
        }
        else{
            hs.put("AUTHENTICATED", false);
        }
        return  hs;
    }
}
