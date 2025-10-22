'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import * as style from '@/styles/design-system'

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
      className={`flex items-center gap-3 px-3 py-2.5 ${style.border.radius.middle} transition-colors ${
        active
          ? 'bg-white/10 text-white font-medium'
          : 'text-white/50 hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span className="text-[0.89rem]">{label}</span>
    </a>
  );
};

export default SidebarButton;
