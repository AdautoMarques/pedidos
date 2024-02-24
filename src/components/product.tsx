import {
  Image,
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { forwardRef } from "react";
import { formatCurrency } from "../utils/functions/format";

type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
  price: number
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        className="w-full flex-row items-center pb-4"
        {...rest}
        ref={ref}
      >
        <Image source={data.thumbnail} className="h-20 w-20 rounded-md" />

        <View className="flex-1 ml-3">
            
                <Text className="text-slate-100 font-subtitle text-base flex-1 items ">
                    {data.title}
                </Text>
                <Text className="text-lime-400 text-sm font-body mt-2">
                  {formatCurrency(data.price)}
                </Text>
            <View className="flex-rom items-end mr-4 ">

                     {data.quantity && (
                <Text className="text-slate-400 font-subtitle text-sm ">
                    x {data.quantity}
                 </Text>
                )}
            </View>
          
          <Text className="text-slate-400 text-xs leading-5 mt-0.5">
            {data.description}
          </Text>

        </View>


      </TouchableOpacity>
    );
  }
);

export default Product;
