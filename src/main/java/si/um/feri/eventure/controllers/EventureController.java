package si.um.feri.eventure.controllers;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.eventure.service.EventService;
import si.um.feri.eventure.vao.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin
@RestController
public class EventureController {

    @Autowired
    private EventService eventService;

    Logger logger = Logger.getLogger(EventureController.class.getName());

    public EventureController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        logger.info("Getting all events...");
        return eventService.findAll();
    }

    @GetMapping("/events/{id}")
    public Optional<Event> getEventById(@PathVariable("id") Integer id) {
        logger.info("Getting event with id: " + id);
        return eventService.findById(id);
    }

    @PostMapping("/events")
    public void addEvent(@RequestBody Event event) {
        System.out.println(event);
        logger.info("Adding event...");
        eventService.save(event);
    }

    @PutMapping("/events/{id}")
    public Event updateEvent(@RequestBody Event eventDetails, @PathVariable("id") int id) {
        logger.info("Updating event...");

        Optional<Event> eventTemp = eventService.findById(id);
        Event event = eventTemp.orElse(null); // the same as ---> Event event = eventTemp.isPresent() ? eventTemp.get() : null

        if (event != null) {
            event.setEvent_name(eventDetails.getEvent_name());
            event.setEvent_description(eventDetails.getEvent_description());
            event.setEvent_location(eventDetails.getEvent_location());
            event.setEvent_datetime_start(eventDetails.getEvent_datetime_start());
            event.setEvent_datetime_end(eventDetails.getEvent_datetime_end());
            event.setEvent_costs(eventDetails.getEvent_costs());

            return eventService.save(event);
        }

        return null;
    }

    @DeleteMapping("/events/{id}")
    public void deleteEventById(@PathVariable("id") int id) {
        logger.info("Deleting event...");
        eventService.deleteById(id);
    }

}
