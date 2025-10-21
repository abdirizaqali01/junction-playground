import React from 'react';
import { Home, List, Calendar, FileText, Upload, Users } from 'lucide-react';

// Static banner image - replace with actual import
const BANNER_IMAGE = '/path/to/banner.png';

const Sidebar: React.FC = () => {
  return (
    <div className="w-[270px] h-screen bg-[#141414] text-white flex flex-col">
      {/* Partner Page Header */}
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-semibold mb-4">Partner Page</h1>
        
        {/* Event Card Banner */}
        <div className="rounded-lg overflow-hidden">
          <img 
            src={BANNER_IMAGE} 
            alt="Hack the Uncertainty 2023" 
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        {/* General Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3 px-2">General</h2>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#1e1e1e] transition-colors">
                <Home size={18} />
                <span className="text-sm">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#1e1e1e] transition-colors">
                <List size={18} />
                <span className="text-sm">All Challenges</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#1e1e1e] transition-colors">
                <Users size={18} />
                <span className="text-sm">Meeting Bookings</span>
              </a>
            </li>
          </ul>
        </div>

        {/* For You Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3 px-2">For You</h2>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#1e1e1e] transition-colors">
                <FileText size={18} />
                <span className="text-sm">Your Challenge</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#2d2d2d] text-white transition-colors">
                <Upload size={18} />
                <span className="text-sm font-medium">Project Submissions</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#1e1e1e] transition-colors">
                <Users size={18} />
                <span className="text-sm">Your Teams</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Partner Profile Footer */}
      <div className="p-4 border-t border-[#2d2d2d]">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1e1e1e]">
          <div className="w-10 h-10 bg-[#2d2d2d] rounded-lg flex items-center justify-center text-lg font-semibold">
            Pa
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Partner</div>
            <div className="text-xs text-gray-400 truncate">personnel@partner.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;