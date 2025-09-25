import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function ThreeDotMenu() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Last 2 days');
  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [dropdownStyles, setDropdownStyles] = useState({ right: '0px' });

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate dropdown position to prevent overflow
  useEffect(() => {
    if (open && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      const spaceRight = window.innerWidth - buttonRect.right;
      const spaceLeft = buttonRect.left;

      if (spaceRight < dropdownWidth && spaceLeft > dropdownWidth) {
        setDropdownStyles({ left: '0px', right: 'auto' }); // flip left
      } else if (spaceRight < dropdownWidth) {
        setDropdownStyles({
          right: '0px',
          left: 'auto',
          maxWidth: `${window.innerWidth - buttonRect.left - 8}px`, // fit small screens
        });
      } else {
        setDropdownStyles({ right: '0px', left: 'auto' }); // default right
      }
    }
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <MoreHorizontal />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          style={dropdownStyles}
          className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-50 w-auto min-w-[150px] max-w-[90vw] flex flex-col gap-2"
        >
          <div className="text-sm md:text-base font-semibold">Last days filter</div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border px-2 py-1 md:px-3 md:py-2 rounded text-sm md:text-base"
          >
            <option>Last 2 days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      )}
    </div>
  );
}
