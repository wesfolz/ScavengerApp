import { DrawerActions, NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  setTopLevelNavigator,
  openDrawer,
  navigate,
};