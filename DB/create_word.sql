insert into words (name, definition)
values (${name}, ${definition})
returning * ;