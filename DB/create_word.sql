insert into words (name, definition,user_id)
values (${name}, ${definition},${user_id});
select * from words where user_id = ${user_id};