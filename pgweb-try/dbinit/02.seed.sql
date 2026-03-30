-- users (5)
INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Carol', 'carol@example.com'),
('Dave', 'dave@example.com'),
('Eve', 'eve@example.com');

-- tags (各ユーザーに3つずつ)
INSERT INTO tags (user_id, name) VALUES
(1, 'frontend'), (1, 'backend'), (1, 'urgent'),
(2, 'design'), (2, 'review'), (2, 'urgent'),
(3, 'infra'), (3, 'backend'), (3, 'low'),
(4, 'frontend'), (4, 'test'), (4, 'urgent'),
(5, 'planning'), (5, 'research'), (5, 'low');

-- tasks (100件)
INSERT INTO tasks (user_id, title, status, due_date)
SELECT
  (random() * 4 + 1)::int,
  'Task #' || g,
  (ARRAY['todo','doing','done'])[ (random()*2+1)::int ],
  CURRENT_DATE + ((random()*30)::int)
FROM generate_series(1,100) g;

-- task_tags (各タスクに1〜3タグ)
INSERT INTO task_tags (task_id, tag_id)
SELECT
  t.id,
  tg.id
FROM tasks t
JOIN LATERAL (
  SELECT id
  FROM tags
  WHERE user_id = t.user_id
  ORDER BY random()
  LIMIT (random()*2 + 1)::int
) tg ON true;

