import { useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

export default function CustomLightbox({
  open,
  handleShowLightbox,
  avatarUrl,
}) {
  const zoomRef = useRef(null);

  return (
    <Lightbox
      open={open}
      close={() => handleShowLightbox(false)}
      styles={{
        container: {
          backgroundColor: "rgba(17, 24, 39, .8)",
          backdropFilter: "blur(10px)",
        },
      }}
      controller={{ closeOnBackdropClick: true }}
      plugins={[Fullscreen, Zoom]}
      zoom={{ ref: zoomRef }}
      on={{
        click: () => zoomRef.current?.zoomIn(),
      }}
      slides={[{ src: avatarUrl }]}
      carousel={{ finite: true }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
    />
  );
}
