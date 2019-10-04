package models

import "time"

type Release struct {
	ID          int64 `gorm:"primary_key"`
	Country     string
	Notes       string
	Title       string
	ReleaseDate time.Time
	CreatedAt   time.Time
	Scraped     bool
	Tracks      []Track  `gorm:"many2many:release_tracks;"`
	Artists     []Artist `gorm:"many2many:release_artists;"`
	Labels      []Label  `gorm:"many2many:release_labels;"`
	Genres      []Genre  `gorm:"many2many:release_genres;"`
	Styles      []Style  `gorm:"many2many:release_styles;"`
	Videos      []Video  `gorm:"many2many:release_videos;"`
}

type Track struct {
	ID   int64 `gorm:"primary_key"`
	Name string
}

type Artist struct {
	ID   int64 `gorm:"primary_key"`
	Name string
}

type Label struct {
	ID   int64 `gorm:"primary_key"`
	Name string
}

type Genre struct {
	ID   int64 `gorm:"primary_key"`
	Name string
}

type Style struct {
	ID   int64 `gorm:"primary_key"`
	Name string
}

type Video struct {
	ID   int64 `gorm:"primary_key"`
	Name string
}
