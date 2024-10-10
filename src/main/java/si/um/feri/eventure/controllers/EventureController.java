package si.um.feri.eventure.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventureController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

}
