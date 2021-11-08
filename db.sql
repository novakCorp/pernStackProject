-- DDL for the database

CREATE TABLE restaurants (
    id bigserial primary key not null, 
    name varchar(50) not null,
    location varchar(50) not null,
    price_range int not null check(price_range >= 1 and price_range <= 5)
);

insert into restaurants(name, location, price_range) values ('MCDonals', 'New York', 3);


-- table reviews
CREATE TABLE reviews(

    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

insert into reviews (restaurant_id, name, review, rating) values(1, 'Andres','Bad restaurant', 1);
insert into reviews (restaurant_id, name, review, rating) values(1, 'Tomas','Bad restaurant', 2);
insert into reviews (restaurant_id, name, review, rating) values(1, 'Kelly','Bad restaurant and lazy people', 1);
insert into reviews (restaurant_id, name, review, rating) values(1, 'Sergio','Bad restaurant', 1);
insert into reviews (restaurant_id, name, review, rating) values(1, 'Miguel','Bad restaurant', 2);
insert into reviews (restaurant_id, name, review, rating) values(1, 'Luis','Bad restaurant', 2);
insert into reviews (restaurant_id, name, review, rating) values(1, 'Diego','Bad restaurant', 2);