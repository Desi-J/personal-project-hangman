select users.name, users.email, words.name, words.defintion
from users 
right join words on users.id = words.user_id
order by users.id;
