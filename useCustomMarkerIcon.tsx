// Unfortunately, all my repositories are private on GitHub, so I can’t share a direct link. However, here’s an example of a custom hook I’m proud of. It dynamically creates custom icons in Leaflet with different colors based on status (online, offline, etc.):

const { marker } = useCustomMarkerIcon({
  position,
  iconSize,
  iconAnchor,
  direction,
  speed,
  inputLayerDatetime,
  focusLocal,
});

// --------------

import { isOffline } from "@/utils/isOfflineUtil";
import L from "leaflet";

import useIconsColor from "./useIconsColor";

type CustomMarkerProps = {
  position: L.LatLngExpression;
  iconSize?: [number, number];
  iconAnchor?: [number, number];
  direction?: number;
  speed?: number;
  inputLayerDatetime?: number;
  focusLocal: boolean;
};

export default function useCustomMarkerIcon({
  position,
  iconSize = [30, 30],
  iconAnchor = [15, 30],
  direction = 0,
  speed = 0,
  inputLayerDatetime,
  focusLocal,
}: CustomMarkerProps) {
  const [defaultColorLocal, baseColor, focusColorBase] = useIconsColor();

  const offlineIconMark = L.marker(position, {
    icon: L.divIcon({
      html: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.7073 21.066C25.5693 21.2957 25.3885 21.4921 25.1779 21.6469L26.1045 22.5735C26.4795 22.9486 26.6902 23.4573 26.6902 23.9877C26.6902 24.5181 26.4795 25.0268 26.1044 25.4019L24.4711 27.0353C23.6901 27.8163 22.4237 27.8163 21.6427 27.0352L17.1673 22.5599V25.6666C17.1673 26.7712 16.2719 27.6666 15.1673 27.6666H12.834C11.7294 27.6666 10.834 26.7712 10.834 25.6666V20.4033C9.68745 21.5499 8.62076 22.6166 7.36487 23.8725C6.59366 24.6437 5.34677 24.6548 4.56191 23.8975C3.26465 22.6457 2.23945 21.1748 1.487 19.5014C0.713547 17.7813 0.333984 15.9397 0.333984 13.9999C0.333984 12.1257 0.691191 10.3382 1.4164 8.65753C1.60055 8.23076 1.80267 7.81661 2.02291 7.41548L0.919771 6.31234C0.544698 5.93727 0.333984 5.42856 0.333984 4.89812C0.333984 4.36769 0.544698 3.85898 0.919771 3.48391L2.5531 1.85058C3.33415 1.06953 4.60048 1.06953 5.38153 1.85058L6.35728 2.82633C6.51202 2.61586 6.70838 2.43513 6.93797 2.29707C7.48628 1.96736 8.06009 1.67378 8.65826 1.41567C10.3389 0.690458 12.1265 0.333252 14.0007 0.333252C15.8748 0.333252 17.6624 0.690458 19.343 1.41567C20.9849 2.12413 22.433 3.09548 23.669 4.33154C24.9051 5.5676 25.8764 7.0157 26.5849 8.65753C27.3101 10.3382 27.6673 12.1257 27.6673 13.9999C27.6673 15.9397 27.2878 17.7844 26.5164 19.5114C26.2756 20.0505 26.0061 20.569 25.7073 21.066Z" fill="${baseColor}"/>
<path d="M23.9932 20.0357C24.249 19.6101 24.4814 19.1635 24.6902 18.6959C25.3416 17.2375 25.6673 15.6723 25.6673 14C25.6673 12.3862 25.3611 10.8695 24.7486 9.45004C24.1361 8.0306 23.3048 6.79587 22.2548 5.74587C21.2048 4.69587 19.9701 3.86462 18.5507 3.25212C17.1312 2.63962 15.6145 2.33337 14.0007 2.33337C12.3868 2.33337 10.8701 2.63962 9.45065 3.25212C8.93198 3.47593 8.43797 3.72895 7.96863 4.01118L9.64858 5.69113C10.9487 5.00818 12.3994 4.66671 14.0007 4.66671C16.6062 4.66671 18.8132 5.57087 20.6215 7.37921C22.4298 9.18754 23.334 11.3945 23.334 14C23.334 15.3417 23.0715 16.6007 22.5465 17.7771C22.4632 17.9638 22.3752 18.1465 22.2826 18.3251L23.9932 20.0357Z" fill="${
        focusLocal ? focusColorBase : defaultColorLocal
      }"/>
<path d="M21.0007 14C21.0007 14.9086 20.842 15.7643 20.5246 16.5671L18.6209 14.6635C18.6519 14.4466 18.6673 14.2255 18.6673 14C18.6673 12.7167 18.2104 11.6181 17.2965 10.7042C16.3826 9.79032 15.284 9.33337 14.0007 9.33337C13.7726 9.33337 13.5505 9.3478 13.3341 9.37665L11.4207 7.46324C12.2145 7.15444 13.0745 7.00004 14.0007 7.00004C15.9451 7.00004 17.5979 7.6806 18.959 9.04171C20.3201 10.4028 21.0007 12.0556 21.0007 14Z" fill="${
        focusLocal ? focusColorBase : defaultColorLocal
      }"/>
<path d="M15.1673 17.7316V25.6667H12.834V15.3982L9.66869 12.233C9.44555 12.7769 9.33398 13.3659 9.33398 14C9.33398 14.7 9.47496 15.3466 9.7569 15.9396C10.0388 16.5327 10.4229 17.0528 10.909 17.5L9.24649 19.1625C8.56593 18.5209 8.02148 17.7577 7.61315 16.873C7.20482 15.9882 7.00065 15.0306 7.00065 14C7.00065 12.6965 7.30653 11.524 7.91829 10.4826L6.21446 8.77872C5.18303 10.2918 4.66732 12.0322 4.66732 14C4.66732 15.3417 4.92982 16.5959 5.45482 17.7625C5.97982 18.9292 6.69926 19.9403 7.61315 20.7959L5.95065 22.4584C4.84232 21.3889 3.96246 20.1299 3.31107 18.6813C2.65968 17.2327 2.33398 15.6723 2.33398 14C2.33398 12.3862 2.64023 10.8695 3.25273 9.45004C3.6142 8.61235 4.05186 7.83899 4.56571 7.12997L2.33398 4.89825L3.96732 3.26491L24.6902 23.9878L23.0569 25.6212L15.1673 17.7316Z" fill="${
        focusLocal ? focusColorBase : defaultColorLocal
      }"/>
</svg>
`,
      className: "",
      iconSize: L.point(...iconSize),
      iconAnchor: L.point(...iconAnchor),
      popupAnchor: [0, -iconSize[1] / 1.2],
    }),
    rotationAngle: direction,
  });

  const paradoIconMark = L.marker(position, {
    icon: L.divIcon({
      html: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.799 0L28 8.20101L28 19.799L19.799 28H8.20101L0 19.799V8.20101L8.20101 0H19.799Z" fill="${baseColor}"/>
<path d="M18.6673 12.8334H9.33398V15.1667H18.6673V12.8334Z" fill="${
        focusLocal ? focusColorBase : defaultColorLocal
      }"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.16816 2.33337H18.8331L25.6673 9.16755L25.6673 18.8325L18.8331 25.6667H9.16816L2.33398 18.8325V9.16755L9.16816 2.33337ZM4.66732 10.134L10.1347 4.66671H17.8666L23.334 10.134L23.334 17.866L17.8666 23.3334H10.1347L4.66732 17.866L4.66732 10.134Z" fill="${
        focusLocal ? focusColorBase : defaultColorLocal
      }"/>
</svg>
`,
      className: "",
      iconSize: L.point(...iconSize),
      iconAnchor: L.point(...iconAnchor),
      popupAnchor: [0, -iconSize[1] / 1.2],
    }),
    rotationAngle: direction,
  });

  const emMovimentoIconMark = L.marker(position, {
    icon: L.divIcon({
      html: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" style="transform: rotate(${direction}deg); ">
          <circle className="icon-background" cx="14" cy="14" r="14" fill="${baseColor}" />
          <path d="M20 21L14 5L8 21L14 16L20 21Z" fill="${
            focusLocal ? focusColorBase : defaultColorLocal
          }""/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2ZM4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14Z" fill="${
            focusLocal ? focusColorBase : defaultColorLocal
          }""/>
        </svg>`,
      className: "",
      iconSize: L.point(...iconSize),
      iconAnchor: L.point(...iconAnchor),
      popupAnchor: [0, -iconSize[1] / 1.2],
    }),
    rotationAngle: direction,
  });

  const marker =
    inputLayerDatetime && isOffline(inputLayerDatetime)
      ? offlineIconMark
      : speed > 0
      ? emMovimentoIconMark
      : paradoIconMark;

  return [marker];
}

//This hook has been very useful for visualizing real-time data on maps, and I enjoyed the challenge of making it both flexible and efficient.

// The next steps involve refactoring the code to improve its maintainability and scalability. Each icon should be moved to its own specific file. This will help in organizing the code better and make it easier to manage and update individual icons in the future.
