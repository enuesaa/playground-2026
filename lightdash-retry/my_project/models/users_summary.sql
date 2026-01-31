with user_tasks as (
    select
        u.id as user_id,
        u.name as user_name,
        count(t.id) as total_tasks,
        count(case when t.status = 'done' then 1 end) as done_tasks,
        count(case when t.status != 'done' then 1 end) as not_done_tasks
    from users u
    left join tasks t on u.id = t.user_id
    group by u.id, u.name
)
select * from user_tasks;
