CREATE TABLE IF NOT EXISTS releases (
	id           INTEGER PRIMARY KEY,
	title        TEXT NOT NULL,
	country      TEXT,
	release_date INTEGER,
	notes        INTEGER
);

CREATE TABLE IF NOT EXISTS tracks (
	id   INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases_tracks (
	release_id     INTEGER,
	track_id       INTEGER,
	track_position INTEGER,
	FOREIGN KEY(release_id) REFERENCES releases(id),
	FOREIGN KEY(track_id) REFERENCES tracks(id)
);

CREATE TABLE IF NOT EXISTS artists (
	id   INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases_artists (
	release_id INTEGER,
	artist_id  INTEGER,
	FOREIGN KEY(release_id) REFERENCES releases(id),
	FOREIGN KEY(artist_id) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS labels (
	id   INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases_labels (
	release_id INTEGER,
	label_id   INTEGER,
	FOREIGN KEY(release_id) REFERENCES releases(id),
	FOREIGN KEY(label_id) REFERENCES labels(id)
);

CREATE TABLE IF NOT EXISTS genres (
	id   INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases_genres (
	release_id INTEGER,
	genre_id   INTEGER,
	FOREIGN KEY(release_id) REFERENCES releases(id),
	FOREIGN KEY(genre_id) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS styles (
	id   INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases_styles (
	release_id INTEGER,
	style_id   INTEGER,
	FOREIGN KEY(release_id) REFERENCES releases(id),
	FOREIGN KEY(style_id) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS videos (
	id    INTEGER PRIMARY KEY,
	url   TEXT NOT NULL,
	title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases_videos (
	release_id INTEGER,
	video_id   INTEGER,
	FOREIGN KEY(release_id) REFERENCES releases(id),
	FOREIGN KEY(video_id) REFERENCES videos(id)
);
