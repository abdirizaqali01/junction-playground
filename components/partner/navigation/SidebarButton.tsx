'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import * as style from '@/styles/design-system'
import { partnerSurfaces, partnerText } from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

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
      className={`flex items-center gap-2.5 px-2.5 py-2 lg:px-4 lg:py-3 ${style.border.radius.middle} transition-colors hover:text-[var(--sidebar-hover)]`}
      style={withVars(
        {
          backgroundColor: active ? partnerSurfaces.muted : 'transparent',
          color: active ? partnerText.primary : partnerText.soft,
          fontWeight: active ? 600 : undefined,
        },
        { '--sidebar-hover': partnerText.secondary }
      )}
    >
      <Icon size={16} />
      <span className="text-[0.82rem]">{label}</span>
    </a>
  );
};

export default SidebarButton;
