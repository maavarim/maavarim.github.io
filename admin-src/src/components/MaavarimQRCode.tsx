import React from "react";
import config from "../config";
import QRCode from "./QRCode";

const QR_CODE_DIM = 524;
const QUIET_ZONE = 12;

export const qrCodeConfig = (key: string) => ({
  text: config.URL_BASE + key,
  height: QR_CODE_DIM - QUIET_ZONE * 2,
  width: QR_CODE_DIM - QUIET_ZONE * 2,
  backgroundImage: `${process.env.PUBLIC_URL}/logo.jpg`,
  autoColor: true,
  backgroundImageAlpha: 0.75,
  dotScale: 0.5,
  quietZone: QUIET_ZONE
});

interface MaavarimQRCode {
  memberKey: string;
}

const MaavarimQRCode = ({ memberKey }: MaavarimQRCode) => (
  <QRCode options={qrCodeConfig(memberKey)} />
);

export default MaavarimQRCode;
