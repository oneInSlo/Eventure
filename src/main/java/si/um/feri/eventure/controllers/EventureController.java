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
    public Optional<Event> getEventById(@PathParam("id") int id) {
        logger.info("Getting event...");
        return eventService.findById(id);
    }

    @PostMapping("/events")
    public void addEvent(Event event) {
        logger.info("Adding event...");
        eventService.save(event);
    }

    @PutMapping("/events/{id}")
    public Event updateEvent(Event eventDetails, @PathParam("id") int id) {
        logger.info("Updating event...");

        Optional<Event> eventTemp = eventService.findById(id);
        Event event = eventTemp.orElse(null); // the same as ---> Event event = eventTemp.isPresent() ? eventTemp.get() : null

        if (event != null) {
            event.setEventName(eventDetails.getEventName());
            event.setEventDescription(eventDetails.getEventDescription());
            event.setEventLocation(eventDetails.getEventLocation());
            event.setEventDate(eventDetails.getEventDate());

            return eventService.save(event);
        }

        return null;
    }

    @DeleteMapping("/events/{id}")
    public void deleteEventById(@PathParam("id") int id) {
        logger.info("Deleting event...");
        eventService.deleteById(id);
    }

}
