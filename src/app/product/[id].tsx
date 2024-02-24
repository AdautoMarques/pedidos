import { Image, View, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { PRODUCTS } from "../../utils/data/products";
import { formatCurrency } from "@//utils/functions/format";
import { Button } from "../../components/button";
import { Feather } from "@expo/vector-icons";
import LinkButton from "@//components/link-button";
import { useCartStore } from "../stores/cart-store";
import { Redirect } from "expo-router";

const Product = () => {
    const cartStore = useCartStore()
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    
    const product = PRODUCTS.find((item) => item.id === id)

    function handleAddToCart(){
        cartStore.add(product!)
        navigation.goBack()
    }

    if(!product){
        return <Redirect href={'/'}/>
    }
    
    return ( 
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52 " resizeMode="cover"/>
            <Text className="text-white text-xl font-heading my-4 mx-4 mt-5">{product.title}</Text>

            <View>
                <Text className="text-lime-400 text-2xl font-heading my-4 mx-4">
                    {formatCurrency(product.price)}
                </Text>

                <Text className="text-slate-400 font-body text-base leading-6 mb-6 mx-4">
                    {product.description}
                </Text>

                {
                    product.ingredients.map((ingredient) =>(
                        <Text key={ingredient} className="text-slate-400 font-body text-base leading-6 mx-4">{"\u2022"}{ingredient}</Text>
                    ))
                }
            </View>

            <View className="p-5 pb-8 gap-5 ">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20}/>
                    </Button.Icon>
                    <Button.Text>
                        Adicionar ao pedido
                    </Button.Text>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
     );
    }
 
export default Product;