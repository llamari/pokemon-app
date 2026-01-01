import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonEscolhido, setPokemonEscolhido] = useState(null);

  const getInitialPokemons = () => {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon';
    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        setPokemons(json.results);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar a lista de Pokémons.');
      });
  }

  const getPokemonData = (urlPokemon) => {
    const endpoint = `${urlPokemon}`;
    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        const pokemon = {
          nome: json.name,
          img: json.sprites.other["official-artwork"].front_default,
          peso: json.weight,
          altura: json.height,
        };

        setPokemonEscolhido(pokemon);
      })

      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon.');
      });
  };

  useEffect(() => {
    getInitialPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Image
            resizeMode='contain'
            style={{ height: 50, alignSelf: 'center' }}
            source={require('./assets/pokemon-icon.png')}
          />
        </View>

        {pokemonEscolhido != null && (
          <View style={styles.pokemonBox}>
            <Text style={styles.pokemonNome}>Nome: {pokemonEscolhido.nome}</Text>
            <Text style={styles.pokemonPeso}>Peso: {pokemonEscolhido.peso}</Text>
            <Text style={styles.pokemonPeso}>Altura: {pokemonEscolhido.altura}</Text>

            <Image resizeMode='stretch' style={styles.pokemonImg} source={{ uri: pokemonEscolhido.img }} />
          </View>
        )}

        {pokemons?.map(pokemon => (
          <View style={styles.cardContainer} key={pokemon.url}>
            <Text style={styles.cardTitle}>{pokemon.name}</Text>
            <TouchableOpacity onPress={() => getPokemonData(pokemon.url)}>
              <Text style={styles.cardButton}>Dados do pokemon</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf8d4ff',
  },
  topo: {
    height: 100,
    backgroundColor: '#F78F3F',
    padding: 10,
    paddingTop: 30,
    marginBottom: 20,
    overflow: 'hidden',
  },
  topoTitulo: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    backgroundColor: '#ffb67eff',
    borderColor: '#d5d5d5',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 22,
    color: '#2F6AB3',
    fontWeight: 'bold',
    fontSize: 25,
    textTransform: 'capitalize',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardButton: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#2F6AB3',
    padding: 8,
    textAlign: 'center',
    borderRadius: 10,
  },
  pokemonBox: {
    backgroundColor: "#fdde64ff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  pokemonNome: {
    fontSize: 22,
  },
  pokemonPeso: {
    fontSize: 18,
  },
  pokemonImg: {
    width: 150,
    height: 150,
  },
});