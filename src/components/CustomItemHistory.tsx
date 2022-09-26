import {List} from 'react-native-paper';

type Props = {
  title: string;
  description: string;
};

export const CustomItemHistory = ({title, description}: Props) => {
  return <List.Item title={title} description={description} />;
};
