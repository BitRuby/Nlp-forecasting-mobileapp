import React, { useState, useCallback } from 'react';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import LoadingOverlay from '../../ui/Loading';
import { getRules } from '../../data/associationRuleMining';
import Button from '../../ui/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type StackParamList = {
  'New Rules': undefined;
};

type RulesScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'New Rules'
>;

export default function RulesScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const navigation = useNavigation<RulesScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoadingStates({ getRules: true });
        const data = await getRules();
        if (data) {
          setList(
            data.map((e: any) => ({
              id: e.name,
              data: {
                name: e.name,
              },
              icon: 'faMagnifyingGlassChart',
            })),
          );
        }
        setLoadingStates({ getRules: false });
      })();
    }, []),
  );

  function newRules() {
    navigation.navigate('New Rules');
  }

  return (
    <Container>
      <List data={list} />
      <LoadingOverlay loadingStates={loadingStates} />
      <Button onClick={newRules} title={'New Rules'} />
    </Container>
  );
}
