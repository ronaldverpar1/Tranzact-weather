import { Typography, Container, Grid } from '@material-ui/core';
import ListPartial from '../src/assets/city.list.partial_PE_US.json';
import ListCities from '../src/components/citytable';

export default function Home() {
  return (
    <div>
      <Container>
        <Grid 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h1" style={{ margin: '24px 0', fontSize: 38, fontWeight: 500 }}>Weather App</Typography>
          <ListCities rows={ListPartial} id="tableData" />
        </Grid>
      </Container>
    </div>
  )
}
