import Image, { type StaticImageData } from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * A real screen, in a device.
 *
 * The contents are simulator captures of the app running, not a recreation —
 * an HTML rebuild of a SwiftUI screen is a reimplementation in a different text
 * engine, and it drifted by up to 112pt of vertical rhythm before it looked
 * wrong enough to notice. The capture cannot drift. See `docs/screens.md` for
 * how to retake them when the app changes.
 *
 * Only the device is drawn here: a thin shell, and no drop shadow, because the
 * app does not float things and a phone hovering over the sheet on a soft grey
 * blur is the one gesture this page is trying hardest not to make.
 *
 * It is sized by height (see `.phone` in globals.css) so a screen always fits
 * the viewport rather than running off the bottom of it.
 */
export function Phone({
  src,
  alt,
  priority = false,
  className,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("phone select-none", className)}>
      <div className="phone-screen">
        <Image
          src={src}
          alt={alt}
          width={402}
          height={874}
          sizes="340px"
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
