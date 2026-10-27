import { useEffect, useRef, useState } from "react";
import type { Lot } from "../../types/types";
import { Box, Text } from "@mantine/core";
import { NavigationArrowIcon } from "@phosphor-icons/react";

type Props = {
  lots: Lot[];
  highlightedLotId: string;
};

function Wheel({ lots, highlightedLotId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [parentHeight, setParentHeight] = useState(0);
  const currentLotRef = useRef<HTMLParagraphElement | null>(null);
  const [currentLotHeight, setCurrentLotHeight] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.clientHeight);
    }
  }, [parentRef]);

  useEffect(() => {
    if (currentLotRef.current) {
      setCurrentLotHeight(currentLotRef.current.clientHeight);
    }
  }, [currentLotRef]);

  useEffect(() => {
    if (canvasRef?.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      const weights = lots.map((item) =>
        item.bets.reduce((prev, curr) => prev + (curr.value ?? 0), 1),
      );
      const total = weights.reduce((sum, weight) => sum + 1 / weight, 0);

      let startAngle = 0;

      if (ctx && parentHeight) {
        ctx.reset();

        lots.forEach((item, index) => {
          const sliceAngle = (1 / weights[index] / total) * 2 * Math.PI;
          const endAngle = startAngle + sliceAngle;
          const middleAngle = startAngle + sliceAngle / 2;
          const textRadius = radius * 0.65;
          const textX = centerX + Math.cos(middleAngle) * textRadius;
          const textY = centerY + Math.sin(middleAngle) * textRadius;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fillStyle = highlightedLotId
            ? highlightedLotId === item.id
              ? item.color
              : "gray"
            : item.color;
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.save();

          if (sliceAngle > 0.1) {
            ctx.fillStyle = "#fff";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.translate(textX, textY);
            ctx.rotate(middleAngle);
            ctx.fillText(item.name, 0, 0);
          }

          ctx.restore();

          startAngle = endAngle;
        });

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 360);
        ctx.closePath();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.clip();
        ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }, [canvasRef, lots, parentHeight, highlightedLotId]);

  return (
    <Box
      display="flex"
      style={{ width: "100%", height: "100%", flexDirection: "column" }}
    >
      <Text
        ref={currentLotRef}
        w={parentHeight}
        size="xl"
        fw={700}
        pb={16}
        style={{ textAlign: "center" }}
      >
        Название
      </Text>

      <Box
        ref={parentRef}
        style={{
          width: "100%",
          height: `calc(100% - ${currentLotHeight}px)`,
          position: "relative",
        }}
      >
        <NavigationArrowIcon
          size={75}
          weight="duotone"
          style={{
            position: "absolute",
            top: -20,
            left: parentHeight / 2,
            transform: "translateX(-50%) rotate(225deg)",
            transformOrigin: "center",
          }}
        />

        <canvas
          width={parentHeight}
          height={parentHeight}
          ref={canvasRef}
        ></canvas>
      </Box>
    </Box>
  );
}

export default Wheel;
