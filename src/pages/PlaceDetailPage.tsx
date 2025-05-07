import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Title,
  Text,
  Image,
  Grid,
  Badge,
  Group,
  Loader,
  Center,
  Card,
  SimpleGrid,
  Container,
  ActionIcon,
  Paper,
  Tabs,
  Alert,
  Divider,
} from '@mantine/core';
import { IconAlertCircle, IconCloud, IconMapPin, IconTemperature } from '@tabler/icons-react';
import { usePlace } from '../hooks/usePlaces';

export const PlaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: place, isLoading, error } = usePlace(id);

  if (isLoading) {
    return (
      <Center style={{ height: '50vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error || !place) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        Failed to load place details. Please try again later.
      </Alert>
    );
  }

  return (
    <Container size="lg" px={0}>
        <Grid gutter="xl">
            <Grid.Col md={8}>
            <Image src={place.image} radius="md" height={400} alt={place.name} />
            
            <Group position="apart" mt="lg">
                <div>
                    <Title order={1}>{place.name}</Title>
                    <Group spacing="xs">
                        <IconMapPin size={16} />
                        <Text size="lg" color="dimmed">
                        {place.location}
                        </Text>
                    </Group>
                </div>
                <Group>
                    {place.is_featured && <Badge size="lg" color="pink">Featured</Badge>}
                    <Badge size="lg" color="blue">{place.category_name}</Badge>
                </Group>
            </Group>

            <Divider my="lg" />

            <Tabs defaultValue="description">
                <Tabs.List>
                    <Tabs.Tab value="description">Description</Tabs.Tab>
                    <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="description" pt="md">
                <Text size="md" style={{ whiteSpace: 'pre-line' }}>{place.description}</Text>
                </Tabs.Panel>

                <Tabs.Panel value="gallery" pt="md">
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    {place.gallery.map((item) => (
                    <Image key={item.id} src={item.image} radius="md" alt={`Gallery image ${item.id}`} />
                    ))}
                </SimpleGrid>
                </Tabs.Panel>
            </Tabs>
            </Grid.Col>
        </Grid>
    </Container>
  );
};