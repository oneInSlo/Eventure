package si.um.feri.eventure.vao;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonProperty("event_name")
    private String event_name;

    @JsonProperty("event_description")
    private String event_description;

    @JsonProperty("event_location")
    private String event_location;

    @JsonProperty("event_costs")
    private float event_costs;

    @JsonProperty("event_datetime_start")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime event_datetime_start;

    @JsonProperty("event_datetime_end")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime event_datetime_end;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getEvent_description() {
        return event_description;
    }

    public void setEvent_description(String event_description) {
        this.event_description = event_description;
    }

    public String getEvent_location() {
        return event_location;
    }

    public void setEvent_location(String event_location) {
        this.event_location = event_location;
    }

    public float getEvent_costs() {
        return event_costs;
    }

    public void setEvent_costs(float event_costs) {
        this.event_costs = event_costs;
    }

    public LocalDateTime getEvent_datetime_start() {
        return event_datetime_start;
    }

    public void setEvent_datetime_start(LocalDateTime event_datetime_start) {
        this.event_datetime_start = event_datetime_start;
    }

    public LocalDateTime getEvent_datetime_end() {
        return event_datetime_end;
    }

    public void setEvent_datetime_end(LocalDateTime event_datetime_end) {
        this.event_datetime_end = event_datetime_end;
    }

    @Override
    public String toString() {
        return "Event [id=" + id + ", event_name=" + event_name + ", event_description=" + event_description + ", event_location=" + event_location + "]";
    }
}
