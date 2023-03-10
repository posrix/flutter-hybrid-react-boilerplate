import './list.less';
import { attachPropertiesToComponent } from 'src/utils/attach-properties-to-component';
import { List } from './list';
import { ListItem } from './list-item';

export type { ListProps } from './list';
export type { ListItemProps } from './list-item';

export default attachPropertiesToComponent(List, {
  Item: ListItem,
});
