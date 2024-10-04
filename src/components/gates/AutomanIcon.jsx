import { useSearchParams } from "next/navigation";
import { GatesContext } from "../GatesContext";
import { GsapAnimation } from "../triggerGsapAnimation";
import { Suspense, useContext, useEffect } from "react";

function AutoManIcon() {
  const searchParams = useSearchParams();
  const { width } = useContext(GatesContext);
  const sku = searchParams.get("sku")?.split("-");
  const isMan = sku && sku[6] === "1";
  const isAut = sku && sku[6] === "2";

  useEffect(() => {
    GsapAnimation("#AMIcon", { x: 144 + (width - 36) * 0.5 });
  }, [width]);

  if (!isMan && !isAut) {
    return null;
  }

  return (
    <Suspense>
      <svg
        id="AMIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1 -1 248 96"
        className="absolute top-0"
      >
        <image
          x={144 + (width - 36) * 0.5}
          y="42"
          className="h-3 w-3 md:h-2.5 md:w-2.5"
          href={isMan ? "/manualSvg.svg" : "/automaticSvg.svg"}
        />
      </svg>
    </Suspense>
  );
}

export default AutoManIcon;
