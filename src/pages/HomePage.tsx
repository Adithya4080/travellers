import React, { useState, FormEvent } from 'react';
import { Grid, Title, Text, TextInput, Group, Select, Loader, Center, Alert, Button } from '@mantine/core';
import { IconSearch, IconAlertCircle } from '@tabler/icons-react';
import { usePlaces } from '../hooks/usePlaces';
import { PlaceCard } from '../components/PlaceCard';
import { useSearchParams } from 'react-router-dom';
import { Place } from '../types/Index';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'name';

  const [search, setSearch] = useState(searchQuery);
  const [sort, setSort] = useState(sortBy);

  const { data: places, isLoading, error } = usePlaces();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
  };

  const handleSortChange = (value: string | null) => {
    setSort(value || 'name');
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    
    setSearchParams(params);
  };

  const filteredPlaces = places
    ? places.filter((place: Place) => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        place.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const sortedPlaces = [...filteredPlaces].sort((a: Place, b: Place) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'location') {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  if (isLoading) {
    return (
      <Center style={{ height: '50vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        Failed to load places. Please try again later.
      </Alert>
    );
  }

  return (
    <>
      <Title order={1} mb="md">
        Discover Amazing Places
      </Title>
      <Text color="dimmed" mb="xl">
        Find your next travel destination from our collection of beautiful places around the world.
      </Text>

      <Group position="apart" mb="xl">
        <form onSubmit={handleSearch} style={{ flexGrow: 1 }}>
          <TextInput
            placeholder="Search by name or location"
            icon={<IconSearch size={14} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            rightSection={
              <Button type="submit" compact variant="subtle" style={{ marginRight: 16 }}>
                Search
              </Button>
            }
          />
        </form>
        <Select
          placeholder="Sort by"
          value={sort}
          onChange={handleSortChange}
          data={[
            { value: 'name', label: 'Name' },
            { value: 'location', label: 'Location' },
          ]}
          style={{ width: 120 }}
        />
      </Group>

      {sortedPlaces.length > 0 ? (
        <Grid>
          {sortedPlaces.map((place) => (
            <Grid.Col key={place.id} xs={12} sm={6} md={4} lg={3}>
              <PlaceCard place={place} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Center style={{ height: '200px' }}>
          <Text>No places found matching your search criteria.</Text>
        </Center>
      )}
    </>
  );
};