import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { LoginCredentials } from '../types/Index';

// Define the API payload type to match what the backend expects
interface LoginPayload {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const login = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Transform the credentials to match the expected API format
    const payload: LoginPayload = {
      username: credentials.email, // Map email to username for the API
      password: credentials.password
    };
    login.mutate(payload as unknown as LoginCredentials);
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} align="center" mb="md">
          Welcome back to Traveller
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            name="email"
            placeholder="your@email.com"
            required
            value={credentials.email}
            onChange={handleChange}
            mb="md"
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            required
            value={credentials.password}
            onChange={handleChange}
            mb="xl"
          />

          <Button type="submit" fullWidth loading={login.isLoading}>
            Sign in
          </Button>
        </form>

        <Text align="center" mt="md">
          Don't have an account?{' '}
          <Text component={Link} to="/register" variant="link">
            Register
          </Text>
        </Text>
      </Paper>
    </Container>
  );
};