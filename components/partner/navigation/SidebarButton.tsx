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
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] transition-colors ${
        active
          ? 'bg-white/10 text-white font-medium'
          : 'text-white/50 hover:text-white'
      }`}
    >
      <Icon size={16} />
      <span className="text-[12px] tracking-wide">{label}</span>
    </a>
  );
};

export default SidebarButton;
