// Unfortunately, all my repositories are private on GitHub, so I can’t share a direct link. However, here’s an example of a custom hook I’m proud of. It dynamically creates custom icons in Leaflet with different colors based on status (online, offline, etc.):

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

const { marker } = useCustomMarkerIcon({
  position,
  iconSize,
  iconAnchor,
  direction,
  speed,
  inputLayerDatetime,
  focusLocal,
});

//This hook has been very useful for visualizing real-time data on maps, and I enjoyed the challenge of making it both flexible and efficient.
