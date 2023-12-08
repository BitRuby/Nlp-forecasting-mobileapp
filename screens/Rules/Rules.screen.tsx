import React, { useState, useCallback } from 'react';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import LoadingOverlay from '../../ui/Loading';
import { getRules } from '../../data/associationRuleMining';
import Button from '../../ui/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Data {
  name: string;
  _id: string;
  keywordId: {
    name: string;
  };
  marketId: {
    name: string;
  };
  startDate: string;
  endDate: string;
  rows: { [key: string]: string }[];
}

type NewRulesStackParamList = {
  'New Rules': undefined;
};

type NewRulesScreenNavigationProp = StackNavigationProp<
  NewRulesStackParamList,
  'New Rules'
>;

type RuleStackParamList = {
  Rule: {
    id: string;
    name: string;
    keywordId: {
      name: string;
    };
    marketId: {
      name: string;
    };
    startDate: string;
    endDate: string;
    rows: { [key: string]: string }[];
  };
};

type RuleScreenNavigationProp = StackNavigationProp<RuleStackParamList, 'Rule'>;

export default function RulesScreen() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const newRulesNavigation = useNavigation<NewRulesScreenNavigationProp>();
  const ruleNavigation = useNavigation<RuleScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoadingStates({ getRules: true });
        const response = await getRules();
        if (response) {
          setData(response);
          setList(
            response.map((e: any) => ({
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
    newRulesNavigation.navigate('New Rules');
  }

  const handleSelectElement = useCallback(
    (name: string) => {
      const selectElement = data.find(e => e.name === name);
      if (selectElement) {
        return ruleNavigation.navigate('Rule', {
          id: selectElement._id,
          name: selectElement.name,
          keywordId: selectElement.keywordId,
          marketId: selectElement.marketId,
          startDate: selectElement.startDate,
          endDate: selectElement.endDate,
          rows: selectElement.rows,
        });
      }
    },
    [data, ruleNavigation],
  );

  return (
    <Container>
      <List data={list} onSelect={handleSelectElement} />
      <LoadingOverlay loadingStates={loadingStates} />
      <Button onClick={newRules} title={'New Rules'} />
    </Container>
  );
}
