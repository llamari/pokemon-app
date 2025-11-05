import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const pokemonsIniciais = [
  { id: 1, nome: 'Bulbassauro' },
  { id: 4, nome: 'Charmander' },
  { id: 7, nome: 'Squirtle' },
  { id: 25, nome: 'Pikachu' },
]

export default function App() {
  const [pokemonEscolhido, setPokemonEscolhido] = useState(null);
  const getPokemonData = (idPokemon) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;
    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        const pokemon = {
          nome: json.name,
          img: json.sprites.other["official-artwork"].front_default,
          peso: json.weight,
        };

        setPokemonEscolhido(pokemon);
      })

      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon.');
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>ESCOLHA SEU POKEMON</Text>
        </View>

        {pokemonEscolhido != null && (
          <View style={styles.pokemonBox}>
            <Text style={styles.pokemonNome}>Nome: {pokemonEscolhido.nome}</Text>
            <Text style={styles.pokemonPeso}>Peso: {pokemonEscolhido.peso}</Text>

            <Image resizeMode='stretch' style={styles.pokemonImg} source={{ uri: pokemonEscolhido.img }} />
          </View>
        )}

        {pokemonsIniciais.map(pokemon => (
          <View style={styles.cardContainer} key={pokemon.id}>
            <Text style={styles.cardTitle}>{pokemon.nome}</Text>
            <Button title="Dados do pokemon" onPress={() => getPokemonData(pokemon.id)} />
          </View>
        ))}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topo: {
    height: 10,
    backgroundColor: '#e73e33',
    padding: 20,
    paddingTop: 40,
    marginBottom: 20,
  },
  topoTitulo: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 22,
    color: '#656565',
    marginBottom: 20,
    textAlign: 'center',
  },
  pokemonBox: {
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