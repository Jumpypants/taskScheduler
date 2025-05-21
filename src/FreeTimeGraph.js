import React, { useRef, useEffect, useState } from 'react';

function FreeTimeGraph({ freeTime, availableTime }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries.length > 0) {
        const { width } = entries[0].contentRect;
        setCanvasSize({ width, height: 300 });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || freeTime.length < 2) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvasSize;

    ctx.clearRect(0, 0, width, height);

    const verticalPadding = 40; // extra space for legend
    const graphHeight = height - verticalPadding * 2;
    const maxVal = Math.max(...freeTime, ...(availableTime || []), 1);

    const numPoints = freeTime.length;
    const stepX = width / (numPoints - 1 + 1);
    const offsetX = stepX / 2;

    const formatMinutes = (min) => {
      const h = Math.floor(min / 60);
      const m = min % 60;
      return `${h}:${m.toString().padStart(2, '0')}`;
    };

    const drawLineAndPoints = (data, color, labelOffset = 0) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      ctx.beginPath();
      data.forEach((val, i) => {
        const x = offsetX + i * stepX;
        const y = height - verticalPadding - (val / maxVal) * graphHeight;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Labels and Dotted lines
      ctx.font = '16px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      data.forEach((val, i) => {
        const x = offsetX + i * stepX;
        const y = height - verticalPadding - (val / maxVal) * graphHeight;

        // Dotted line
        ctx.strokeStyle = "gray";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Label
        ctx.fillStyle = color;
        ctx.fillText(formatMinutes(val), x, y - 6 - labelOffset);
      });
    };

    const LABEL_OFFSET = 6;

    drawLineAndPoints(freeTime, '#4CAF50', LABEL_OFFSET);
    if (availableTime?.length === freeTime.length) {
      drawLineAndPoints(availableTime, '#2196F3', -LABEL_OFFSET * 4);
    }


    // Define legend items
    const legendItems = [{ color: '#4CAF50', label: 'Free Time' }];
    if (availableTime?.length === freeTime.length) {
      legendItems.push({ color: '#2196F3', label: 'Average Available Time After Tasks' });
    }

    // Calculate total legend width
    ctx.font = '14px sans-serif';
    const boxWidth = 10;
    const spacing = 10;
    const marginBetweenItems = 30;

    let totalLegendWidth = 0;
    legendItems.forEach(item => {
      const textWidth = ctx.measureText(item.label).width;
      totalLegendWidth += boxWidth + spacing + textWidth + marginBetweenItems;
    });
    totalLegendWidth -= marginBetweenItems; // remove last margin

    // Starting x to center the legend
    let legendX = (canvas.width - totalLegendWidth) / 2;
    const legendY = 15;

    // Draw each item
    legendItems.forEach(item => {
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, legendY - 5, boxWidth, boxWidth);

      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, legendX + boxWidth + spacing, legendY);

      const textWidth = ctx.measureText(item.label).width;
      legendX += boxWidth + spacing + textWidth + marginBetweenItems;
    });


  }, [freeTime, availableTime, canvasSize]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '300px' }} />
    </div>
  );
}

export default FreeTimeGraph;
