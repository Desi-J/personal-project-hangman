update words set (name,definition) = ($1,$2) where w_id = $3;

select * from words where user_id = $4