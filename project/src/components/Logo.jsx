import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Logo({ className = '' }) {
  const { user, getRoleColor } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  // Use Nardo Grey for public space, or role-specific color if logged in
  const color = user ? getRoleColor() : '#7C7F86';

  return (
    <div 
      className={`flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-baseline space-x-[1px]">
        <span 
          className="text-[2rem] font-light tracking-tight font-display transition-opacity duration-300"
          style={{ 
            color,
            opacity: isHovered ? 0.9 : 1 
          }}
        >
          kuik
        </span>
        <span 
          className="text-[2rem] font-bold tracking-normal font-display transition-opacity duration-300"
          style={{ 
            color,
            opacity: isHovered ? 0.9 : 1 
          }}
        >
          book
        </span>
        <span 
          className="text-[2rem] tracking-tighter font-display transition-opacity duration-300"
          style={{ 
            color: `${color}80`,
            opacity: isHovered ? 0.9 : 1 
          }}
        >
          .com
        </span>
      </div>
    </div>
  );
}