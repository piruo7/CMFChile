import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SvgUri} from 'react-native-svg';
import {Avatar, Button, Card, Paragraph, useTheme} from 'react-native-paper';

import {RootStackParams} from '../navigation/Navigation';
import {useConnectivity} from '../hooks/useConnectivity';

type Props = NativeStackScreenProps<RootStackParams, 'InitialScreen'>;

const InitialScreen = ({route, navigation}: Props) => {
  const {colors} = useTheme();
  const [isConnected, checkConnection] = useConnectivity();

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <SvgUri
        width="200"
        height="200"
        uri={
          'https://www.cmfchile.cl/portal/principal/613/channels-515_cmf_logo_nav.svg'
        }
      />
      <Button
        mode="contained"
        disabled={isConnected ? false : true}
        buttonColor={colors.primary}
        onPress={() => navigation.navigate('IndicatorsScreen')}>
        ENTRAR
      </Button>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Paragraph style={styles.text}>Estado de red</Paragraph>
          <Avatar.Icon size={48} icon={isConnected ? 'wifi' : 'wifi-off'} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    bottom: 30,
    width: '70%',
    height: 100,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default InitialScreen;
