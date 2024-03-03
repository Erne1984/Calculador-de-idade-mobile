import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ageYears, setAgeYears] = useState('--');
  const [ageMonths, setAgeMonths] = useState('--');
  const [ageDays, setAgeDays] = useState('--');
  const [errorMessage, setErrorMessage] = useState('');

  const validarData = (dia, mes, ano) => {
    const data = new Date(ano, mes - 1, dia);
    return (
      dia > 0 &&
      dia <= 31 &&
      mes > 0 &&
      mes <= 12 &&
      ano.length === 4 &&
      !isNaN(data.getTime())
    );
  };

  const calculateAge = () => {
    if (!day || !month || !year) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    if (!validarData(day, month, year)) {
      setErrorMessage('Data inválida');
      return;
    }

    const dataAtual = new Date();
    const dataNascimento = new Date(year, month - 1, day);

    let idadeAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let idadeMeses = dataAtual.getMonth() - dataNascimento.getMonth();
    let idadeDias = dataAtual.getDate() - dataNascimento.getDate();

    if (idadeDias < 0) {
      idadeMeses--;
      const ultimoDiaMesAnterior = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth(),
        0
      ).getDate();
      idadeDias += ultimoDiaMesAnterior;
    }

    if (idadeMeses < 0) {
      idadeAnos--;
      idadeMeses += 12;
    }

    setAgeYears(idadeAnos.toString());
    setAgeMonths(idadeMeses.toString());
    setAgeDays(idadeDias.toString());
  };

  const mostrarMensagemErro = (mensagem) => {
    // Implement your error handling logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculador de Idade</Text>
      <View style={styles.boxInputs}>
        <TextInput
          style={styles.input}
          placeholder='Dia'
          keyboardType='numeric'
          value={day}
          onChangeText={(text) => setDay(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Mês'
          keyboardType='numeric'
          value={month}
          onChangeText={(text) => setMonth(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ano'
          keyboardType='numeric'
          value={year}
          onChangeText={(text) => setYear(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateAge}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.results}>
        <Text> {ageDays} Dias | </Text>
        <Text> {ageMonths} Meses | </Text>
        <Text> {ageYears} Anos</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  boxInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
  results: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  input: {
    width: 80,
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  }
});
