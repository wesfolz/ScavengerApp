import { DrawerActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

export default {
  openDrawer,
  setTopLevelNavigator,
};