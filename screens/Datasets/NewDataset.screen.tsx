import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../ui/Container';
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import LoadingOverlay from '../../ui/Loading';
import { getAllMarkets } from '../../data/markets';
import { getAllKeywords } from '../../data/keyword';
import { createDataset } from '../../data/dataset';
import Text from '../../ui/Text';

export default function NewDataset({}) {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [keywords, setKeywords] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [allMarkets, setAllMarkets] = useState<{ name: string; _id: string }[]>(
    [],
  );
  const [allKeywords, setAllKeywords] = useState<
    { name: string; _id: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingStates({ marketAndKeyword: true });
        const marketsResult = await getAllMarkets();
        const keywordResult = await getAllKeywords();
        setAllMarkets(marketsResult);
        setAllKeywords(keywordResult);
        const mappedMarkets = marketsResult.map((e: any) => e.name);
        const mappedKeywords = keywordResult.map((e: any) => e.name);
        setKeywords(mappedKeywords);
        setMarkets(mappedMarkets);
        setInputs(prev => ({
          ...prev,
          MarketId: mappedMarkets[0],
          KeywordId: mappedKeywords[0],
        }));
      } finally {
        setLoadingStates({ marketAndKeyword: false });
      }
    })();
  }, []);

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  async function handleDatasetCreate() {
    try {
      const marketId = allMarkets.find(e => e.name === inputs.MarketId)?._id;
      const keywordId = allKeywords.find(e => e.name === inputs.KeywordId)?._id;

      if (marketId && keywordId) {
        setLoadingStates({ createDataset: true });
        await createDataset({
          marketId,
          keywordId,
          name: inputs.Name,
        });
        navigation.goBack();
      }
    } finally {
      setLoadingStates({ createDataset: false });
    }
  }

  return (
    <Container>
      <LoadingOverlay loadingStates={loadingStates} />
      <Text style={styles.label}>Name: </Text>
      <Input
        name={'Name'}
        placeholder="Enter name"
        setValue={handleChangeValue}
        value={inputs.Name}
      />
      <Text style={styles.label}>Market: </Text>
      <Select
        items={markets}
        name={'MarketId'}
        placeholder={'Select Market'}
        value={inputs.MarketId}
        setValue={handleChangeValue}
      />
      <Text style={styles.label}>Keyword: </Text>
      <Select
        items={keywords}
        name={'KeywordId'}
        placeholder={'Select Tweet Keyword'}
        value={inputs.KeywordId}
        setValue={handleChangeValue}
      />
      <Button
        disabled={!inputs.Name}
        onClick={handleDatasetCreate}
        title={'Create'}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: -8,
  },
});
