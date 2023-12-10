import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Container from '../../ui/Container';
import List, { ItemProps } from '../../ui/List';
import Loading from '../../ui/Loading';
import {
  getDailyTweetsByKeywordId,
  getTweetsByKeywordIdPaginated,
} from '../../data/keyword';
import { IDailyTweet, ITweet } from './types';
import DateSelect from '../../ui/DateSelect';
import { Card } from '../../ui/Card';
import { COLORS } from '../../ui/utils';
import Select from '../../ui/Select';
import Filter from '../../ui/Filter';
import Button from '../../ui/Button';
import { StackNavigationProp } from '@react-navigation/stack';

interface TweetScreenRouteParams {
  id: string;
  name: string;
}

type ContentTransformationsNavProp = StackNavigationProp<{
  ['Content Transformations']: { id: string; name: string };
}>;

export default function TweetScreen() {
  const route = useRoute();
  const navigation = useNavigation<ContentTransformationsNavProp>();
  const { id, name } = route.params as TweetScreenRouteParams;
  const [inputs, setInputs] = useState<{ [k: string]: string }>({});
  const [prevInputs, setPrevInputs] = useState<{ [k: string]: string }>({});
  const [data, setData] = useState<ITweet[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(50);
  const [list, setList] = useState<ItemProps[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [dataRange, setDateRange] = useState<{
    minDate: number | undefined;
    maxDate: number | undefined;
  }>();
  const [dayPosts, setDayPosts] = useState<{
    least: string;
    most: string;
  }>();

  const neutralCount = useMemo(() => {
    let count = 0;
    data.forEach(e => {
      if (Number(e.compound) > -(1 / 3) && Number(e.compound) < 1 / 3) {
        count++;
      }
    });
    return count;
  }, [data]);

  const positiveCount = useMemo(() => {
    let count = 0;
    data.forEach(e => {
      if (Number(e.compound) > 1 / 3) {
        count++;
      }
    });
    return count;
  }, [data]);

  const negativeCount = useMemo(() => {
    let count = 0;
    data.forEach(e => {
      if (Number(e.compound) < -(1 / 3)) {
        count++;
      }
    });
    return count;
  }, [data]);

  const dayMostPosts = (dailyData: IDailyTweet[]) => {
    let most = dailyData[0].rows.length;
    let day = dailyData[0].date;
    for (let i = 1; i < dailyData.length; i++) {
      if (dailyData[i].rows.length > most) {
        most = dailyData[i].rows.length;
        day = dailyData[i].date;
      }
    }
    return `${day} (${most})`;
  };

  const dayLeastPosts = (dailyData: IDailyTweet[]) => {
    let least = dailyData[0].rows.length;
    let day = dailyData[0].date;
    for (let i = 1; i < dailyData.length; i++) {
      if (dailyData[i].rows.length < least) {
        least = dailyData[i].rows.length;
        day = dailyData[i].date;
      }
    }
    return `${day} (${least})`;
  };

  const minDate = (dailyData: IDailyTweet[]) =>
    dailyData.length
      ? Math.min(...dailyData.map(e => new Date(e.date).getTime()))
      : undefined;

  const maxDate = (dailyData: IDailyTweet[]) =>
    dailyData.length
      ? Math.max(...dailyData.map(e => new Date(e.date).getTime()))
      : undefined;

  const setTitle = useCallback(
    (title: string) => {
      navigation.setOptions({
        title: `${title} Tweets Summary`,
      });
    },
    [navigation],
  );

  useEffect(() => {
    setTitle(name);
  }, [name, setTitle]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoadingStates(prev => ({
            ...prev,
            ['getTweetsByKeywordIdPaginated']: true,
          }));
          const res = await getTweetsByKeywordIdPaginated({
            keywordId: id,
            rowsPerPage,
            page:
              inputs.DateFrom !== prevInputs.DateFrom ||
              inputs.DateTo !== prevInputs.DateTo ||
              inputs.Sentiment !== prevInputs.Sentiment
                ? 0
                : page,
            sentiment: inputs.Sentiment || 'All',
            startDate: inputs.DateFrom,
            endDate: inputs.DateTo,
          });
          if (res.length) {
            if (
              inputs.DateFrom !== prevInputs.DateFrom ||
              inputs.DateTo !== prevInputs.DateTo ||
              inputs.Sentiment !== prevInputs.Sentiment
            ) {
              setData(res);
              setPage(0);
            } else {
              setData(prev => [...prev, ...res]);
            }
          }
        } finally {
          setLoadingStates(prev => ({
            ...prev,
            ['getTweetsByKeywordIdPaginated']: false,
          }));
        }
      })();
    }, [
      id,
      inputs.DateFrom,
      inputs.DateTo,
      inputs.Sentiment,
      page,
      prevInputs.DateFrom,
      prevInputs.DateTo,
      prevInputs.Sentiment,
      rowsPerPage,
    ]),
  );

  useEffect(() => {
    if (data.length) {
      setList(mapDataToListValues(data));
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoadingStates(prev => ({
            ...prev,
            ['getDailyTweetsByKeywordId']: true,
          }));
          const result = (await getDailyTweetsByKeywordId(id)) as IDailyTweet[];
          if (result) {
            setDateRange({
              minDate: minDate(result),
              maxDate: maxDate(result),
            });
            setDayPosts({
              least: dayLeastPosts(result),
              most: dayMostPosts(result),
            });
          }
        } finally {
          setLoadingStates(prev => ({
            ...prev,
            ['getDailyTweetsByKeywordId']: false,
          }));
        }
      })();
    }, [id]),
  );

  useEffect(() => {
    if (dataRange?.minDate && dataRange?.maxDate) {
      setInputs(prev => ({
        ...prev,
        ['DateFrom']: new Date(dataRange.minDate as number)
          .toISOString()
          .slice(0, 10),
        ['DateTo']: new Date(dataRange.maxDate as number)
          .toISOString()
          .slice(0, 10),
      }));
    }
  }, [dataRange?.minDate, dataRange?.maxDate]);

  const mapDataToListValues = (result: ITweet[]): ItemProps[] => {
    return result.map(row => ({
      id: row._id,
      data: {
        Date: row.date,
        Content: row.transformed,
        Compound: row.compound,
      },
    }));
  };

  function handleChangeValue(inputName: string, value: string) {
    setPrevInputs({ ...inputs });
    setInputs(prev => ({
      ...prev,
      [inputName]: value,
    }));
  }

  function handleLoadMore() {
    if (!Object.keys(loadingStates).some(key => loadingStates[key])) {
      setPage(prev => prev + 1);
    }
  }

  function handleContentTransformations() {
    return navigation.navigate('Content Transformations', { id, name });
  }

  return (
    <Container>
      <Loading loadingStates={loadingStates} />
      <Filter>
        <Select
          items={['All', 'Negative', 'Neutral', 'Positive']}
          name={'Sentiment'}
          placeholder={'Select Tweet Sentiment'}
          value={inputs.Sentiment}
          setValue={handleChangeValue}
        />
        <View style={styles.dateContainer}>
          <DateSelect
            name={'DateFrom'}
            value={inputs.DateFrom}
            setValue={handleChangeValue}
            minDate={dataRange?.minDate}
            maxDate={dataRange?.maxDate}
          />
          <View style={styles.margin} />
          <DateSelect
            name={'DateTo'}
            value={inputs.DateTo}
            setValue={handleChangeValue}
            minDate={dataRange?.minDate}
            maxDate={dataRange?.maxDate}
          />
        </View>
        {list.length ? (
          <Card
            backgroundColor={COLORS.gray2}
            content={{
              All: list.length.toString(),
              Negative: negativeCount.toString(),
              Neutral: neutralCount.toString(),
              Positive: positiveCount.toString(),
            }}
          />
        ) : (
          <></>
        )}
      </Filter>
      {dayPosts?.most && dayPosts?.least ? (
        <Card
          backgroundColor={COLORS.green}
          content={{
            'Most posts': dayPosts.most,
            'Least posts': dayPosts.least,
          }}
        />
      ) : (
        <></>
      )}
      <List data={list} showKeys onEndReached={handleLoadMore} />
      <Button
        onClick={handleContentTransformations}
        title={'Content transformations'}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: 5,
  },
});
