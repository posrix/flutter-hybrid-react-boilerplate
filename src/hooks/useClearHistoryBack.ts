import { useNavigate } from 'react-router';
import { clearHistoryStack } from 'src/store/appSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export function useClearHistoryBack() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const historyStack = useAppSelector((state) => state.app.historyStack);

  // fallback 参数用于在跳转页是首页的情况，比如菜单点进去就是个表单，
  // 在这种情况下，历史记录为空，无法跳转，需要指定一个 fallback url
  return function (fallback: string = '') {
    if (historyStack.length) {
      navigate(-historyStack.length);
      // Clear history and back to list page
      dispatch(clearHistoryStack());
    } else {
      navigate(fallback, { replace: true });
    }
  };
}
