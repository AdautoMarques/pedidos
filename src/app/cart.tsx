import { useState } from "react";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import Header from "../components/header";
import Product from "../components/product";
import { ProductCartProps, useCartStore } from "./stores/cart-store";
import { formatCurrency } from "../utils/functions/format";
import Input from "../components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../components/button";
import { Feather } from "@expo/vector-icons";
import LinkButton from "../components/link-button";
import { useNavigation } from "expo-router";



const PHONE_NUMBER = "5514991312663"

const Cart = () => {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity + 6,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedidos", "Informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
        💲💲 --- NOVO PEDIDO --- 💲💲 
        \n Entregar em: ${address}

        ${products}

        \n Valor total: ${total}
        `
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)    
    cartStore.clear();
    navigation.goBack();
  }
  return (
    <View className="flex-1 pt-12">
      <Header title="Carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}
            <View className="flex-row items-center mt-5">
              <Text className="text-white text-sm font-body">Taxa de entrega : </Text>
              <Text className="text-lime-400">
                {formatCurrency(6)}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total :</Text>
              <Text className="text-lime-400 text-2xl font-subtitle">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega (Rua, Número, Bairro, CEP e complemento e a forma de pagamento) "
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
          <Button.Text>Enviar pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
};

export default Cart;
