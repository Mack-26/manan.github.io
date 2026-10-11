// Featured projects render their own bespoke page instead of the generic template.
import LilSeeGround from './lilseeground/Page';
import AdaptiveMappo from './adaptive-mappo/Page';
import Horizon from './horizon/Page';
import Hrms from './hrms/Page';
import BatteryLifetime from './battery-lifetime/Page';

export const featuredPages = {
  lilseeground: LilSeeGround,
  'adaptive-mappo': AdaptiveMappo,
  horizon: Horizon,
  hrms: Hrms,
  'battery-lifetime': BatteryLifetime,
};
