import React from 'react';
import { AppShell, Header, Group, Button, Title, Container } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useLogout } from '../hooks/useAuth';

export const Layout: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useLogout();

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
            <Container size="xl">
                <Group position="apart">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Title order={3}>Traveller</Title>
                    </Link>

                    <Group>
                        {isAuthenticated ? (
                        <>
                            <Button component={Link} to="/favorites" variant="subtle">
                            My Favorites
                            </Button>
                            <Button onClick={logout} color="red">
                            Logout
                            </Button>
                        </>
                        ) : (
                        <>
                            <Button component={Link} to="/login" variant="subtle">
                            Login
                            </Button>
                            <Button component={Link} to="/register" variant="filled">
                            Register
                            </Button>
                        </>
                        )}
                    </Group>
                </Group>
            </Container>
        </Header>
      }
    >
        <Container size="xl" py="xl">
            <Outlet />
        </Container>
    </AppShell>
  );
};