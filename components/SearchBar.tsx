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
import { AppColors } from '../constants/theme';

interface Sala {
  nome: string;
  imagem: string;
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
          <Ionicons name="search" size={20} color={AppColors.primary} style={styles.searchIcon} />
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
              <Ionicons name="close-circle" size={20} color={AppColors.primary} />
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
                <Ionicons name="location" size={16} color={AppColors.primary} />
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
    zIndex: 200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
    borderColor: 'rgba(255, 0, 0, 0.2)',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 30,
    backgroundColor: AppColors.primary + '10',
  },
  searchIcon: {
    marginRight: 10,
    color: AppColors.primary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  clearButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: AppColors.primary + '20',
  },
  searchButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 24,
    padding: 10,
    marginLeft: 8,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 8,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    maxHeight: 200,
    zIndex: 300,
    borderWidth: 1,
    borderColor: AppColors.primary + '20',
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.primary + '20',
  },
  suggestionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
});

export default SearchBar;
