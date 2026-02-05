import { useEffect } from 'react';
import './MoodAnimation.css';

const MoodAnimation = () => {
  useEffect(() => {
    const heartMap = [
      [0,1,0,0,0,1,0],
      [1,1,1,0,1,1,1],
      [1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1],
      [0,1,1,1,1,1,0],
      [0,0,1,1,1,0,0],
      [0,0,0,1,0,0,0]
    ];

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'pixel-heart';
      
      heartMap.forEach(row => {
        row.forEach(cell => {
          const pixel = document.createElement('div');
          pixel.className = 'pixel';
          pixel.style.opacity = cell ? '1' : '0';
          heart.appendChild(pixel);
        });
      });

      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.animationDuration = (3 + Math.random() * 3) + 's';
      
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 6000);
    };

    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default MoodAnimation;