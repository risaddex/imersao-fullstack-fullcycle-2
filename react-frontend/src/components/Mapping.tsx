import { Button, Grid, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route } from "../util/models";

const API_URL = process.env.REACT_APP_API_URL;
type Props = {};
export const Mapping = (props: Props) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    // fetch(`${API_URL}/routes`)
    //   .then((res) => res.json())
    //   .then((data) => setRoutes(data));
    setRoutes([])
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <form>
          <Select fullWidth>
            <MenuItem value="">
              <em>Selecione uma corrida</em>
            </MenuItem>
            {routes.map((route, i) => (
              <MenuItem key={i} value={route.id}>
                <em>{route.title}</em>
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" color="primary" variant="contained">
            Iniciar uma corrida
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id="map"></div>
      </Grid>
    </Grid>
  );
};
