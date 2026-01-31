select
    g.id as tag_id,
    g.name as tag_name,
    u.name as user_name,
    count(tt.task_id) as used_in_tasks
from tags g
join users u on g.user_id = u.id
left join task_tags tt on g.id = tt.tag_id
group by g.id, g.name, u.name;
