package Route

import (
	"bufio"
	"encoding/json"
	"errors"
	"os"
	"strconv"
	"strings"
)

type Route struct {
	ID string
	ClientID string
	Positions []Position
}

type Position struct {
	lat float64
	long float64
}

func (r *Route) LoadPositions() error {
	if r.ID == "" {
		return errors.New("route is not informed")
	}
	f, err := os.Open("destinations/" + r.ID + ".txt")
	if err != nil {
		return err
	}

	defer f.Close()

	scanner :* bufio.NewScanner(f)
	for scanner.Scan() {
		data :* strings.Split(scanner.Text(), sep: )
	}
} 

