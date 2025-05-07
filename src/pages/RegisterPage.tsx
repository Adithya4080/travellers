import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { RegisterData } from '../types/Index';

export const RegisterPage: React.FC = () => {
  const [userData, setUserData] = useState<RegisterData>({ 
    name: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  });
  const register = useRegister();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register.mutate(userData);
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} align="center" mb="md">
          Join Traveller
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            placeholder="John Doe"
            required
            value={userData.name}
            onChange={handleChange}
            mb="md"
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="your@email.com"
            required
            value={userData.email}
            onChange={handleChange}
            mb="md"
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            required
            value={userData.password}
            onChange={handleChange}
            mb="md"
          />
          <PasswordInput
            label="Confirm Password"
            name="password_confirmation"
            placeholder="Confirm your password"
            required
            value={userData.password_confirmation}
            onChange={handleChange}
            mb="xl"
          />

          <Button type="submit" fullWidth loading={register.isLoading}>
            Register
          </Button>
        </form>

        <Text align="center" mt="md">
          Already have an account?{' '}
          <Text component={Link} to="/login" variant="link">
            Sign in
          </Text>
        </Text>
      </Paper>
    </Container>
  );
};
