package si.um.feri.eventure.dao;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.eventure.vao.Event;

public interface EventRepository extends CrudRepository<Event, Integer> {

}
