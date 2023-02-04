import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { setHistoryStack } from 'src/store/appSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

// Listen history change and store it
export function useHistoryStack() {
  const dispatch = useAppDispatch();
  const historyStack = useAppSelector((state) => state.app.historyStack);
  const location = useLocation();
  const type = useNavigationType();

  useEffect(() => {
    dispatch(
      setHistoryStack({
        pathname: location.pathname,
        type,
      })
    );
    // Must use location as deps, because component that use react-activation to
    // keep alive will cache pathname, hence history go back will not trigger
    // this useEffect, historyStack will not be modified. But location is reference
    // type and change every time re-render
  }, [dispatch, location, type]);

  return historyStack;
}
