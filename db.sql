-- DDL for the database

CREATE TABLE restaurants (
    id bigserial primary key not null, 
    name varchar(50) not null,
    location varchar(50) not null,
    price_range int not null check(price_range >= 1 and price_range <= 5)
);

insert into restaurants(name, location, price_range) values ('MCDonals', 'New York', 3);