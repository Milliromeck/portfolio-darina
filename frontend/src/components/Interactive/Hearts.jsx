import { useEffect } from 'react';
import './Hearts.css';

const Hearts = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      
      //карта сердца
      const heartMap = [
        [0,1,0,0,0,1,0],
        [1,1,1,0,1,1,1],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0]
      ];

      // делаем пиксели
      heartMap.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'heart-row';
        row.forEach(cell => {
          const pixel = document.createElement('div');
          pixel.className = 'heart-pixel';
          pixel.style.opacity = cell ? '0.8' : '0';
          rowDiv.appendChild(pixel);
        });
        heart.appendChild(rowDiv);
      });

      const x = Math.random() * window.innerWidth;
      const duration = 3 + Math.random() * 4;
      const scale = 0.4 + Math.random() * 0.6;
      const rotation = Math.random() * 360;
      const colorHue = Math.random() * 360;

      heart.style.cssText = `
        left: ${x}px;
        top: -100px;
        transform: scale(${scale}) rotate(${rotation}deg);
        animation: heartFloat ${duration}s linear forwards;
        filter: hue-rotate(${colorHue}deg);
      `;
      
      document.body.appendChild(heart);
      
      // удаление после анимации
      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, duration * 1000);
    };

    // создание сердец
    const interval = setInterval(createHeart, 600);

    // чистка
    return () => {
      clearInterval(interval);
      document.querySelectorAll('.floating-heart').forEach(heart => {
        heart.remove();
      });
    };
  }, []);

  return null;
};

export default Hearts;
