import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const IconDots = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="5" r="1.75" fill="currentColor" />
    <circle cx="12" cy="12" r="1.75" fill="currentColor" />
    <circle cx="12" cy="19" r="1.75" fill="currentColor" />
  </svg>
);
const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
    <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
  </svg>
);
const IconDelete = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z" fill="currentColor" />
    <path d="M9 4h6l1 2H8l1-2z" fill="currentColor" />
  </svg>
);

const RowActions: React.FC<Props> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({ visibility: 'hidden' });

  // compute and set menu position
  const positionMenu = useCallback(() => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger || !menu) return;

    const rect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // prefer placing below/right aligned to trigger
    let top = rect.bottom + window.scrollY + 8; // 8px gap
    let left = rect.left + window.scrollX; // align left edge

    // if not enough space to the right for default menu width, try align right edge to trigger.right
    if (left + menuRect.width > vw - 8 /* margin */) {
      left = Math.max(8, rect.right + window.scrollX - menuRect.width);
    }

    // if not enough space below, place above
    if (top + menuRect.height - window.scrollY > vh - 8) {
      top = rect.top + window.scrollY - menuRect.height - 8;
    }

    // fallback clamp to viewport
    left = Math.max(8 + window.scrollX, Math.min(left, vw - menuRect.width - 8 + window.scrollX));
    top = Math.max(8 + window.scrollY, Math.min(top, window.scrollY + vh - menuRect.height - 8));

    setMenuStyle({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999,
      visibility: 'visible',
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle((s) => ({ ...s, visibility: 'hidden' }));
      return;
    }
    // initially set visibility hidden to measure size
    setMenuStyle((s) => ({ ...s, visibility: 'hidden' }));
    // next tick measure and position
    requestAnimationFrame(() => {
      positionMenu();
    });
  }, [open, positionMenu]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        (triggerRef.current === target || triggerRef.current.contains(target))
      ) {
        // clicked the trigger: let toggle logic handle it
        return;
      }
      if (menuRef.current && menuRef.current.contains(target)) {
        // clicked inside menu
        return;
      }
      // clicked outside
      setOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    function onScrollOrResize() {
      if (open) positionMenu();
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('scroll', onScrollOrResize, true); // capture scroll
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('scroll', onScrollOrResize, true);
    };
  }, [open, positionMenu]);

  // render menu into portal
  const menu = open ? createPortal(
    <div ref={menuRef} style={menuStyle} role="menu" aria-orientation="vertical">
      <div className="w-44 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">

        <div className="py-2">
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="w-full text-left px-3 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
            role="menuitem"
          >
            <span className="text-gray-600">{<IconEdit />}</span>
            <span>Edit</span>
          </button>

          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full text-left px-3 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
            role="menuitem"
          >
            <span className="text-gray-600">{<IconDelete />}</span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>,
    // safe guard for server-side rendering
    typeof document !== 'undefined' ? document.body : document.createElement('div')
  ) : null;

  return (
    <>
      <div className="relative inline-flex items-center">
        <button
          ref={triggerRef}
          onClick={() => setOpen((s) => !s)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Open actions"
          className="p-1 rounded hover:bg-gray-100 text-gray-600 flex items-center justify-center"
          title="Actions"
        >
          <span className="inline-block" style={{ lineHeight: 0 }}>
            <IconDots />
          </span>
        </button>
      </div>

      {menu}
    </>
  );
};

export default RowActions;