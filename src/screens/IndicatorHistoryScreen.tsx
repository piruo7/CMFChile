import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';

import {RootStackParams} from '../navigation/Navigation';
import {getResource} from '../redux/actions/getResource';
import {CustomHeader} from '../components/CustomHeader';
import {CustomItemHistory} from '../components/CustomItemHistory';
import {selectValue} from '../hooks/selectValue';
import {filter_by_year} from '../utils/utils';

type Props = NativeStackScreenProps<RootStackParams, 'IndicatorsScreen'>;

const IndicatorHistoryScreen = ({route}: Props) => {
  const {code, name} = route.params;
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const data = useSelector((state: any) => state.getResource);
  const [value, setValue] = useState('Dolares');

  useEffect(() => {
    setValue(selectValue(name));
    const today = new Date();
    const priorDate = new Date().setDate(today.getDate() - 30);
    const year_prior = new Date(priorDate).getFullYear();
    const month_prior = new Date(priorDate).getMonth() + 1;
    dispatch(
      getResource({
        isYear: !!filter_by_year.find(element => element === name),
        code,
        year_prior,
        month_prior,
        year_today: today.getFullYear(),
        month_today: today.getMonth() + 1,
      }),
    );
  }, [code]);

  const renderItem = ({item}) => (
    <CustomItemHistory title={`$ ${item.Valor}`} description={item.Fecha} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={name} name={''} />
      {data.loading && (
        <ActivityIndicator
          animating={data && data.loading}
          color={colors.primary}
          size={'large'}
        />
      )}
      {data.data ? (
        <FlatList
          data={data.data[value]}
          renderItem={renderItem}
          keyExtractor={item => item.Fecha}
        />
      ) : (
        <Text variant="headlineLarge">No hay datos disponibles</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndicatorHistoryScreen;
