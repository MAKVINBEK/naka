import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QR({ value, size = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "H",
    });
  }, [value, size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size }} />;
}
