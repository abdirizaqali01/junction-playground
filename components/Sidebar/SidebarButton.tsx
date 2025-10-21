'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
  collapsed?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  label,
  active = false,
  href = '#',
  collapsed = false,
}) => {
  return (
    <a
      href={href}
      className={`flex items-center ${collapsed ? 'justify-center gap-0' : 'gap-2.5'} px-2 py-2 rounded-lg text-[11px] transition-colors ${
        active
          ? 'bg-white/5 text-white font-medium'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon size={16} />
      {!collapsed && <span>{label}</span>}
    </a>
  );
};

export default SidebarButton;
