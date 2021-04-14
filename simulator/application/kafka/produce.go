package kafka

import (
	"encoding/json"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/risaddex/fullstackfullcycle2-simulator/application/route"
	"github.com/risaddex/fullstackfullcycle2-simulator/infra/kafka"
	"log"
	"os"
	"time"
)

/*
	Produce is responsible to publish the positions of each request
	Example of a json request:
	{"clientId":"1","routeId":"1"}
	{"clientId":"2","routeId":"2"}
	{"clientId":"3","routeId":"3"}
*/
// ?Converts JSON populates struct
func Produce(msg *ckafka.Message) {
	producer := kafka.NewKafkaProducer()
	route := route.NewRoute()
	// converts JSON array and keep sending them
	json.Unmarshal(msg.Value, &route)
	route.LoadPositions()
	positions, err := route.ExportJsonPositions()
	if err != nil {
		log.Println(err.Error())
	}
	// p => position
	for _, p := range positions {
		kafka.Publish(p, os.Getenv("KafkaProduceTopic"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}