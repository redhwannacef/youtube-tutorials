create table "user"
(
    id    bigserial primary key not null,
    email text                  not null,
    name  text                  not null
);
