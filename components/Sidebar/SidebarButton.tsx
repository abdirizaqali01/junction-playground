'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  label,
  active = false,
  href = '#',
}) => {
  return (
    <a
      href={href}
      className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-[11px] transition-colors ${
        active
          ? 'bg-white/5 text-white font-medium'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon size={14} />
      <span>{label}</span>
    </a>
  );
};

export default SidebarButton;