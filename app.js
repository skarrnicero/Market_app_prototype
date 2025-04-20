import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const produtos = [
  {
    id: '1',
    nome: 'Arroz 5kg',
    preco: 15.99,
    descricao: 'Arroz tipo 1, pacote de 5kg',
    categoria: 'Alimentos básicos'
  },
  {
    id: '2',
    nome: 'Feijão 1kg',
    preco: 7.50,
    descricao: 'Feijão carioca, pacote de 1kg',
    categoria: 'Alimentos básicos'
  },
  {
    id: '3',
    nome: 'Óleo de Soja 900ml',
    preco: 4.99,
    descricao: 'Óleo de soja refinado, garrafa de 900ml',
    categoria: 'Alimentos básicos'
  },
  {
    id: '4',
    nome: 'Sabão em Pó 1kg',
    preco: 12.90,
    descricao: 'Sabão em pó para roupas, embalagem de 1kg',
    categoria: 'Limpeza'
  },
  {
    id: '5',
    nome: 'Desinfetante 2L',
    preco: 8.75,
    descricao: 'Desinfetante aroma pinho, frasco de 2 litros',
    categoria: 'Limpeza'
  },
];

const App = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [telaAtual, setTelaAtual] = useState('produtos');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + produto.preco, 0).toFixed(2);
  };

  const renderizarItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => {
        setProdutoSelecionado(item);
        setTelaAtual('detalhes');
      }}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderizarDetalhes = () => (
    <View style={styles.detalhesContainer}>
      <Image source={{ uri: produtoSelecionado.imagem }} style={styles.detalhesImagem} />
      <Text style={styles.detalhesNome}>{produtoSelecionado.nome}</Text>
      <Text style={styles.detalhesPreco}>R$ {produtoSelecionado.preco.toFixed(2)}</Text>
      <Text style={styles.detalhesDescricao}>{produtoSelecionado.descricao}</Text>
      <Text style={styles.detalhesCategoria}>Categoria: {produtoSelecionado.categoria}</Text>
      
      <TouchableOpacity 
        style={styles.botaoAdicionar}
        onPress={() => {
          adicionarAoCarrinho(produtoSelecionado);
          alert(`${produtoSelecionado.nome} adicionado ao carrinho!`);
        }}
      >
        <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.botaoVoltar}
        onPress={() => setTelaAtual('produtos')}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderizarCarrinho = () => (
    <View style={styles.carrinhoContainer}>
      <Text style={styles.titulo}>Seu Carrinho</Text>
      
      {carrinho.length === 0 ? (
        <Text style={styles.carrinhoVazio}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            renderItem={({ item }) => (
              <View style={styles.itemCarrinho}>
                <Text>{item.nome}</Text>
                <Text>R$ {item.preco.toFixed(2)}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
          <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>
        </>
      )}
      
      <TouchableOpacity 
        style={styles.botaoVoltar}
        onPress={() => setTelaAtual('produtos')}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {telaAtual === 'produtos' && (
        <>
          <View style={styles.header}>
            <Text style={styles.titulo}>Atacadão</Text>
            <TouchableOpacity onPress={() => setTelaAtual('carrinho')}>
              <Text style={styles.carrinhoIcon}>🛒 ({carrinho.length})</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={produtos}
            renderItem={renderizarItem}
            keyExtractor={item => item.id}
          />
        </>
      )}
      
      {telaAtual === 'detalhes' && renderizarDetalhes()}
      {telaAtual === 'carrinho' && renderizarCarrinho()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2e86de',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  carrinhoIcon: {
    fontSize: 20,
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 14,
    color: '#2e86de',
  },
  detalhesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  detalhesImagem: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detalhesNome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detalhesPreco: {
    fontSize: 20,
    color: '#2e86de',
    marginBottom: 15,
  },
  detalhesDescricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  detalhesCategoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  botaoAdicionar: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoVoltar: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  carrinhoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  carrinhoVazio: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  itemCarrinho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default App;
