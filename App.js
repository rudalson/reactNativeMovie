/**
 * Movie Search React Native App
 * https://github.com/rudalson/reactNativeMovie
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';

const App: () => React$Node = () => {
  const apiurl = 'http://www.omdbapi.com/?apikey=dfe6d885';
  const [state, setState] = useState({
    s: 'Enter a movie...',
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + '&s=' + state.s).then(({data}) => {
      let results = data.Search;

      setState(prevState => {
        return {...prevState, results: results};
      });
    });
  };

  const openPopup = id => {
    axios(apiurl + '&i=' + id).then(({data}) => {
      let result = data;
      console.log(result);
      setState(prevState => {
        return {...prevState, selected: result};
      });
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Movie DB</Text>
        <TextInput
          style={styles.searchbox}
          onChangeText={text =>
            setState(prevState => {
              return {...prevState, s: text};
          })}
          onSubmitEditing={search}
          value={state.s} />
        <ScrollView style={styles.results}>
          {state.results.map(result => (
            <TouchableHighlight
              key={result.imdbID}
              onPress={() => openPopup(result.imdbID)}>
              <View style={styles.result}>
                <Image
                  source={{uri: result.Poster}}
                  style={{
                    width: '100%',
                    height: 300,
                    marginHorizontal: 'auto',
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.heading}>{result.Title}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565',
  },
});

export default App;
