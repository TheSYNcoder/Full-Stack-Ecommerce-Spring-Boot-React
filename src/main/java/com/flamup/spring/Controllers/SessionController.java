package com.flamup.spring.Controllers;


import org.apache.juli.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/")
public class SessionController {

    private static Logger logger = LoggerFactory.getLogger( SessionController.class);
    @GetMapping( path = "persist")
    public List<String> persistMessages(@RequestParam(name = "msg") String message, HttpServletRequest request){

        logger.debug("IN persist message" + message);
        List<String> messages = (List<String>) request.getSession().getAttribute("SESSION_STORE");
        if ( messages == null ){
            messages = new ArrayList<>();
            request.getSession().setAttribute("SESSION_STORE" , messages);
        }
        messages.add(message);
        request.getSession().setAttribute("SESSION_STORE", messages);
        return messages;
    }
}
