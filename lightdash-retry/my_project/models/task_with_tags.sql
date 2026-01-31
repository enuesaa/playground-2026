select
    t.id as task_id,
    t.title,
    t.status,
    t.due_date,
    u.name as user_name,
    string_agg(g.name, ', ') as tags
from tasks t
join users u on t.user_id = u.id
left join task_tags tt on t.id = tt.task_id
left join tags g on tt.tag_id = g.id
group by t.id, t.title, t.status, t.due_date, u.name;
