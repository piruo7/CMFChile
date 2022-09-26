import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LineChart} from 'react-native-chart-kit';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {RootStackParams} from '../navigation/Navigation';
import {CustomHeader} from '../components/CustomHeader';
import {selectValue} from '../hooks/selectValue';
import {getResource} from '../redux/actions/getResource';
import {filter_by_year} from '../utils/utils';

type Props = NativeStackScreenProps<RootStackParams, 'IndicatorsScreen'>;
const screenWidth = Dimensions.get('window').width;

const IndicatorDetailScreen = ({route}: Props) => {
  const {code, name} = route.params;
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const resources = useSelector((state: any) => state.getResource);
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

  const data = {
    labels:
      resources.data && resources.data[value]
        ? resources.data[value]
            .slice(-10)
            .map(item => new Date(item.Fecha).getDate() + 1)
        : [],
    datasets: [
      {
        data:
          resources.data && resources.data[value]
            ? resources.data[value]
                .slice(-10)
                .map(item => Math.round(parseFloat(item.Valor)))
            : [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    background: '#1E2923',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={name} name={''} />
      {resources.loading && (
        <ActivityIndicator
          animating={resources && resources.loading}
          color={colors.primary}
          size={'large'}
        />
      )}
      {resources.data && resources.data[value] ? (
        <View style={styles.cardContainer}>
          <Text
            style={[styles.title, {color: colors.primary}]}
            variant="displaySmall">
            $ {resources.data[value].slice(-1)[0].Valor}
          </Text>
          <View style={styles.detail}>
            <Text variant="titleMedium">Nombre</Text>
            <Text variant="bodyMedium">{name}</Text>
          </View>
          <View style={styles.detail}>
            <Text variant="titleMedium">Fecha</Text>
            <Text variant="bodyMedium">
              {resources.data[value].slice(-1)[0].Fecha}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text variant="titleMedium">Unidad de medida</Text>
            <Text variant="bodyMedium">Pesos</Text>
          </View>
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
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
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
  },
  detail: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default IndicatorDetailScreen;
