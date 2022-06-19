import { useScreen } from './useScreen';

interface TrackingAttr {
  regionName: string;
  contentName: string;
  target: string;
  payload?: object;
}

type TrackingManualProps = TrackingAttr & { interaction?: string };

export const useTracking = () => {
  const { trackingScreenName } = useScreen();
  const getAttrTracking = ({
    regionName,
    contentName,
    target,
    payload = {},
  }: TrackingAttr) => {
    return {
      'data-track-content': true,
      'data-content-region-name': regionName,
      'data-content-name': contentName,
      'data-content-target': target,
      'data-content-payload': JSON.stringify({
        screenName: trackingScreenName,
        ...payload,
      }),
    };
  };

  const trackManual = ({
    regionName,
    contentName,
    target,
    payload = {},
    interaction = 'click',
  }: TrackingManualProps) => {
    if (typeof track === 'function') {
      track('manualTrackInteractionContent', {
        interaction: interaction,
        contentName: contentName,
        regionName: regionName,
        target: target,
        payload: JSON.stringify({
          screenName: trackingScreenName,
          ...payload,
        }),
      });
    }
  };

  return { trackingScreenName, getAttrTracking, trackManual };
};
