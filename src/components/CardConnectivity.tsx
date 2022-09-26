import React, {useEffect} from 'react';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useConnectivity} from '../hooks/useConnectivity';

export const CardConnectivity = () => {
  const [isConnected, checkConnection] = useConnectivity();

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Paragraph style={styles.text}>Estado de red</Paragraph>
        <Avatar.Icon size={48} icon={isConnected ? 'wifi' : 'wifi-off'} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
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
