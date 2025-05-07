import React from 'react';
import { Card, Image, Text, Badge, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconMap } from '@tabler/icons-react';
import { Place } from '../types/Index';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={place.image} height={160} alt={place.name} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{place.name}</Text>
        {place.is_featured && <Badge color="pink">Featured</Badge>}
      </Group>

      <Group position="left" spacing="xs">
        <IconMap size={16} />
        <Text size="sm" color="dimmed">
          {place.location}
        </Text>
      </Group>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        to={`/place/${place.id}`}
      >
        Explore
      </Button>
    </Card>
  );
};
