package main

import (
	"fmt"
	kafka "github.com/codeedu/imersaofsfc2-simulator/application/kafka"
	route2 "github.com/risaddex/fullstackfullcycle2-simulator/application/route"
	"log"
	"github.com/joho/godotenv"

)

func init() {
	// Loads local env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main()  {

	producer := kafka.NewKafkaProducer()
	kafka.Publish("ola", "readtest1", producer)
	// route := route2.Route{
	// 	ID: "1",
	// 	ClientID: "1",
	// }
	// route.LoadPositions()
	// stringjson, _ := route.ExportJsonPositions()
	// fmt.Println(stringjson[1])
}