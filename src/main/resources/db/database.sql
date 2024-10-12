-- CREATE DATABASE eventure;

USE eventure;

CREATE TABLE event (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       event_name VARCHAR(255) NOT NULL,
                       event_description TEXT NOT NULL,
                       event_location VARCHAR(255) NOT NULL,
                       event_datetime_start DATETIME NOT NULL,
                       event_datetime_end DATETIME NOT NULL,
                       event_costs FLOAT NOT NULL
);

INSERT INTO event(event_name, event_description, event_location, event_datetime_start, event_datetime_end, event_costs)
VALUES
    ('Maribor Wine Festival 2024', 'Celebrate the world’s oldest vine and enjoy a weekend of wine tasting, live music, and gourmet food. A must for wine lovers!', 'Old Vine House, Maribor', '2024-10-20 12:00:00', '2024-10-22 20:00:00', 25.00),
    ('Maribor Jazz Night', 'Immerse yourself in the smooth sounds of live jazz bands from across Europe. Relax under the stars with food and drinks.', 'Maribor Castle Courtyard', '2024-11-10 20:00:00', '2024-11-10 23:00:00', 15.00),
    ('ArtExpo Maribor', 'An international art exhibition featuring over 50 artists showcasing paintings, sculptures, and digital art.', 'Maribor Art Gallery', '2024-10-15 09:00:00', '2024-10-18 18:00:00', 0.00),
    ('Maribor Marathon', 'Join thousands of runners for the annual marathon through the historic streets of Maribor. Includes a half-marathon and a 5K fun run.', 'Maribor City Center', '2024-11-03 08:00:00', '2024-11-03 15:00:00', 30.00),
    ('Christmas Market at Glavni Trg', 'Experience the magic of Christmas with local crafts, food stalls, live performances, and festive decorations.', 'Glavni Trg, Maribor', '2024-12-01 10:00:00', '2024-12-24 20:00:00', 0.00),
    ('Maribor Tech Expo', 'Discover the latest in tech innovation at this annual expo. Meet startups, try new gadgets, and attend workshops on AI, VR, and more.', 'Maribor Convention Center', '2024-11-17 09:00:00', '2024-11-19 18:00:00', 50.00),
    ('Slovenian Food Festival', 'Taste traditional Slovenian dishes prepared by local chefs. Enjoy live cooking demonstrations and music by local artists.', 'Lent Promenade, Maribor', '2024-10-28 11:00:00', '2024-10-28 17:00:00', 10.00),
    ('Opera Night in Maribor', 'A night of beautiful operatic performances by Slovenia’s leading opera singers, accompanied by a live orchestra.', 'Slovene National Theatre Maribor', '2024-11-05 19:00:00', '2024-11-05 22:00:00', 35.00),
    ('Open-Air Movie Night', 'Watch classic movies under the stars at Maribor\'s largest square. Bring your own blanket or rent one on-site.', 'Trg Leona Štuklja, Maribor', '2024-10-25 21:00:00', '2024-10-25 23:30:00', 5.00);
