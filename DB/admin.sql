select users.email, words.name, words.definition, words.w_id
from users 
right join words on auth0_id = words.user_id
order by users.id;
