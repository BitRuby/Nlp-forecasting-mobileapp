import React from 'react';
import Container from '../ui/Container';
import List from '../ui/List';

export default function TweetsScreen() {
  return (
    <Container>
      <List
        data={[
          { id: 'a1', data: { name: 'Bitcoin Tweets' }, icon: 'faBitcoin' },
          {
            id: 'a2',
            data: { name: 'Investing Tweets' },
            icon: 'faChartColumn',
          },
        ]}
      />
    </Container>
  );
}
