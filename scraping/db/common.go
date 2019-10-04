package db

import (
	"github.com/jinzhu/gorm"
	"github.com/jmdtc/discogsBullshit/scraping/db/models"
)

var dB *gorm.DB

const (
	dbName = "test.db"
)

// used in case we want to implement a connection pool
func get() (*gorm.DB, error) {
	if dB != nil {
		return dB, nil
	}

	db, err := gorm.Open("sqlite3", dbName)
	if err != nil {
		return nil, err
	}
	dB = db
	return dB, nil
}

func Get() (*gorm.DB, error) {
	return get()
}

func AutoMigrate() error {
	db, err := get()
	if err != nil {
		return err
	}

	db.AutoMigrate(
		&models.Track{},
		&models.Artist{},
		&models.Label{},
		&models.Genre{},
		&models.Style{},
		&models.Video{},
		&models.Release{},
	)

	return nil
}
