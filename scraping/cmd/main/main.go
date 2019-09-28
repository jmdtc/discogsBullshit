package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aguilbau/discogs"
)

func main() {
	client, err := discogs.NewClient(discogs.ClientConfig{
		ConsumerKey:    os.Getenv("DISCOGS_CONSUMER_KEY"),
		ConsumerSecret: os.Getenv("DISCOGS_CONSuMER_SECRET"),
	})
	if err != nil {
		panic(err)
	}

	labelReleases, err := client.GetLabelReleases(context.Background(), 1818, nil)
	if err != nil {
		panic(err)
	}
	fmt.Println(labelReleases)

	release, err := client.GetRelease(context.Background(), 249504, nil)
	if err != nil {
		panic(err)
	}
	fmt.Println(release)
}
