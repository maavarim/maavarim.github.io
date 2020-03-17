import React, { useState, Fragment } from "react";
import * as QRCodeLib from "easyqrcodejs";
import styles from "./QRCode.module.scss";
import { ButtonBase, Box, CircularProgress } from "@material-ui/core";
import { CloudDownloadTwoTone } from "@material-ui/icons";

const SINGLE_PIXEL_BASE64_DATA =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

export const getQrCodeUrl = (options: any) =>
  new Promise<string>(resolve => {
    const currentRef = document.createElement("div");
    if (currentRef === null) return;

    currentRef.innerHTML = "";
    new QRCodeLib(currentRef, options);

    const imgEl = currentRef.children[1] as HTMLImageElement;
    var observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "src"
        ) {
          const imgSrc = imgEl.src;
          if (
            imgSrc.startsWith("data:image/") &&
            imgSrc !== SINGLE_PIXEL_BASE64_DATA
          )
            resolve(imgSrc);
        }
      });
    });
    observer.observe(imgEl, { attributes: true });
  });

interface QRCodeProps {
  options: any;
}

const QRCode = ({ options }: QRCodeProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  getQrCodeUrl(options).then(setQrCodeDataUrl);

  return (
    <div className={styles.qrCode}>
      {qrCodeDataUrl === null && (
        <Box className={styles.loading}>
          <CircularProgress size={18} thickness={4} color="inherit" />
        </Box>
      )}
      {qrCodeDataUrl && (
        <Fragment>
          <img src={qrCodeDataUrl} alt="QR code" />
          <a href={qrCodeDataUrl} download="qrcode.png">
            <ButtonBase className={styles.hoverArea}>
                <CloudDownloadTwoTone />
                הורדה
            </ButtonBase>
          </a>
        </Fragment>
      )}
    </div>
  );
};

export default QRCode;
