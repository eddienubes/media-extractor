CREATE TABLE "clips" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"starts_at" varchar NOT NULL,
	"ends_at" varchar NOT NULL,
	"duration_sec" varchar NOT NULL,
	"quality" varchar NOT NULL,
	"movie_id" uuid,
	"episode_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"overview" varchar NOT NULL,
	"release_date" timestamp NOT NULL,
	"poster_url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "movies_tmdb_id_unique" UNIQUE("tmdb_id")
);
--> statement-breakpoint
CREATE TABLE "phrase_examples" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hash" varchar NOT NULL,
	"text" varchar NOT NULL,
	"phrase_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "phrase_examples_hash_unique" UNIQUE("hash")
);
--> statement-breakpoint
CREATE TABLE "phrases" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hash" varchar NOT NULL,
	"text" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "phrases_hash_unique" UNIQUE("hash")
);
--> statement-breakpoint
CREATE TABLE "subtitles" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"movie_id" uuid,
	"episode_id" uuid,
	"hash" varchar NOT NULL,
	"text" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tv_show_episodes" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tv_show_id" uuid,
	"season" integer NOT NULL,
	"episode" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tv_shows" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"overview" varchar NOT NULL,
	"release_date" timestamp NOT NULL,
	"poster_url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tv_shows_tmdb_id_unique" UNIQUE("tmdb_id")
);
--> statement-breakpoint
ALTER TABLE "clips" ADD CONSTRAINT "clips_movie_id_movies_uuid_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clips" ADD CONSTRAINT "clips_episode_id_tv_show_episodes_uuid_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."tv_show_episodes"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phrase_examples" ADD CONSTRAINT "phrase_examples_phrase_id_phrases_uuid_fk" FOREIGN KEY ("phrase_id") REFERENCES "public"."phrases"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtitles" ADD CONSTRAINT "subtitles_movie_id_movies_uuid_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtitles" ADD CONSTRAINT "subtitles_episode_id_tv_show_episodes_uuid_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."tv_show_episodes"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tv_show_episodes" ADD CONSTRAINT "tv_show_episodes_tv_show_id_tv_shows_uuid_fk" FOREIGN KEY ("tv_show_id") REFERENCES "public"."tv_shows"("uuid") ON DELETE no action ON UPDATE no action;