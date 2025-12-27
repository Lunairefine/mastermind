"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import sdk from '@farcaster/frame-sdk';

interface FarcasterUser {
  displayName?: string;
  username?: string;
  pfpUrl?: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContext = async () => {
      try {
        const context = await sdk.context;
        if (context && context.user) {
          setUser({
            displayName: context.user.displayName,
            username: context.user.username,
            pfpUrl: context.user.pfpUrl,
          });
        }
      } catch (error) {
      } finally {
        setIsLoaded(true);
      }
    };

    if (sdk && !isLoaded) {
      loadContext();
      sdk.actions.ready();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="w-full mt-2 animate-pulse">
        <div className="w-full border border-gray-800 bg-[#0a0a0a] rounded-xl p-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800" />
          <div className="flex flex-col gap-2 w-32">
            <div className="h-3 bg-gray-800 rounded w-full" />
            <div className="h-2 bg-gray-800 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-2">
      <div className="w-full border border-gray-800 bg-[#0a0a0a] rounded-xl p-3 flex items-center gap-4 select-none">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-600 bg-gray-800 shrink-0">
          {user?.pfpUrl ? (
            <Image 
              src={user.pfpUrl} 
              alt={user.username || "User"} 
              width={48} 
              height={48} 
              className="object-cover"
              unoptimized 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tracking-wide truncate max-w-[200px]">
            {user?.displayName || "Guest User"}
          </span>
          <span className="text-gray-500 text-xs">
            @{user?.username || "unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;