import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Sala {
  nome: string;
  x: number;
  y: number;
}

interface SearchBarProps {
  salas: Sala[];
  onSearch: (sala: Sala | null) => void;
  onSalaSelect: (sala: Sala) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ salas, onSearch, onSalaSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Sala[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtrar sugestões baseado no texto digitado
  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = salas.filter(sala =>
        sala.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchText, salas]);

  const handleSearch = () => {
    Keyboard.dismiss();
    
    if (searchText.trim() === '') {
      Alert.alert('Atenção', 'Digite o nome da sala para buscar');
      return;
    }

    const salaEncontrada = salas.find(sala =>
      sala.nome.toLowerCase() === searchText.toLowerCase()
    );

    if (salaEncontrada) {
      onSearch(salaEncontrada);
      onSalaSelect(salaEncontrada);
      setSearchText('');
      setShowSuggestions(false);
    } else {
      Alert.alert('Sala não encontrada', 'Verifique o nome da sala e tente novamente');
      onSearch(null);
    }
  };

  const handleSuggestionPress = (sala: Sala) => {
    setSearchText(sala.nome);
    setShowSuggestions(false);
    onSearch(sala);
    onSalaSelect(sala);
  };

  const handleClear = () => {
    setSearchText('');
    setShowSuggestions(false);
    onSearch(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da sala..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="words"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.nome}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Ionicons name="location" size={16} color="#00FFFF" />
                <Text style={styles.suggestionText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 4,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    backgroundColor: '#00FFFF',
    borderRadius: 20,
    padding: 12,
    marginLeft: 8,
    shadowColor: '#00FFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: 200,
    zIndex: 30,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
