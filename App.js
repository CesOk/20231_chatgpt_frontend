import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react'
import { FlatList, TextInput } from 'react-native-web';
import axios from 'axios';

export default function App() {
  
  const [sentimento, setSentimento] = useState('')
  const [sentimentos, setSentimentos] = useState([])
  const [frase, setFrase] = useState('')
  const [frases, setFrases] = useState([])
  const [ambos, setAmbos] = useState([])

  const implementarAmbos = () => {
    adicionarFrase()
    conversaGpt(frase)
  }

  // const analisarSentimento = (sentimentoDigitado) => {
  //   setSentimento(sentimentoDigitado)
  // }

  const capturarFrase = (fraseDigitada) => {
    setFrase(fraseDigitada)
  }

  const conversaGpt = (texto) => {
    axios
      .post('http://localhost:4000/sentimentos', {texto})
      .then((response) => {

        const sentimentoBackend = response.data.sentimento
        let sentimentoObtido = sentimentoBackend
        sentimentoObtido = sentimentoObtido.trim()

        setSentimentos((sentimentos) => [sentimentoObtido, ...sentimentos])
      })
  }

  const converteString = (sentimentoBackend) => {
    if(sentimentoBackend.includes("Positivo")){
      sentimento = "Positivo"
    }
    else if(sentimentoBackend.includes("Neutro")){
      sentimento = "Neutro"
    } 
    else{
      sentimento = "Negativo"
    }
  }

  const adicionarFrase = () => {
    setFrases(frases => {
      const aux = [frase, ...frases]
      console.log(aux)
      setFrase('')
      return aux
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.entradaView}>
        {/* entrada de dados */}
        <TextInput 
          placeholder='Insira uma frase...'
          style={styles.sentimentoTextInput}
          // onChangeText={analisarSentimento}
          onChangeText={capturarFrase}
          value={frase}
        />
        <Button 
          title='OK'
          onPress={implementarAmbos}
        />
      </View>
      
      <FlatList
        data={frases}
        renderItem={frase => (
          <View style={styles.itemNaLista}>
            <Text>Frase: {frase.item}</Text>
            <Text>Sentimento: {sentimentos[0]}</Text>
            {/* {sentimentos[0]} */}
          </View>
        )}>
      </FlatList>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    width: '100%',
    alignItems: 'center'
  },
  sentimentoTextInput: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: 4,
    padding: 12,
    textAlign: 'center'
  },
  entradaView: {
    width: '80%',
    marginBottom: 4
  },
  itemNaLista: {
    padding: 12,
    backgroundColor: '#CCC',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
    textAlign: 'center'
  },
  lembretesView:{
    width: '80%'
  }
})

  // const [num, setNum] = useState(0)
  // return (
  //   <View style={styles.container}>
  //     {/*<Text>{texto}</Text>*/}
  //     <Text>{num}</Text>
      
  //     <Button
  //       title='++'
  //       onPress={() => {setNum(num+1)}}
  //     />
  //   </View>
  // );

