import { View, FlatList, SectionList } from 'react-native'
import Header from '../components/header';
import Category from '../components/category-button';
import { CATEGORIES, MENU, ProductProps } from "../utils/data/products"
import { useState, useRef } from 'react';
import { Text} from 'react-native';
import Product from '../components/product';
import { Link } from 'expo-router';
import { useCartStore } from './stores/cart-store';


const Home = () => {
    const cartStore = useCartStore()
    const [category, setCategory] = useState(CATEGORIES[0])

    const sectionListRef = useRef<SectionList <ProductProps>>(null)
    const cartQuantityItem = cartStore.products.reduce((total, product) => total + product.quantity, 0)

    const handleCategorySelected = (selecetedCategory : string) => {
        setCategory(selecetedCategory)

        const sectionIndex = CATEGORIES.findIndex((category) => category === selecetedCategory)

        if(sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }

    return ( 
        <View className=" flex-1 pt-12">
            <Header title="Faça seu pedido" cartQuantity={cartQuantityItem}/>

            <FlatList 
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({item}) =><Category title={item} isSelected= {item === category} onPress={() => handleCategorySelected(item)}/>}
                horizontal
                className='max-h-10 mt-5'
                showsHorizontalScrollIndicator ={false}
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
            />


            <SectionList 
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item}) => (
                    <Link href={`/product/${item.id}`}asChild>
                        <Product data={item }/>
                    </Link>
                )}
                renderSectionHeader={({section: {title}}) => 
                <Text className='text-white text-xl font-heading mt-6 mb-3'>
                    {title}
                </Text>}
                className='flex-1 p-5'
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 100}}
            
            />
        </View>
     );
}
 
export default Home;