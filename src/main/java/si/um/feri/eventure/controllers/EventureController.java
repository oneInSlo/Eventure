package si.um.feri.eventure.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import si.um.feri.eventure.service.EventService;
import si.um.feri.eventure.vao.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin
@RestController
public class EventureController {

    @Autowired
    private EventService eventService;

    Logger logger = Logger.getLogger(EventureController.class.getName());

    private static final String IMAGE_UPLOAD_DIR = "src/main/frontend/eventure-frontend/public/assets/img/";

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

    @PostMapping(value = "/events", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addEvent(
            @RequestParam("event_name") String eventName,
            @RequestParam("event_description") String eventDescription,
            @RequestParam("event_location") String eventLocation,
            @RequestParam("event_costs") float eventCosts,
            @RequestParam("event_datetime_start") String eventDatetimeStart,
            @RequestParam("event_datetime_end") String eventDatetimeEnd,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            Event event = new Event();
            event.setEvent_name(eventName);
            event.setEvent_description(eventDescription);
            event.setEvent_location(eventLocation);
            event.setEvent_costs(eventCosts);
            event.setEvent_datetime_start(LocalDateTime.parse(eventDatetimeStart, formatter));
            event.setEvent_datetime_end(LocalDateTime.parse(eventDatetimeEnd, formatter));

            saveOrUpdateEvent(image, event);

            return ResponseEntity.ok(event);
        } catch (DateTimeParseException e) {
            return ResponseEntity.status(400).body("Invalid date format. Expected 'yyyy-MM-dd HH:mm:ss'");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving event");
        }
    }

    @PutMapping(value = "/events/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateEvent(
            @PathVariable("id") Integer id,
            @RequestParam("event_name") String eventName,
            @RequestParam("event_description") String eventDescription,
            @RequestParam("event_location") String eventLocation,
            @RequestParam("event_costs") float eventCosts,
            @RequestParam("event_datetime_start") String eventDatetimeStart,
            @RequestParam("event_datetime_end") String eventDatetimeEnd,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        Optional<Event> optionalEvent = eventService.findById(id);

        if (optionalEvent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        Event event = optionalEvent.get();
        event.setEvent_name(eventName);
        event.setEvent_description(eventDescription);
        event.setEvent_location(eventLocation);
        event.setEvent_costs(eventCosts);
        event.setEvent_datetime_start(LocalDateTime.parse(eventDatetimeStart, formatter));
        event.setEvent_datetime_end(LocalDateTime.parse(eventDatetimeEnd, formatter));

        try {
            saveOrUpdateEvent(image, event);

            return ResponseEntity.ok(event);
        } catch (IOException e) {
            logger.severe("Error updating event: " + e.getMessage());
            return ResponseEntity.status(500).body("Error updating event.");
        }
    }

    @DeleteMapping("/events/{id}")
    public void deleteEventById(@PathVariable("id") int id) {
        logger.info("Deleting event...");
        eventService.deleteById(id);
    }

    private void saveOrUpdateEvent(@RequestParam(value = "image", required = false) MultipartFile image, Event event) throws IOException {
        Event savedEvent = eventService.save(event);

        if (image != null && !image.isEmpty()) {
            String imgName = "event_" + savedEvent.getId() + ".jpg";
            Path imgPath = Paths.get(IMAGE_UPLOAD_DIR, imgName);
            Files.copy(image.getInputStream(), imgPath, StandardCopyOption.REPLACE_EXISTING);
        }
    }

}
