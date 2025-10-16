import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function ThreeDotMenu() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Last 2 days');
  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [dropdownStyles, setDropdownStyles] = useState({
    top: '100%',
    right: '0px',
    opacity: 0,
    transform: 'scale(0.95)',
  });

  // Close dropdown when clicked outside
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
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Adjust dropdown position smoothly and without flicker
  useEffect(() => {
    if (open && buttonRef.current && dropdownRef.current) {
      // Wait until the DOM paints, then measure
      const rafId = requestAnimationFrame(() => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();

        const spaceRight = window.innerWidth - buttonRect.right;
        const spaceLeft = buttonRect.left;
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        const newStyles = {
          position: 'absolute',
          zIndex: 50,
          opacity: 1,
          transform: 'scale(1)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        };

        // Vertical positioning
        if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
          newStyles.bottom = '100%';
          newStyles.top = 'auto';
          newStyles.marginBottom = '8px';
          newStyles.transformOrigin = 'bottom right';
        } else {
          newStyles.top = '100%';
          newStyles.bottom = 'auto';
          newStyles.marginTop = '8px';
          newStyles.transformOrigin = 'top right';
        }

        // Horizontal positioning
        if (spaceRight < dropdownRect.width && spaceLeft > dropdownRect.width) {
          newStyles.right = '0px';
          newStyles.left = 'auto';
        } else if (spaceRight < dropdownRect.width) {
          newStyles.left = `${Math.max(8, window.innerWidth - dropdownRect.width - 8)}px`;
          newStyles.right = 'auto';
        } else if (spaceLeft < dropdownRect.width / 2) {
          newStyles.left = '0px';
          newStyles.right = 'auto';
        } else {
          newStyles.right = '0px';
          newStyles.left = 'auto';
        }

        // Mobile responsiveness
        newStyles.maxWidth = '95vw';
        newStyles.minWidth = '150px';

        setDropdownStyles(newStyles);
      });

      return () => cancelAnimationFrame(rafId);
    } else {
      // Animate closing
      setDropdownStyles((prev) => ({
        ...prev,
        opacity: 0,
        transform: 'scale(0.95)',
      }));
    }
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition"
      >
        <MoreHorizontal />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          style={dropdownStyles}
          className="absolute bg-white shadow-lg rounded-lg p-3 border border-gray-100 flex flex-col gap-2"
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
