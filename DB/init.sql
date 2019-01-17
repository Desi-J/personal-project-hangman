
-- MUST RUN THIS BLOCK OF CODE AND CREAE A SESSIONS TABLE IN SQL IN ORDER FOR THE SERVER TO WORK FOR SESSIONS
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

create table if not exists users(
  id serial primary key,
  name varchar(50) not null,
  email varchar(50) not null,
  picture text,
  auth0_id text unique
);

create table if not exists words(
  w_id serial,
  name varchar(12), 
  definition varchar(140),
  user_id text references users(auth0_id) --uses a value from another table
);