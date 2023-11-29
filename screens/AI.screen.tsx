import React from 'react';
import Container from '../ui/Container';
import List from '../ui/List';

export default function AIScreen() {
  return (
    <Container>
      <List
        data={[
          { id: 'a1', data: { name: 'Bitcoin LSTM Model' }, icon: 'faBrain' },
        ]}
      />
    </Container>
  );
}
