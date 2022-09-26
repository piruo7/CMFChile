import {IconButton, List} from 'react-native-paper';

type Props = {
  title: string;
  onHistory: () => void;
  onDetail: () => void;
};

export const CustomItem = ({title, onHistory, onDetail}: Props) => {
  return (
    <List.Item
      title={title}
      onPress={() => onHistory()}
      right={() => (
        <IconButton icon="information" size={30} onPress={() => onDetail()} />
      )}
    />
  );
};
