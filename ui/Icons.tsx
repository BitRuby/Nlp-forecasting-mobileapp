import React from 'react';
import { Props, FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons/faBitcoin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faAmazon } from '@fortawesome/free-brands-svg-icons/faAmazon';
import { faApple } from '@fortawesome/free-brands-svg-icons/faApple';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons/faMicrosoft';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';

export const icons = {
  faAlignLeft,
  faQuestionCircle,
  faHome,
  faChartSimple,
  faDatabase,
  faMagnifyingGlassChart,
  faBrain,
  faCheck,
  faExclamationTriangle,
  faExclamationCircle,
  faCircleInfo,
  faAngleDown,
  faChartColumn,
  faFilter,
  faBitcoin,
  faTwitter,
  faAmazon,
  faApple,
  faGoogle,
  faMicrosoft,
  faCalendar,
};

export type IconTypes = keyof typeof icons;

interface IIcons extends Omit<Props, 'icon'> {
  icon: IconTypes;
}

export default function Icons(props: IIcons) {
  return icons[props.icon] ? (
    <FontAwesomeIcon {...props} icon={icons[props.icon]} />
  ) : (
    <></>
  );
}
