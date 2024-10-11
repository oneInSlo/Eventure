package si.um.feri.eventure.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.um.feri.eventure.dao.EventRepository;
import si.um.feri.eventure.vao.Event;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAll() {
        return (List<Event>) eventRepository.findAll();
    }

    public Optional<Event> findById(int id) {
        return eventRepository.findById(id);
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public void deleteById(int id) {
        eventRepository.deleteById(id);
    }

}
