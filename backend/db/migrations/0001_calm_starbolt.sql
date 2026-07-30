CREATE TABLE `login_attempts` (
	`identifier_hash` text PRIMARY KEY NOT NULL,
	`failures` integer DEFAULT 0 NOT NULL,
	`window_started_at` integer NOT NULL,
	`locked_until` integer,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `login_attempts_lock_idx` ON `login_attempts` (`locked_until`);
