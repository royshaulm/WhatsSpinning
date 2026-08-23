import appModals from './app-modals.html?raw';
import rootModals from './root-modals.html?raw';
import { LegacyMarkup } from './LegacyMarkup';
export function AppModals(){ return <><LegacyMarkup html={appModals}/><LegacyMarkup html={rootModals}/></>; }
