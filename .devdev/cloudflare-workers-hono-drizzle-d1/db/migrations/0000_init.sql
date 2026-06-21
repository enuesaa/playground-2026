CREATE TABLE `Note` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`desc` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Note_title_unique` ON `Note` (`title`);