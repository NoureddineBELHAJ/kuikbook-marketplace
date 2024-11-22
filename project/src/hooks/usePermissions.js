import { useMemo } from 'react';
import { createMongoAbility } from '@casl/ability';
import { useAuth } from './useAuth';

const defineAbilityFor = (user) => {
  const { role } = user;

  return createMongoAbility([
    // Admin Rules
    ...(role === 'ADMIN' ? [
      { action: 'manage', subject: 'all' },
      { action: 'access', subject: 'admin_panel' },
      { action: 'manage', subject: 'users' },
      { action: 'manage', subject: 'activities' },
      { action: 'manage', subject: 'bookings' },
      { action: 'manage', subject: 'payments' }
    ] : []),

    // Provider Rules
    ...(role === 'PROVIDER' ? [
      { action: 'read', subject: 'activities' },
      { action: 'create', subject: 'activities' },
      { action: 'update', subject: 'activities', conditions: { providerId: user.id } },
      { action: 'delete', subject: 'activities', conditions: { providerId: user.id } },
      { action: 'read', subject: 'bookings', conditions: { providerId: user.id } },
      { action: 'manage', subject: 'provider_profile', conditions: { userId: user.id } },
      { action: 'read', subject: 'analytics', conditions: { providerId: user.id } }
    ] : []),

    // Traveler Rules
    ...(role === 'TRAVELER' ? [
      { action: 'read', subject: 'activities' },
      { action: 'book', subject: 'activities' },
      { action: 'create', subject: 'reviews' },
      { action: 'manage', subject: 'bookings', conditions: { userId: user.id } },
      { action: 'manage', subject: 'favorites' },
      { action: 'manage', subject: 'traveler_profile', conditions: { userId: user.id } }
    ] : [])
  ]);
};

export function usePermissions() {
  const { user } = useAuth();
  
  const ability = useMemo(() => {
    if (!user) return defineAbilityFor({ role: 'public' });
    return defineAbilityFor(user);
  }, [user]);

  return {
    ability,
    can: (action, subject, field) => ability.can(action, subject, field),
    cannot: (action, subject, field) => ability.cannot(action, subject, field)
  };
}