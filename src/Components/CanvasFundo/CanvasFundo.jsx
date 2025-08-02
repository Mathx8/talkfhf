import React, { useRef, useEffect } from "react";
import { useTheme } from "../../ThemeContext";

const CanvasFundo = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const mouse = useRef({ x: null, y: null });
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const width = () => canvas.width;
    const height = () => canvas.height;

    const createStars = () => {
      stars.current = [];

      const starDensity = 0.001;
      const numStars = Math.floor(width() * height() * starDensity);

      for (let i = 0; i < numStars; i++) {
        stars.current.push({
          x: Math.random() * width(),
          y: Math.random() * height(),
          baseRadius: Math.random() * 2.0 + 1.0,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          delta: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const updateStars = () => {
      for (let star of stars.current) {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.delta *= -1;
        }
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, width(), height());

      const effectRadius = 60;

      for (let star of stars.current) {
        let drawnRadius = star.baseRadius;

        if (mouse.current.x !== null && mouse.current.y !== null) {
          const dx = star.x - mouse.current.x;
          const dy = star.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < effectRadius) {
            const extra = ((effectRadius - dist) / effectRadius) * 2.5;
            drawnRadius = star.baseRadius + extra;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, drawnRadius, 0, Math.PI * 2);
        let opacity = star.alpha;
        let color = isDark
          ? { r: 255, g: 255, b: 255 }
          : { r: 0, g: 0, b: 0 };

        if (mouse.current.x !== null && mouse.current.y !== null) {
          const dx = star.x - mouse.current.x;
          const dy = star.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < effectRadius) {
            const boost = (effectRadius - dist) / effectRadius;
            opacity = Math.min(1, opacity + boost * 0.5);
            color = { r: 230, g: 57, b: 70 };
          }
        }

        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        ctx.fill();
      }
    };

    const animate = () => {
      updateStars();
      drawStars();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    createStars();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    />
  );
};

export default CanvasFundo;
