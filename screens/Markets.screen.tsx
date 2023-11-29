import React from 'react';
import Container from '../ui/Container';
import List from '../ui/List';

export default function MarketsScreen() {
  return (
    <Container>
      <List
        data={[
          { id: 'a1', data: { name: 'Bitcoin' }, icon: 'faBitcoin' },
          { id: 'a2', data: { name: 'Amazon' }, icon: 'faTwitter' },
          { id: 'a3', data: { name: 'Apple' }, icon: 'faApple' },
          { id: 'a4', data: { name: 'Google' }, icon: 'faGoogle' },
          { id: 'a5', data: { name: 'Microsoft' }, icon: 'faMicrosoft' },
          { id: 'a6', data: { name: 'Tesla' }, icon: 'faChartColumn' },
        ]}
      />
    </Container>
  );
}
