import { Typography, Container, Grid, TextField, Button, Collapse, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useEffect, useState } from 'react';
import RouterLink from 'next/router';
import ListPartial from '../src/assets/city.list.partial_PE_US.json';
import ListCities from '../src/components/citytable';
import Search from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/Close';

export default function Home() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setCities(ListPartial);
  }, [ListPartial]);

  const handleChange = () => (event) => {
    const result = cities.filter(city => city.name.toLowerCase() === event.target.value.toLowerCase());
    if (result.length > 0) {
      setSearch(result[0].id);
    } else {
      setSearch('');
    }
  };

  const handleSearch = () => {
    if (search !== '') {
      RouterLink.push(`/city/${search}`); 
    } else {
      setIsError(true);
    }
  }

  return (
    <div>
      <Container>
        <Grid 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h1" style={{ margin: '48px 0px 10px 0', fontSize: 38, color: '#444e65', fontWeight: 600, textAlign: 'center' }}>Weather App</Typography>
            <Typography variant="body1" style={{ textAlign: 'center', color: '#8ea8bf', fontWeight: 500 }}>You can find your favorite city</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item>
              <TextField style={{ width: 400, marginTop: 6 }} id="search-city" label="search" variant="outlined" onChange={handleChange()} />
            </Grid>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: '20px auto', width: 200 }}
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Collapse in={isError}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setIsError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                We couldn't found this city!
              </Alert>
            </Collapse>
          </Grid>
          <Grid item style={{ width: '80%', marginTop: 20 }}>
            <ListCities rows={cities} id="tableData" />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
