import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [confianca, setConfianca] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  function analisarPergunta(texto: string) {
    const textoLower = texto.toLowerCase();

    if (
      textoLower.startsWith("devo") ||
      textoLower.startsWith("vale a pena") ||
      textoLower.startsWith("deveria")
    ) {
      return "sim_nao";
    }

    if (textoLower.includes(" ou ")) {
      return "opcoes";
    }

    if (
      textoLower.includes("medo") ||
      textoLower.includes("confuso") ||
      textoLower.includes("dúvida") ||
      textoLower.includes("inseguro")
    ) {
      return "emocional";
    }

    return "generico";
  }

  function decidir() {
    if (pergunta.trim() === "") {
      setResposta("Digite algo para eu decidir por você.");
      setConfianca(null);
      return;
    }

    setCarregando(true);
    setResposta("");
    setConfianca(null);

    setTimeout(() => {
      const tipo = analisarPergunta(pergunta);
      let respostaFinal = "";
      let nivelConfianca = 0;

      if (tipo === "sim_nao") {
        const respostas = ["SIM", "NÃO", "ESPERE"];
        respostaFinal =
          respostas[Math.floor(Math.random() * respostas.length)] +
          "\n\nVocê já tem sinais suficientes para decidir.";
        nivelConfianca = Math.floor(Math.random() * 21) + 70;
      }

      if (tipo === "opcoes") {
        respostaFinal =
          "Escolha a opção que combina mais com o ambiente e com como você quer se sentir hoje.\n\nQuando a dúvida é entre opções, o contexto importa mais que a escolha em si.";
        nivelConfianca = Math.floor(Math.random() * 21) + 65;
      }

      if (tipo === "emocional") {
        respostaFinal =
          "Isso parece mais emocional do que racional.\n\nDê um passo para trás e observe o que você realmente está evitando.";
        nivelConfianca = Math.floor(Math.random() * 21) + 75;
      }

      if (tipo === "generico") {
        respostaFinal =
          "Simplifique a pergunta.\n\nPerguntas claras geram decisões melhores.";
        nivelConfianca = Math.floor(Math.random() * 21) + 60;
      }

      setResposta(respostaFinal);
      setConfianca(nivelConfianca);
      setCarregando(false);
    }, 1200);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Decide Por Mim</Text>

      {/* TEXTO EDUCATIVO */}
      <View style={styles.educativo}>
        <Text style={styles.educativoTitulo}>Como perguntar melhor:</Text>
        <Text style={styles.educativoTexto}>• Faça perguntas diretas</Text>
        <Text style={styles.educativoTexto}>• Evite listar muitas opções</Text>
        <Text style={styles.educativoTexto}>
          • Ex: “Devo sair hoje?”
        </Text>
        <Text style={styles.educativoTexto}>
          • Ex: “Vale a pena ir mais arrumado?”
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite sua dúvida aqui..."
        placeholderTextColor="#94a3b8"
        value={pergunta}
        onChangeText={setPergunta}
        multiline
      />

      <TouchableOpacity style={styles.botao} onPress={decidir}>
        <Text style={styles.botaoTexto}>DECIDIR</Text>
      </TouchableOpacity>

      {carregando && <ActivityIndicator size="large" color="#22c55e" />}

      {resposta !== "" && (
        <View style={styles.resultado}>
          <Text style={styles.resposta}>{resposta}</Text>
          {confianca && (
            <Text style={styles.confianca}>
              Confiança: {confianca}%
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  educativo: {
    backgroundColor: "#020617",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  educativoTitulo: {
    color: "#22c55e",
    fontWeight: "bold",
    marginBottom: 5,
  },
  educativoTexto: {
    color: "#cbd5f5",
    fontSize: 13,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#ffffff",
    padding: 15,
    borderRadius: 10,
    minHeight: 90,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  botaoTexto: {
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultado: {
    marginTop: 10,
    backgroundColor: "#020617",
    padding: 20,
    borderRadius: 10,
  },
  resposta: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  confianca: {
    color: "#22c55e",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
