import React from 'react';
import {View} from 'react-native';
import {Appbar, IconButton, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  name: string;
};

export const CustomHeader = ({title, name}: Props) => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <Appbar.Header mode={'medium'} style={{backgroundColor: colors.primary}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          paddingLeft: name === 'InitialScreen' ? 14 : 0,
        }}>
        {name !== 'InitialScreen' && (
          <IconButton
            icon="arrow-left"
            iconColor={colors.tertiary}
            size={20}
            onPress={() => navigation.goBack()}
          />
        )}
        <Appbar.Content title={title} color={colors.tertiary} />
      </View>
    </Appbar.Header>
  );
};
