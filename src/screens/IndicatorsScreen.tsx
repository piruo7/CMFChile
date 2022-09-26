import React from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';

import {RootStackParams} from '../navigation/Navigation';
import {CustomHeader} from '../components/CustomHeader';
import {CustomItem} from '../components/CustomItem';
import {items} from '../utils/utils';

type Props = NativeStackScreenProps<RootStackParams, 'IndicatorsScreen'>;

const IndicatorsScreen = ({navigation}: Props) => {
  useFocusEffect(
    React.useCallback(() => {
      let count = 0;
      const onBackPress = () => {
        if (count >= 2) {
          ToastAndroid.show('Hasta luego...', ToastAndroid.SHORT);
          BackHandler.exitApp();
          count = 0;
        } else {
          count++;
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const renderItem = ({item}) => (
    <CustomItem
      title={item.name}
      onHistory={() =>
        navigation.navigate('IndicatorHistoryScreen', {code: item.code, name: item.name})
      }
      onDetail={() =>
        navigation.navigate('IndicatorDetailScreen', {code: item.code, name: item.name})
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={'Indicadores'}
        onPress={() => navigation.goBack()}
        name={'InitialScreen'}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndicatorsScreen;
