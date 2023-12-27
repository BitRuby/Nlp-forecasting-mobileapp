import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../ui/Container';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import DateSelect from '../../ui/DateSelect';
import Select from '../../ui/Select';
import { getAllDatasets } from '../../data/dataset';
import { COLUMNS, SCALE_TYPES } from './utils';
import MultiSelect from '../../ui/MultiSelect';
import { getPricesByMarketId } from '../../data/markets';
import { createProcessedDataset } from '../../data/processedDataset';
import Loading from '../../ui/Loading';
import { getDailyTweetsByKeywordId } from '../../data/keyword';

interface Datasets {
  name: string;
  _id: string;
  keywordId: string;
  marketId: string;
  _rowId?: string[];
}

export default function ProcessDatasetScreen() {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<string[]>([]);
  const [allDatasetsContent, setAllDatasetsContent] = useState<Datasets[]>([]);
  const [minDate, setMinDate] = useState<number>();
  const [maxDate, setMaxDate] = useState<number>();
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );

  useEffect(() => {
    (async () => {
      const response = await getAllDatasets();
      setDatasets(response.map((e: any) => e.name));
      setAllDatasetsContent(response.map(({ _rowId, ...e }: Datasets) => e));
    })();
  }, []);

  const getDatasetByName = allDatasetsContent.find(
    e => e.name === inputs.Dataset,
  );

  useEffect(() => {
    (async () => {
      if (inputs.Dataset) {
        const select = getDatasetByName;
        if (select?.marketId && select?.keywordId) {
          const market = await getPricesByMarketId(select.marketId);
          const keyword = await getDailyTweetsByKeywordId(select.keywordId);
          const minMarketDate = new Date(market[0].date).getTime();
          const maxMarketDate = new Date(
            market[market.length - 1].date,
          ).getTime();
          const minKeywordDate = new Date(keyword[0].date).getTime();
          const maxKeywordDate = new Date(
            keyword[keyword.length - 1].date,
          ).getTime();
          setMinDate(
            minMarketDate < minKeywordDate ? minKeywordDate : minMarketDate,
          );
          setMaxDate(
            maxMarketDate > maxKeywordDate ? maxKeywordDate : maxMarketDate,
          );
        }
      }
    })();
  }, [allDatasetsContent, getDatasetByName, inputs.Dataset]);

  async function create() {
    try {
      setLoadingStates({ createProcessedDataset: true });
      await createProcessedDataset({
        datasetId: (getDatasetByName && getDatasetByName._id) || '',
        name: inputs.Name,
        startDate: inputs.StartDate,
        endDate: inputs.EndDate,
        windowSize: Number(inputs.WindowSize),
        horizonSize: Number(inputs.HorizonSize),
        scaleType: inputs.ScaleType,
        testFraction: Number(inputs.TestFraction),
        pickColumns: selectedColumns,
        scaleColumnsSeparately: inputs.ScaleColumnsSeparately === 'true',
      });
      setLoadingStates({ createProcessedDataset: false });
    } finally {
      navigation.goBack();
    }
  }

  function handleChangeValue(inputName: string, value: string) {
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  function handleChangeSelectedColumns(inputName: string, value: string) {
    setSelectedColumns(prev => {
      if (prev.find(e => e === value)) {
        return prev.filter(e => e !== value);
      } else {
        return [...prev, value];
      }
    });
  }

  const createEnabled =
    inputs.Dataset &&
    !!selectedColumns.length &&
    inputs.Name &&
    inputs.StartDate &&
    inputs.EndDate &&
    inputs.WindowSize &&
    inputs.HorizonSize &&
    inputs.ScaleType &&
    inputs.TestFraction;

  return (
    <>
      <Container scroll>
        <Loading loadingStates={loadingStates} />
        <Select
          items={datasets}
          name={'Dataset'}
          placeholder={'Select Dataset'}
          value={inputs.Dataset}
          setValue={handleChangeValue}
        />
        <MultiSelect
          items={COLUMNS}
          name={'PickColumns'}
          placeholder={'Select Columns'}
          values={selectedColumns}
          setValue={handleChangeSelectedColumns}
        />
        <Input
          number
          placeholder="Enter Test Fraction (0-1)"
          name={'TestFraction'}
          setValue={handleChangeValue}
          value={inputs.TestFraction}
        />
        <Input
          placeholder="Enter name"
          name={'Name'}
          setValue={handleChangeValue}
          value={inputs.Name}
        />
        <DateSelect
          placeholder="Enter Start Date"
          name={'StartDate'}
          value={inputs.StartDate}
          setValue={handleChangeValue}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DateSelect
          placeholder="Enter End Date"
          name={'EndDate'}
          value={inputs.EndDate}
          setValue={handleChangeValue}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Input
          number
          placeholder="Enter Window Size"
          name={'WindowSize'}
          setValue={handleChangeValue}
          value={inputs.WindowSize}
        />
        <Input
          number
          placeholder="Enter Horizon Size"
          name={'HorizonSize'}
          setValue={handleChangeValue}
          value={inputs.HorizonSize}
        />
        <Select
          items={SCALE_TYPES}
          name={'ScaleType'}
          placeholder={'Select Scale type'}
          value={inputs.ScaleType}
          setValue={handleChangeValue}
        />
        {!!inputs.ScaleType && inputs.ScaleType !== 'None' ? (
          <Select
            items={['true', 'false']}
            name={'ScaleColumnsSeparately'}
            placeholder={'Scale columns separately'}
            value={inputs.ScaleColumnsSeparately}
            setValue={handleChangeValue}
          />
        ) : (
          <></>
        )}
      </Container>
      <Button
        disabled={!createEnabled}
        style={styles.button}
        onClick={create}
        title={'Create'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
  },
});
