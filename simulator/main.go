package main

import (
	"fmt"
	kafka "github.com/codeedu/imersaofsfc2-simulator/application/kafka"
	"github.com/codeedu/imersaofsfc2-simulator/infra/kafka"
	chafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/joho/godotenv"
	"log"

)

func init() {
	
	// Loads local env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main()  {
	msgChan := make(chan *ckafka.Message)
	consumer := kafka.NewKafkaConsumer(msgChan)
	// Run this in parallel in another thread a.k.a asynchronous
	go consumer.Consume()
	// Infinitely iterates over channel
	for msg := range msgChan {
		go kafka.Produce(msg)
		// Prints every message released in this channel
		fmt.Println(string(msg.Value))
	}

}