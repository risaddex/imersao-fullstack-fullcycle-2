import { Button, Grid, MenuItem, Select } from "@material-ui/core"
import { Loader } from "google-maps"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { getCurrentPosition } from "../util/geolocation"
import { Map as GoogleMap, makeCarIcon, makeMarkerIcon } from "../util/map"
import { Route } from "../util/models"
import { sample, shuffle } from 'lodash'

const API_URL = process.env.REACT_APP_API_URL

const MOCK_DATA = [
  {
    _id: "1",
    title: "Primeiro",
    startPosition: { lat: -15.82594, lng: -47.92923 },
    endPosition: { lat: -15.82942, lng: -47.92765 },
  },
  {
    _id: "2",
    title: "Segundo",
    startPosition: { lat: -15.82449, lng: -47.92756 },
    endPosition: { lat: -15.8276, lng: -47.92621 },
  },
  {
    _id: "3",
    title: "Terceiro",
    startPosition: { lat: -15.82331, lng: -47.92588 },
    endPosition: { lat: -15.82758, lng: -47.92532 },
  },
]

const colors = [
  "#b71c1c",
  "#4a148c",
  "#2e7d32",
  "#e65100",
  "#2962ff",
  "#c2185b",
  "#FFCD00",
  "#3e2723",
  "#03a9f4",
  "#827717",
]

const googleMapsLoader = new Loader(process.env.REACT_APP_GOOGLE_API_KEY)

export const Mapping = () => {
  const [routes, setRoutes] = useState<Route[]>([])
  const [routeIdSelected, setRouteIdSelected] = useState<string>("")
  const mapRef = useRef<GoogleMap>()

  useEffect(() => {
    // fetch(`${API_URL}/routes`)
    //   .then((res) => res.json())
    //   .then((data) => setRoutes(data));
    setRoutes(MOCK_DATA)
  }, [])

  // IIFE since useEffect can't be async
  useEffect(() => {
    ;(async () => {
      // Get current position
      const [, position] = await Promise.all([
        googleMapsLoader.load(),
        getCurrentPosition({ enableHighAccuracy: true }),
      ])

      const divMap = document.getElementById("map") as HTMLElement
      mapRef.current = new GoogleMap(divMap, {
        zoom: 15,
        center: position,
      })
    })()
  }, [])

  const startRoute = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const route = routes.find((route) => route._id === routeIdSelected)
      mapRef.current?.addRoute(routeIdSelected, {
        currentMarkerOptions: {
          position: route?.startPosition,
          icon: makeCarIcon("#000"),
        },
        endMarkerOptions: {
          position: route?.endPosition,
          icon: makeMarkerIcon("#fff"),
        },
      })
    },
    [routeIdSelected, routes]
  )

  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      <Grid item xs={12} sm={3}>
        <form onSubmit={startRoute}>
          <Select
            fullWidth
            displayEmpty
            value={routeIdSelected}
            onChange={(e) => setRouteIdSelected(e.target.value + "")}
          >
            <MenuItem value="">
              <em>Selecione uma corrida</em>
            </MenuItem>
            {routes.map((route, i) => (
              <MenuItem key={i} value={route._id}>
                {route.title}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" color="primary" variant="contained">
            Iniciar uma corrida
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </Grid>
    </Grid>
  )
}
