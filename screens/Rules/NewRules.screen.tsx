import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../ui/Container';
import Input from '../../ui/Input';
import Text from '../../ui/Text';
import Select from '../../ui/Select';
import Button from '../../ui/Button';
import LoadingOverlay from '../../ui/Loading';
import { getAllMarkets } from '../../data/markets';
import { getAllKeywords } from '../../data/keyword';
import DateSelect from '../../ui/DateSelect';
import MultiSelect from '../../ui/MultiSelect';
import {
  economicIndicatorTypesArray,
  technicalIndicatorTypesArray,
} from './utils';
import Checkbox from '../../ui/Checkbox';
import { createRules } from '../../data/associationRuleMining';

export default function NewRules() {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  const [technicalSelected, setTechnicalSelected] = useState<string[]>([]);
  const [economicSelected, setEconomicSelected] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [markets, setMarkets] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [allMarkets, setAllMarkets] = useState<{ name: string; _id: string }[]>(
    [],
  );
  const [allKeywords, setAllKeywords] = useState<
    { name: string; _id: string }[]
  >([]);

  const valid =
    inputs.Name &&
    inputs.StartDate &&
    inputs.EndDate &&
    inputs.WindowSize &&
    technicalSelected.length &&
    economicSelected.length;

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

  function handleTechnicalChange(inputName: string, value: string) {
    setTechnicalSelected(prev => {
      if (prev.find(e => e === value)) {
        return prev.filter(e => e !== value);
      } else {
        return [...prev, value];
      }
    });
  }

  function handleEconomicChange(inputName: string, value: string) {
    setEconomicSelected(prev => {
      if (prev.find(e => e === value)) {
        return prev.filter(e => e !== value);
      } else {
        return [...prev, value];
      }
    });
  }

  async function handleRulesCreate() {
    const marketId = allMarkets.find(e => e.name === inputs.MarketId)?._id;
    const keywordId = allKeywords.find(e => e.name === inputs.KeywordId)?._id;
    if (marketId && keywordId) {
      try {
        setLoadingStates({ createRules: true });
        const obj = {
          name: inputs.Name,
          marketId,
          keywordId,
          startDate: inputs.StartDate,
          endDate: inputs.EndDate,
          windowSize: Number(inputs.WindowSize),
          indicators: [...technicalSelected, ...economicSelected],
          volume: !!checkboxes['Volume Field'],
          close: !!checkboxes['Close Field'],
        };
        await createRules(obj);
        navigation.goBack();
      } finally {
        setLoadingStates({ createRules: false });
      }
    }
  }

  function handleCheckboxChange(inputName: string, value: boolean) {
    setCheckboxes(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  return (
    <>
      <Container scroll>
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
        <Text style={styles.label}>Start Date: </Text>
        <DateSelect
          name={'StartDate'}
          value={inputs.StartDate}
          setValue={handleChangeValue}
        />
        <Text style={styles.label}>End Date: </Text>
        <DateSelect
          name={'EndDate'}
          value={inputs.EndDate}
          setValue={handleChangeValue}
        />
        <Text style={styles.label}>Window Size: </Text>
        <Input
          name={'WindowSize'}
          placeholder="Enter Window Size"
          setValue={handleChangeValue}
          value={inputs.WindowSize}
        />
        <Text style={styles.label}>Technical Indicators: </Text>
        <MultiSelect
          name={'TechnicalIndicators'}
          placeholder="Enter technical indicators"
          setValue={handleTechnicalChange}
          values={technicalSelected}
          items={technicalIndicatorTypesArray}
        />
        <Text style={styles.label}>Economic Indicators: </Text>
        <MultiSelect
          name={'EconomicIndicators'}
          placeholder="Enter economic indicators"
          setValue={handleEconomicChange}
          values={economicSelected}
          items={economicIndicatorTypesArray}
        />
        <Text style={styles.label}>Add Fields: </Text>
        <Checkbox
          name={'Close Field'}
          setValue={handleCheckboxChange}
          value={checkboxes['Close Field']}
        />
        <Checkbox
          name={'Volume Field'}
          setValue={handleCheckboxChange}
          value={checkboxes['Volume Field']}
        />
        <View style={styles.bottomSpace} />
      </Container>
      <Button
        disabled={!valid}
        onClick={handleRulesCreate}
        title={'Create'}
        style={styles.button}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: -8,
  },
  bottomSpace: { marginTop: 30 },
  button: {
    paddingHorizontal: 20,
  },
});
