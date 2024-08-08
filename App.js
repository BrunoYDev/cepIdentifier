import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from './src/services/api';

const App = () => {

  const [cep,setCep] = useState(0);
  const [showInfo,setShowInfo] = useState(false);
  const [cepInfo,setCepInfo] = useState({})
  const [requestError, setRequestError] = useState(false);
  const inputField = useRef(null);

  const requestCep = async () => {
    try {
      const response = await api.get(`${cep}/json`);
      if(response.status === 200){
        setRequestError(false);
        setShowInfo(true);
        setCepInfo({...response.data});
        Keyboard.dismiss();
      }
    } catch (error) {
      setRequestError(true);
    }
  }

  const clearAll = () => {
    setShowInfo(false);
    setCep(0);
    setCepInfo({});
    inputField.current.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Digite seu CEP:</Text>
        <TextInput style={styles.inputField} keyboardType='numeric' onChangeText={(text) => setCep(text)} value={cep} ref={inputField} placeholder='Ex: 11015000' />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.btnField, {backgroundColor: 'green'}]} onPress={requestCep}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnField, {backgroundColor: 'red'}]} onPress={clearAll}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {
        requestError && <Text style={styles.errorMsg}>Erro ao buscar CEP</Text>
      }
      {showInfo && (<View style={styles.cepContainer}>
        <Text style={styles.cepText}>CEP: {cepInfo.cep}</Text>
        <Text style={styles.cepText}>Logradouro: {cepInfo.logradouro}</Text>
        <Text style={styles.cepText}>Complemento: {cepInfo.complemento}</Text>
        <Text style={styles.cepText}>Bairro: {cepInfo.bairro}</Text>
        <Text style={styles.cepText}>Localidade: {cepInfo.localidade}</Text>
        <Text style={styles.cepText}>UF: {cepInfo.uf}</Text>
      </View>)}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  inputContainer:{
    gap: 10
  },
  inputField:{
    width: 300,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: 18
  },
  btnContainer: {
    marginTop: 30,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnField:{
    width: 150,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  errorMsg:{
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
    borderColor: 'black',
    borderTopWidth: 1,
  },
  cepContainer:{
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
    borderColor: 'black',
    borderLeftWidth: 4
  },
  cepText:{
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 0.8
  }
});

export default App;
