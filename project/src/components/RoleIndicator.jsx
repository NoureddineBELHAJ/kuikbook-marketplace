import { useAuth } from '../hooks/useAuth';

export default function RoleIndicator() {
  const { user, currentRole, getRoleName, getRoleColor } = useAuth();

  if (!user || !currentRole) return null;

  const roleColor = getRoleColor();
  const roleName = getRoleName();

  return (
    <div 
      className="fixed top-4 right-4 px-4 py-2 rounded-full shadow-sm border flex items-center space-x-2"
      style={{ 
        backgroundColor: `${roleColor}10`,
        color: roleColor,
        borderColor: roleColor
      }}
    >
      <div 
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: roleColor }}
      />
      <span className="text-sm font-medium">{roleName}</span>
    </div>
  );
}