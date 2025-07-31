import { useState } from "react";

interface UseWidthProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useWidth = ({ containerRef }: UseWidthProps) => {
  const [width, setWidth] = useState(50);

  // Provide a handler to allow resizing the left panel by dragging
  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;

      const deltaX = moveEvent.clientX - startX;
      // Use the parent container's ref for more accurate calculations if available,
      // but since we're working with percentages, we don't need the precise pixel width.
      const containerWidth = containerRef.current.clientWidth;
      let newWidth = ((startWidth / 100) * containerWidth + deltaX) / containerWidth * 100;
      newWidth = Math.max(0, Math.min(100, newWidth)); // Clamp between 0% and 100%
      setWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Return the width and the resize handler

  return { width, handleResize };
};