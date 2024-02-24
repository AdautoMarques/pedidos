import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

const Input = ({...rest}: TextInputProps) => {
    return ( 
        <TextInput
            multiline={true}
            textAlignVertical="top"
            placeholderTextColor={colors.slate[400]}
            className="h-32 bg-slate-800 rounded-md py-3 px-4 font-body text-sm text-white"
        {...rest}/>
     );
}
 
export default Input;